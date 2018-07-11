import 'babel-polyfill';
import {pause, DURATION_GAME_ACTIVATION, DURATION_MODAL_HIDDEN} from "./utils";
import {incantationBtn, game, activatedBobyInGame} from "./popups";
import {selectOfDamage} from "./mechanics-game";
import {checkCalculationsTask} from "../../app/components/tasks/arithmetic/arithmetic-task";
import {checkAuditionTask} from "../../app/components/tasks/audition/audition-task";
import {checkDrug_n_DropTask} from "../../app/components/tasks/drug-n-drop/drug-n-drop-task";
import {checkTranslationTask} from "../../app/components/tasks/translation/translation-task";

export {changeContext, addEventLevelCheckOne, addEventLevelCheckResult};

export let inputAnswerForTask = document.querySelectorAll('.modal-container__input')[0];
export let resultOfTask = document.querySelectorAll('.modal-container__result')[0];
let modalContainer = document.querySelectorAll('.modal-container')[0];
let btnPopupModalContainer = document.querySelectorAll('.modal-container__btn')[0];

// обработчик открытия модального окна задачи
function addEventLevelCheckOne() {
  for (let i = 0; i < incantationBtn.length; i++) {
    incantationBtn[i].addEventListener('click', () => {
      resultOfTask.innerHTML = ''; // убираем запись ВЕРНО/НЕВЕРНО
      if (resultOfTask.classList.contains('modal-container__right-result')) {
        resultOfTask.classList.remove('modal-container__right-result');
      }
      inputAnswerForTask.classList.remove('answered');
      if (modalContainer.classList.contains('out')) {
        modalContainer.classList.remove('out');
        modalContainer.classList.remove('modal-container--hidden');
        modalContainer.classList.remove('modal-animation');
      }
      setTimeout(function() {
        modalContainer.classList.add('modal-animation');
        game.classList.add('modal-active');
      }, 1200);
    });
  }
}

// Переопределяет currentTaskIndex
 function changeContext() {
   modalContainer = document.querySelectorAll('.modal-container')[window.currentTaskIndex];
   btnPopupModalContainer = document.querySelectorAll('.modal-container__btn')[window.currentTaskIndex];
   inputAnswerForTask = document.querySelectorAll('.modal-container__input')[window.currentTaskIndex];
   resultOfTask = document.querySelectorAll('.modal-container__result')[window.currentTaskIndex];
 }

function checkIndexOfTask(index, func) {
  if (window.currentTaskIndex == index ) {
    inputAnswerForTask = document.querySelectorAll('.modal-container__input')[index];
    resultOfTask = document.querySelectorAll('.modal-container__result')[index];
    func();
    selectOfDamage(); // подсчёт наносимого дамага
  }
}

// функция сверки и закрытия модального окна задачи
async function btnModalContainerClickHandler() {
  inputAnswerForTask.classList.add('answered'); // добавить кнопке класс при внесении результата
  if (window.currentTaskIndex == 0) {
    checkIndexOfTask(0, checkCalculationsTask);
  }
  if (window.currentTaskIndex == 1) {
    checkIndexOfTask(1, checkTranslationTask);
  }
  if (window.currentTaskIndex == 2) {
    checkIndexOfTask(2, checkDrug_n_DropTask);
  }
  if (window.currentTaskIndex == 3) {
    checkIndexOfTask(3, checkAuditionTask);
  }
  await pause(DURATION_GAME_ACTIVATION);
  modalContainer.classList.add('out');
  game.classList.remove('modal-active');
  activatedBobyInGame(); // активация боди в игре.
  await pause(DURATION_MODAL_HIDDEN);
  modalContainer.classList.add('modal-container--hidden');
}

function addEventLevelCheckResult() {
  btnPopupModalContainer.addEventListener('click', btnModalContainerClickHandler);
}
