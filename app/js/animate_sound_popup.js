export {activateFirstSpell, activateSecondSpell, activateThirdSpell};

const snd1 = new Audio("https://siarhei-chaptsau.github.io/Game-South-Butovo/assets/sounds/Sound_spell1.mp3");
const snd2 = new Audio("https://siarhei-chaptsau.github.io/Game-South-Butovo/assets/sounds/Sound_spell2.mp3");
const snd3 = new Audio("https://siarhei-chaptsau.github.io/Game-South-Butovo/assets/sounds/Sound_spell3.mp3");
let img = document.querySelector('.arrow_animate');

function activateFirstSpell(){  // первое заклинание
  snd1.play();
};

function activateSecondSpell(){
  snd2.play();
};

function activateThirdSpell(){
  snd3.play();
};
