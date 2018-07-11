import {showPopupScore, incantationIndicator} from "./popups";
import {ratingTable, scoreInPopupScore, textResultRoundInPopupScore, createHighscorTable} from "../../app/components/modal-dialog/modal-dialog";

export {changelifeLineCharacter, changelifeLineEnemy, selectOfDamage, resetResultsOfLife, resetResultOfEnemy};

export const lifeLineCharacter = document.querySelector('.game__life-line--character'); // линия жизни
export const lifeLineEnemy = document.querySelector('.game__life-line--enemy');
export const amountLineCharacter = document.querySelector('.game__life-amount--character'); // количество жизни
export const amountLineEnemy = document.querySelector('.game__life-amount--enemy');
export const soundCrying = new Audio("https://siarhei-chaptsau.github.io/Game-South-Butovo/assets/sounds/cartman-is-crying.mp3");
export const soundLaughs = new Audio("https://siarhei-chaptsau.github.io/Game-South-Butovo/assets/sounds/cartman-laughs.mp3");

window.damageForEnemy = 0; // сброс урона
window.damageFromEnemy = 0; // сброс урона
window.increaseHealthForCharacter = 0;

window.counterLifeCharacter = 100; // начальный счётчик жизни героя
window.counterLifeEnemy = 100; // начальный счётчик жизни врага
window.score = 0; // баллы за игру

if (window.score > 100) {
  window.score = 100;
}
if (window.score < 0) {
  window.score = 0;
}

// функция изменения ХП героя
function changelifeLineCharacter(damage) {
  let lifeCharacter = parseInt(lifeLineCharacter.style.width);
  lifeCharacter = (window.counterLifeCharacter - damage);
  if (lifeCharacter > 100) {
    lifeCharacter = 100;
  }
  if (lifeCharacter <= 0) { // поражение героя
    lifeCharacter = 0;
    soundCrying.play(); // звук плача
    ratingTable.innerHTML = ''; // очищаем таблицу перед выводом новой
    window.counterLevel = 1; // сброс счётчика уровней
    window.currentTaskIndex = 0; // сброс счётчика номеров тасков
    window.damageForEnemy = 0; // сброс урона
    window.damageFromEnemy = 0; // сброс урона
    showPopupScore(); // вызов попапа со счётом
    textResultRoundInPopupScore.textContent = ''; // Обнуляем поле вначале
    textResultRoundInPopupScore.textContent = 'Персонажи из Южного Бутова одержали победу';
    window.score = window.score + 100 - window.counterLifeEnemy;
    scoreInPopupScore.textContent = window.score; // подсчёт баллов
    createHighscorTable(); // выводим таблицу баллов
    window.score = 0; //скинуть баллы
  }
  lifeLineCharacter.style.width = lifeCharacter + '%';
  window.counterLifeCharacter = lifeCharacter;
  amountLineCharacter.innerHTML = window.counterLifeCharacter;
}

// функция изменения ХП врага
function changelifeLineEnemy(damage) {
  let lifeEnemy = parseInt(lifeLineEnemy.style.width);
  lifeEnemy = (window.counterLifeEnemy - damage);
  if (lifeEnemy > 100) {
    lifeEnemy = 100;
  }
  if (lifeEnemy <= 0) { // поражение врага
    lifeEnemy = 0;
    soundLaughs.play(); // звук смеха
    ratingTable.innerHTML = ''; // очищаем таблицу перед выводом новой
    window.damageForEnemy = 0; // сброс урона
    window.damageFromEnemy = 0; // сброс урона
    window.increaseHealthForCharacter = 0;
    window.counterLevel = 1; // сброс счётчика уровней
    window.currentTaskIndex = 0; // сброс счётчика номеров тасков
    showPopupScore(); // вызов попапа со счётом
    textResultRoundInPopupScore.textContent = ''; // Обнуляем поле вначале
    textResultRoundInPopupScore.textContent = 'Поздравляем! За победу над противником Вы получаете 100 баллов';
    window.score = window.score + 100;
    scoreInPopupScore.textContent = window.score;
    createHighscorTable(); // выводим таблицу баллов
  }
  lifeLineEnemy.style.width = lifeEnemy + '%';
  window.counterLifeEnemy = lifeEnemy;
  amountLineEnemy.innerHTML = window.counterLifeEnemy;
}

// сброс результатов уровня жизни врага
function resetResultOfEnemy() {
  lifeLineEnemy.style.width = 100 + '%';
  window.counterLifeEnemy = 100;
  amountLineEnemy.innerHTML = 100;
}

// сброс результатов уровней жизни персонажей
function resetResultsOfLife() {
  lifeLineCharacter.style.width = 100 + '%';
  window.counterLifeCharacter = 100;
  amountLineCharacter.innerHTML = 100;
  resetResultOfEnemy();
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// функция определения урона
function selectOfDamage() {
  let tempIncantationIndicator = incantationIndicator; // выбранное заклинание
  if (tempIncantationIndicator == 'restore') {
    window.damageForEnemy = 10; // урон для противника
    window.increaseHealthForCharacter = getRandomNumber(-19, -10); // пополенние ХП в случае правильного ответа
    window.damageFromEnemy = getRandomNumber(29, 36); // урон от противника
  }
  if (tempIncantationIndicator == 'power1x') {
    window.damageForEnemy = getRandomNumber(26, 34);
    window.increaseHealthForCharacter = 0;
    window.damageFromEnemy = getRandomNumber(22, 28);
  }
  if (tempIncantationIndicator == 'power2x') {
    window.damageForEnemy = getRandomNumber(34, 40);
    window.increaseHealthForCharacter = 0;
    window.damageFromEnemy = getRandomNumber(29, 36);
  }
}
