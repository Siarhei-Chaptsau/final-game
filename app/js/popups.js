import 'babel-polyfill';
import {pause, DURATION_MODAL_SHOW, DURATION_MODAL_ANIMATION_BUTTONS, DURATION_MODAL_ANIMATION_POPUP, DURATION_POPUP_LEVEL_SHOW, DURATION_POPUP_LEVEL_HIDDEN, DURATION_EXIT_GAME, DURATION_DEACTIVATE_BUTTONS} from "./utils";
import {activateFirstSpell, activateSecondSpell, activateThirdSpell} from "./animate_sound_popup";
import {resetEnemyComponents, renderEnemy} from "./enemy_create";
import {resetResultsOfLife, soundCrying, soundLaughs} from "./mechanics-game";
import {addEventLevelCheckOne, addEventLevelCheckResult} from "./modal-container";
import {animateCharacter, animateEnemy} from "./animation";
import {popupScore} from "../../app/components/modal-dialog/modal-dialog";

export {activateBtnsInGame, activatedBobyInGame, showPopupIncantations, showLevelMessage, showPopupScore, incantationIndicator};

export const game = document.querySelector('.game');
export const btnsInGame = document.querySelectorAll('.game__btn');
export const incantationBtn = document.querySelectorAll('.popup__incantation-btn');
export const btnPopupContinueGame = document.querySelector('.popup__btn--game');
const ENTER_KEYCODE = 13;
const ESC_KEYCODE = 27;
const fieldsTextContainer = document.querySelectorAll('.fields-text__items');
const fieldsCheckboxContainer = document.querySelectorAll('.fields-checkbox__items');
const fieldsRadioContainer = document.querySelectorAll('.fields-radio__items');
const btnStartGame = document.querySelector('.field-action__btn');
const pageHeaderGame = document.querySelector('.page-header-game');
const slogan = document.querySelector('.slogan');
const form = document.querySelector('.form');
const gameLevelMessage = document.querySelector('.game__level-message');
const btnExitInGame = document.querySelector('.game__btn--exit');
const btnNextRoundInGame = document.querySelector('.game__btn--next-round');
const popupFailure = document.querySelector('.popup--failure');
const btnPopupFailure = document.querySelector('.popup__btn--failure');
const popupIncantations = document.querySelector('.popup--incantations');
const popupIncantationLinks = document.querySelector('.popup__incantation-links');
const popupTableTag = document.querySelector('.popup__table-tag');
const btnPopupExitFromGame = document.querySelector('.popup__btn--exit');
const soundIntro = new Audio("https://siarhei-chaptsau.github.io/Game-South-Butovo/assets/sounds/intro.mp3");

window.addEventListener('load', event => {
  soundIntro.play(); // звук заставки
});

// функция делает недоступными все поля форм
let makeDisabledBobyAndForms = () => {
  fieldsTextContainer.forEach(function(el) {
    el.setAttribute('disabled', '');
  });
  fieldsCheckboxContainer.forEach(el => {
    el.setAttribute('disabled', '');
  });
  fieldsRadioContainer.forEach(el => {
    el.setAttribute('disabled', '');
  });
  btnStartGame.setAttribute('disabled', '');
  pageHeaderGame.classList.add('page-header-game--disabled');
  slogan.classList.add('slogan--disabled');
  form.classList.add('form--disabled');
  document.body.classList.add('body--disabled');
}

// функция активации полей форм
let activateBobyAndForms = () => {
  fieldsTextContainer.forEach(el => {
    el.removeAttribute('disabled');
  });
  fieldsCheckboxContainer.forEach(el => {
    el.removeAttribute('disabled');
  });
  fieldsRadioContainer.forEach(el => {
    el.removeAttribute('disabled');
  });
  btnStartGame.removeAttribute('disabled');
  pageHeaderGame.classList.remove('page-header-game--disabled');
  slogan.classList.remove('slogan--disabled');
  form.classList.remove('form--disabled');
  document.body.classList.remove('body--disabled');
}

// валидация на вход в игру
let checkFilledFieldsHandler = event => {
  event.preventDefault();
  if (document.getElementsByName('name')[0].value
  && document.getElementsByName('surname')[0].value
  && document.getElementsByName('email')[0].value) {
    init();
  } else {
    popupFailure.classList.add('popup--show');
    makeDisabledBobyAndForms();
  }
}
btnStartGame.addEventListener('click', checkFilledFieldsHandler);

// закрытие попапа
let closePopupHandler = () => {
  if (popupFailure.classList.contains('popup--show')) {
    popupFailure.classList.remove('popup--show');
    activateBobyAndForms();
  }
}
btnPopupFailure.addEventListener('click', closePopupHandler);

// закрытия попапов ESC
let closePopupEscHandler = event => {
  if (event.keyCode === ESC_KEYCODE) {
    if (popupFailure.classList.contains('popup--show')) {
      popupFailure.classList.remove('popup--show');
    }
    activateBobyAndForms();
  }
}
window.addEventListener('keydown', closePopupEscHandler);

/* ----- модальное окно заклинаний ----- */

// функция делает недоступными кнопки в игре
let makeDisabledBtnsInGame = () => {
  btnsInGame.forEach(el => {
    el.setAttribute('disabled', '');
    el.classList.add('btn--disabled'); // обесцвечивает кнопку
  });
}

// функция делает недоступным боди в игре
let makeDisabledBobyInGame = () => {
  game.classList.add('game--disabled');
  document.body.classList.add('body--disabled');
}

// функция активации кнопок и боди в игре
let activateBtnsInGame = () => {
  btnsInGame.forEach(el => {
    el.removeAttribute('disabled');
    el.classList.remove('btn--disabled');
  });
}

// функция активации кнопок и боди в игре
let activatedBobyInGame = () => {
  game.classList.remove('game--disabled');
  document.body.classList.remove('body--disabled');
}

let incantationIndicator; // индикатор выбранного заклинанния

// функция для проверки выбранного заклинания
function checkSelectedIncantation(obj) {
  if (obj.getAttribute('data-value') == 'restore') {
    incantationIndicator = 'restore'; // отображает выбранное заклинание
    activateFirstSpell(); //отображает звук и анимацию
    return incantationIndicator;
  }
  if (obj.getAttribute('data-value') == 'power1x') {
    incantationIndicator = 'power1x';
    activateSecondSpell(); //отображает звук и анимацию
    return incantationIndicator;
  }
  if (obj.getAttribute('data-value') == 'power2x') {
    incantationIndicator = 'power2x';
    activateThirdSpell(); //отображает звук и анимацию
    return incantationIndicator;
  }
}

// отображает модальное окно заклинаний
async function showPopupIncantations() {
  await pause(DURATION_MODAL_SHOW);
  popupIncantations.classList.remove('popup--hidden');
  popupIncantations.classList.add('popup--show');
  makeDisabledBobyInGame(); // скрытие боди во время попапа заклинаний
}

// закрытие и анимация кнопок модального окна заклинаний
let btnSelectIncantationHandler = async function(e) {
  e.preventDefault;
  if (e.target.classList.contains('popup__incantation-btn')) {
    e.target.classList.remove('animate');
    e.target.classList.add('animate');
    checkSelectedIncantation(e.target); // узнать выбранное заклинанние
    await pause(DURATION_MODAL_ANIMATION_BUTTONS);
    e.target.classList.remove('animate');
    await pause(DURATION_MODAL_ANIMATION_POPUP);
    popupIncantations.classList.remove('popup--show');
    popupIncantations.classList.add('popup--hidden');
  }
};

for (let i = 0; i < incantationBtn.length; i++) {
  incantationBtn[i].addEventListener('click', btnSelectIncantationHandler);
}

/* ----- окно инфы о раунде ----- */

// обобразить инфу о раунде
async function showLevelMessage() {
  await pause(DURATION_POPUP_LEVEL_SHOW);
  gameLevelMessage.classList.add('game__level-message--show');
  await pause(DURATION_POPUP_LEVEL_HIDDEN);
  gameLevelMessage.classList.remove('game__level-message--show');
}

/* ----- кнопка выхода из игрового поля досрочно и деактивация кнопки след тура ----- */

// функция выхода из игрового поля
function hidePlayingField() {
  pageHeaderGame.classList.remove('page-header-game--hidden');
  slogan.classList.remove('slogan--hidden');
  form.classList.remove('form--hidden');
  game.classList.remove('game--show');
}

// функция для выхода из игры и обнуления жизней, компонентов врагов
let btnExitClickHandler = async function () {
  await pause(DURATION_EXIT_GAME);
  resetResultsOfLife(); // обнулить жизнь всем персам
  resetEnemyComponents(); // скинуть отрендоренные компоненты врага
  document.location.reload();
}

// функция деактивации кнопки после нажатия
let btnNextRoundClickHandler = async function () {
  await pause(DURATION_DEACTIVATE_BUTTONS);
  btnNextRoundInGame.setAttribute('disabled', ''); // деактивирует кнопку
}

btnExitInGame.addEventListener('click', btnExitClickHandler);
btnNextRoundInGame.addEventListener('click', btnNextRoundClickHandler);

/* ----- попап с таблицей баллов ----- */

// отображает попап со счётом
function showPopupScore() {
  popupScore.classList.remove('popup--hidden');
  popupScore.classList.add('popup--show');
  makeDisabledBobyInGame(); // скрытие боди
  makeDisabledBtnsInGame(); // скрытие кнопок
}

// обработчик для продолжения игры, закрытия попапа
let btnContinueGameClickHandler = () => {
  resetResultsOfLife(); // обнулить жизнь всем персам
  resetEnemyComponents(); // скинуть отрендоренные компоненты врага
  popupScore.classList.remove('popup--show'); // закрытие попапа
  window.counterLevel = 1; // сброс счётчика уровней
  window.currentTaskIndex = 0; // сброс счётчика номеров тасков
  document.location.reload();
  soundCrying.pause();
  soundCrying.currentTime = 0;
  soundLaughs.pause();
  soundLaughs.currentTime = 0;
}

// обработчик для выхода из игры, попапа и обнуления жизней, компонентов врагов
let btnExitFromGameAndPopapClickHandler = () => {
  popupScore.classList.remove('popup--show'); // закрытие попапа
  document.location.reload();
  resetResultsOfLife(); // обнулить жизнь всем персам
  resetEnemyComponents(); // скинуть отрендоренные компоненты врага
  activateBtnsInGame();
  activatedBobyInGame();
}

btnPopupContinueGame.addEventListener('click', btnContinueGameClickHandler);
btnPopupExitFromGame.addEventListener('click', btnExitFromGameAndPopapClickHandler);

/* ----- инициализация игры ----- */

// функция скрытия поля формы
function hideFormField() {
  pageHeaderGame.classList.add('page-header-game--hidden');
  slogan.classList.add('slogan--hidden');
  form.classList.add('form--hidden');
  game.classList.add('game--show');
}

function init() {
  hideFormField();
  renderEnemy(); // рендоринг врага
  makeDisabledBtnsInGame(); // деактивирует кнопки в игре
  animateCharacter();
  animateEnemy();
  showLevelMessage(); // отображает инфу о раунде
  showPopupIncantations(); // отображает модальное окно заклинаний
  addEventLevelCheckOne();
  addEventLevelCheckResult();
  soundIntro.pause(); // остановка звука
  soundIntro.currentTime = 0;
}
