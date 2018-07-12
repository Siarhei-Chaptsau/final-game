import {addEventLevelCheckOne, addEventLevelCheckResult, changeContext} from "./modal-container";
import {showLevelMessage, showPopupIncantations} from "./popups";

export {initNextLevel};

const gameLevelMessage = document.querySelector('.game__level-message');
const popupIncantations = document.querySelector('.popup--incantations');
const levelNumber = document.querySelector('.game__message-span');
const gameLevelNumber = document.querySelector('.game__level-span');
const btnGameNextLevel = document.querySelector('.game__btn--next-round');

window.currentTaskIndex = 0; // счётчик номеров тасков
window.counterLevel = 1; // начальный счётчик уровней

function initNextLevel() {
  window.counterLevel++;
  showLevelMessage(); // показывает сообщение уровня
  levelNumber.textContent = window.counterLevel;
  gameLevelNumber.textContent = window.counterLevel;
  showPopupIncantations(); // показать попапы заклинаний
  changeContext(); // переопределяет текущий уровень
  addEventLevelCheckOne(); // ивент кнопки
  addEventLevelCheckResult(); // ивент проверки таска
}

btnGameNextLevel.addEventListener('click', initNextLevel);
