import 'babel-polyfill';
import {pause, DURATION_HERO_ATTACK, DURATION_ENEMY_COUNTER_ATTACK, DURATION_ENEMY_ATTACK} from "../../../../app/js/utils";
import {getRandomElementFromArray} from "../../../../app/js/enemy_create";
import {activateBtnsInGame} from "../../../../app/js/popups";
import {changelifeLineCharacter, changelifeLineEnemy} from "../../../../app/js/mechanics-game";
import {boomAnimationHero, boomAnimationEnemy} from "../../../../app/js/boom_animation";
import {inputAnswerForTask, resultOfTask} from "../../../../app/js/modal-container";
import {drugndropArray} from "../../../../app/js/base_config";

export {checkDrug_n_DropTask};

const modalContainerDrugAndDrop = document.querySelector('.modal-container--drug-n-drop');
const TASK_HTML = require('./drug-n-drop-task.html');
modalContainerDrugAndDrop.innerHTML = TASK_HTML;

const wordInDrug_n_DropTask = document.querySelector('.modal-container__question--drug-n-drop');
const mover1 = document.querySelector('.mover1');
const mover2 = document.querySelector('.mover2');
const mover3 = document.querySelector('.mover3');
const mover4 = document.querySelector('.mover4');
const mover5 = document.querySelector('.mover5');
const mover6 = document.querySelector('.mover6');

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

 window.dragWord = dragEvent => {
  dragEvent.dataTransfer.setData("text/html",
  dragEvent.target.textContent + "|" + dragEvent.target.parentNode.id);
}

 window.dropWord = dropEvent => {
  let dropData = dropEvent.dataTransfer.getData("text/html");
  let dropItems = dropData.split("|");
  let prevElem = document.getElementById(dropItems[1]);
  prevElem.getElementsByTagName("div")[0].textContent = dropEvent.target.textContent;
  dropEvent.target.textContent = dropItems[0];
  dropEvent.preventDefault();
}

// функция выбора случайного слова
function getRandomWord() {
  window.currentWord = getRandomElementFromArray(drugndropArray).split('');
  window.srtResult = window.currentWord.join('');
  window.shufleWord = shuffle(window.currentWord);
}
getRandomWord();

mover1.textContent = window.shufleWord[0];
mover2.textContent = window.shufleWord[1];
mover3.textContent = window.shufleWord[2];
mover4.textContent = window.shufleWord[3];
mover5.textContent = window.shufleWord[4];
mover6.textContent = window.shufleWord[5];

// функция нанесения урона врагом
function inflictionDamageOfEnemy() {
  if (window.counterLifeEnemy > 0) { // при наличии у него ХП
    changelifeLineCharacter(window.damageFromEnemy);
    boomAnimationHero(); // взрыв после закрытия модалки
  }
  window.currentTaskIndex = 3;
  getRandomWord();
  activateBtnsInGame(); // кнопки активация
  inputAnswerForTask.value = ''; // убираем старые введённые данные инпута
}

// функция проверки задачи на вычисление
async function checkDrug_n_DropTask() {
  if (window.srtResult == (mover1.textContent + mover2.textContent + mover3.textContent + mover4.textContent + mover5.textContent + mover6.textContent)) {
    resultOfTask.innerHTML = 'ВЕРНО!';
    resultOfTask.classList.add('modal-container__right-result');
    await pause(DURATION_HERO_ATTACK);  // урон врагу
    changelifeLineCharacter(window.increaseHealthForCharacter); // пополненние ХП при выборе заклинания Лечения
    changelifeLineEnemy(window.damageForEnemy);
    boomAnimationEnemy(); // взрыв после закрытия модалки
    inputAnswerForTask.value = ''; // убираем старые введённые данные инпута
    await pause(DURATION_ENEMY_COUNTER_ATTACK); // ответный удар врага
    inflictionDamageOfEnemy();
  }
  else {
    resultOfTask.innerHTML = 'НЕВЕРНО!';
    await pause(DURATION_ENEMY_ATTACK); // ответный удар врага
    inflictionDamageOfEnemy();
  }
}
