const popupScore = document.querySelector('.popup--score');
const MODAL_HTML = require('./modal-dialog.html');

popupScore.innerHTML = MODAL_HTML;

const textResultRoundInPopupScore = document.querySelector('.popup__text--result-round');
const popupTable = document.querySelector('.popup__table');
const scoreInPopupScore = document.querySelector('.popup__text--score');
const ratingTable = document.createElement('table');

let ratingList = []; // массив всех результатов
let player = []; // массив с инфой игрока

// функция отрисовки таблицы рекордов
function createHighscorTable() {
  // заполняем профиль игрока в объект и добавляем в хранилище
  let playerName = document.getElementsByName('name')[0].value;
  let playerSurname = document.getElementsByName('surname')[0].value;
  let playerScore = window.score;
  player[0] = playerName;
  player[1] = playerSurname;
  player[2] = playerScore;

  // добавляем время игрока в массив и сохраняем таблицу 10-ти лучших в хранилище
  ratingList = JSON.parse(window.localStorage.getItem('ratingList')); // вернёт массив значений лежащих в хранилище
  if (!ratingList) {
    ratingList = [];
  }
  if (ratingList.length == 10) {
    ratingList.sort(function(a, b) {
      return b[2] - a[2];
    });
    ratingList = ratingList.slice(0, 9);
  }
  ratingList.push(player);

  if ((ratingList.length > 0) && ratingList[ratingList.length - 1][2] > playerScore) {
    ratingList[ratingList.length - 1][0] = playerName;
    ratingList[ratingList.length - 1][1] = playerSurname;
    ratingList[ratingList.length - 1][2] = playerScore;
  }
  if (ratingList.length > 1) {
    ratingList.sort(function(a, b) {
      return b[2] -a[2];
    });
  }
  window.localStorage.setItem('ratingList', JSON.stringify(ratingList));

  // отрисовываем таблицу результатов
  const headRow = document.createElement('tr');
  ratingTable.appendChild(headRow);
  ratingTable.classList.add('popup__table-tag');

  // отрисовываем шапку
  for (let i = 0; i < 4; i++) {
    const headCell = document.createElement('th');
    headCell.classList.add('popup__cell');
    if (i == 0) headCell.innerHTML = '№';
    if (i == 1) headCell.innerHTML = 'Имя';
    if (i == 2) headCell.innerHTML = 'Фамилия';
    if (i == 3) headCell.innerHTML = 'Счёт';
    headRow.appendChild(headCell);
  }
  for (let i = 0; i < 10; i++) {
    const tableRow = document.createElement('tr');
    ratingTable.appendChild(tableRow);
    for (let j = 0; j < 4; j++) {
      const tableCell = document.createElement('td');
      if (j == 0) tableCell.innerHTML = `${i + 1}`; // внести номер позиции
      if (ratingList[i]) {
        if (j == 1) tableCell.innerHTML = `${ratingList[i][0]}`; // внести имя
        if (j == 2) tableCell.innerHTML = `${ratingList[i][1]}`; // внести фамилию
        if (j == 3) tableCell.innerHTML = `${ratingList[i][2]}`; // внести счёт
      }
      tableCell.classList.add('popup__cell');
      tableRow.appendChild(tableCell);
    }
  }
  popupTable.appendChild(ratingTable);
}
export {ratingTable, scoreInPopupScore, textResultRoundInPopupScore, createHighscorTable, popupScore};
