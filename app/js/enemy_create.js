import {enemyesArrayBody, enemyesArrayShorts, enemyesArraySuits, enemyesArrayFace, enemyesArrayHands, enemyesArrayEyes, enemyesArrayMouth, enemyesArrayHats, enemyFirstPartName, enemySecondPartName, enemyThirdPartName} from "./base_config";

export {getRandomElementFromArray, renderEnemy, resetEnemyComponents};

const enemy = document.querySelector('.game__enemy');
const bodys = document.querySelector('.game__body-enemy');
const shorts = document.querySelector('.game__shorts-enemy');
const suits = document.querySelector('.game__suits-enemy');
const hands = document.querySelector('.game__hands-enemy');
const face = document.querySelector('.game__face-enemy');
const eyes = document.querySelector('.game__eyes-enemy');
const mouth = document.querySelector('.game__mouth-enemy');
const hats = document.querySelector('.game__hat-enemy');
const enemyName = document.querySelector('.game__nickname--enemy');

function getRandomElementFromArray(array) {
  let rand = Math.floor(Math.random() * array.length);
  return (array[rand]);
}

function renderEnemy() {
  bodys.appendChild(enemyesArrayBody[0]);
  shorts.appendChild(getRandomElementFromArray(enemyesArrayShorts));
  suits.appendChild(getRandomElementFromArray(enemyesArraySuits));
  face.appendChild(enemyesArrayFace[1]);
  hands.appendChild(enemyesArrayHands[2]);
  eyes.appendChild(getRandomElementFromArray(enemyesArrayEyes));
  mouth.appendChild(getRandomElementFromArray(enemyesArrayMouth));
  hats.appendChild(getRandomElementFromArray(enemyesArrayHats));

  enemyName.appendChild(document.createTextNode(
    getRandomElementFromArray(enemyFirstPartName) + ' '
     + getRandomElementFromArray(enemySecondPartName) + ' '
     + getRandomElementFromArray(enemyThirdPartName)));
}

// обнуление тела и имени врага
function resetEnemyComponents() {
  for (let i = 0; i < enemy.children.length; i++) {
    enemy.children[i].innerHTML = '';
  }
  enemyName.innerHTML = '';
}
