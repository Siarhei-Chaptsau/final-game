import 'babel-polyfill';
import {pause, DURATION_HERO_ATTACK, DURATION_ENEMY_COUNTER_ATTACK, DURATION_ENEMY_ATTACK} from "../../../../app/js/utils";
import {getRandomElementFromArray} from "../../../../app/js/enemy_create";
import {activateBtnsInGame} from "../../../../app/js/popups";
import {changelifeLineCharacter, changelifeLineEnemy} from "../../../../app/js/mechanics-game";
import {boomAnimationHero, boomAnimationEnemy} from "../../../../app/js/boom_animation";
import {inputAnswerForTask, resultOfTask} from "../../../../app/js/modal-container";

export {checkCalculationsTask};

const modalContainerArithmetic = document.querySelector('.modal-container--arithmetic');
const TASK_HTML = require('./arithmetic-task.html');

modalContainerArithmetic.innerHTML = TASK_HTML;

const numberInArithmeticTask = document.querySelectorAll('.modal-container__num');
const signInArithmeticTask = document.querySelectorAll('.modal-container__sign');
const arrOfSign = ['+', '-', '/', '*'];
const initialArrOfNumber = [...Array(11).keys()]; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const arrOfNumber = initialArrOfNumber.slice(2); // [2, 3, 4, 5, 6, 7, 8, 9, 10]
let arrOfResults = []; // массив, куда сохраняются полученные значения рандома
let resultOfCalculations; // правильный ответ вычисления

// функция рандомной вставки значений в числовые поля
function insertRandomNumber() {
  for (let i = 0; i < numberInArithmeticTask.length; i++) {
    numberInArithmeticTask[i].innerHTML = getRandomElementFromArray(arrOfNumber);
    arrOfResults.push(Number(numberInArithmeticTask[i].innerHTML));
  }
}
insertRandomNumber();

// функция рандомной вставки значений в знаковые поля
function insertRandomSign() {
  for (let i = 0; i < signInArithmeticTask.length; i++) {
    signInArithmeticTask[i].innerHTML = getRandomElementFromArray(arrOfSign);
    arrOfResults.push(signInArithmeticTask[i].innerHTML);
  }
}
insertRandomSign();

// функция вычисления значения строки
function calculateString(fn) {
  return new Function('return ' + fn)();
}

// функция вычисления рандомных значений в итоговое значение
function calculateRandomValues() {
  let resultInString = arrOfResults[0] + arrOfResults[3] + arrOfResults[1] + arrOfResults[4] + arrOfResults[2];
  resultOfCalculations = Math.round(calculateString(resultInString));
  arrOfResults = [];
}
calculateRandomValues();

// функция нанесения урона врагом
function inflictionDamageOfEnemy() {
  if (window.counterLifeEnemy > 0) { // при наличии у него ХП
    changelifeLineCharacter(window.damageFromEnemy);
    boomAnimationHero(); // взрыв после закрытия модалки
  }
  window.currentTaskIndex = 1;
  insertRandomNumber();
  insertRandomSign();
  calculateRandomValues();
  activateBtnsInGame(); // кнопки активация
  inputAnswerForTask.value = ''; // убираем старые введённые данные инпута
}

// функция проверки задачи на вычисление
async function checkCalculationsTask() {
  if (inputAnswerForTask.classList.contains('answered')) {
    if (inputAnswerForTask.value == resultOfCalculations) {
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
