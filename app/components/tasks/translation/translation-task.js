import 'babel-polyfill';
import {pause, DURATION_HERO_ATTACK, DURATION_ENEMY_COUNTER_ATTACK, DURATION_ENEMY_ATTACK} from "../../../../app/js/utils";
import {getRandomElementFromArray} from "../../../../app/js/enemy_create";
import {activateBtnsInGame} from "../../../../app/js/popups";
import {changelifeLineCharacter, changelifeLineEnemy} from "../../../../app/js/mechanics-game";
import {boomAnimationHero, boomAnimationEnemy} from "../../../../app/js/boom_animation";
import {inputAnswerForTask, resultOfTask} from "../../../../app/js/modal-container";
import {arrayWordsAndTranslations} from "../../../../app/js/dictionary";

export {checkTranslationTask};

const modalContainerTranslation = document.querySelector('.modal-container--translation');
const TASK_HTML = require('./translation-task.html');

modalContainerTranslation.innerHTML = TASK_HTML;
const wordInTranslationTask = document.querySelector('.modal-container__wraper--translation');

window.randomArrayFromDictionary = [];
window.arrayOfRightAnswers = [];

// функция выбора случайного массива
function getRandomWord() {
  window.randomArrayFromDictionary = getRandomElementFromArray(arrayWordsAndTranslations);
  window.arrayOfRightAnswers = window.randomArrayFromDictionary.slice(1); // массив правильных ответов
}
getRandomWord();

// функция рандомной вставки значений в числовые поля
function insertRandomWord() {
  wordInTranslationTask.innerHTML = window.randomArrayFromDictionary[0];
}
insertRandomWord();

// функция нанесения урона врагом
function inflictionDamageOfEnemy() {
  if (window.counterLifeEnemy > 0) { // при наличии у него ХП
    changelifeLineCharacter(window.damageFromEnemy);
    boomAnimationHero(); // взрыв после закрытия модалки
  }
  window.currentTaskIndex = 2;
  getRandomWord();
  insertRandomWord();
  activateBtnsInGame(); // кнопки активация
  inputAnswerForTask.value = ''; // убираем старые введённые данные инпута
}

// функция проверки задачи на вычисление
async function checkTranslationTask() {
  if (inputAnswerForTask.classList.contains('answered')) {
    if (window.arrayOfRightAnswers.includes(inputAnswerForTask.value)) {
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
}
