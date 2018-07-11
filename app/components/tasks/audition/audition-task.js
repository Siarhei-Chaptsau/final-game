import 'babel-polyfill';
import {pause, DURATION_HERO_ATTACK, DURATION_ENEMY_COUNTER_ATTACK, DURATION_ENEMY_ATTACK} from "../../../../app/js/utils";
import {getRandomElementFromArray} from "../../../../app/js/enemy_create";
import {activateBtnsInGame} from "../../../../app/js/popups";
import {changelifeLineCharacter, changelifeLineEnemy} from "../../../../app/js/mechanics-game";
import {boomAnimationHero, boomAnimationEnemy} from "../../../../app/js/boom_animation";
import {inputAnswerForTask, resultOfTask} from "../../../../app/js/modal-container";
import {arrayWordsForAudition} from "../../../../app/js/dictionary";

export {checkAuditionTask};

const modalContainerAudition = document.querySelector('.modal-container--audition');
const TASK_HTML = require('./audition-task.html');
modalContainerAudition.innerHTML = TASK_HTML;
const btnForAuditionTask = document.querySelector('.modal-container__btn-speak');

window.randomArrayForAudition = [];
window.arrayOfRightAnswersForAudition = [];

// функция выбора случайного массива
function getRandomAuditionWord() {
  randomArrayForAudition = getRandomElementFromArray(arrayWordsForAudition);
  arrayOfRightAnswersForAudition = randomArrayForAudition.slice(1); // массив правильных ответов
  let wordForAudition = new SpeechSynthesisUtterance();
  wordForAudition.text = randomArrayForAudition[0];
  wordForAudition.rate = 0.4; // замедляет речь

  // функция вставки значений для аудирования
  function speakHandler(startOver) {
    speechSynthesis.cancel();
    if (startOver) {
      speechSynthesis.speak(wordForAudition);
    }
  }
  btnForAuditionTask.addEventListener('click', speakHandler);
}

getRandomAuditionWord();

// функция нанесения урона врагом
function inflictionDamageOfEnemy() {
  if (window.counterLifeEnemy > 0) { // при наличии у него ХП
    changelifeLineCharacter(window.damageFromEnemy);
    boomAnimationHero(); // взрыв после закрытия модалки
  }
  window.currentTaskIndex = 0;
  getRandomAuditionWord();
  activateBtnsInGame(); // кнопки активация
  inputAnswerForTask.value = ''; // убираем старые введённые данные инпута
}

// функция проверки задачи на вычисление
async function checkAuditionTask() {
  if (inputAnswerForTask.classList.contains('answered')) {
    if (arrayOfRightAnswersForAudition.includes(inputAnswerForTask.value)) {
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
