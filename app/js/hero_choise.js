import {heroesArray} from "./base_config";
import {character} from "./animation";

const fieldsRadioInput = document.querySelectorAll('.fields-radio__input');
const characterName = document.querySelector('.game__nickname--character');
let indexSelectedCharacter; // индекс выбранного главного персонажа

for (let i = 0; i < fieldsRadioInput.length; i++) {
  fieldsRadioInput[i].addEventListener('click', function() {
    character.innerHTML = '';
    characterName.innerHTML = '';
    characterName.innerHTML = fieldsRadioInput[i].getAttribute('data-name'); // добавить имя
    indexSelectedCharacter = fieldsRadioInput[i].value;
    character.appendChild(heroesArray[indexSelectedCharacter]);
  });
}

// по умолчанию добавляем первый элемент
if (!indexSelectedCharacter) {
  indexSelectedCharacter = 0;
  character.appendChild(heroesArray[indexSelectedCharacter]);
  characterName.innerHTML = fieldsRadioInput[indexSelectedCharacter].getAttribute('data-name'); // добавить имя Картмана по умолчанию
}
