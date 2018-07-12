export let enemyesArrayBody = [];
export let enemyesArrayShorts = [];
export let enemyesArraySuits = [];
export let enemyesArrayHands = [];
export let enemyesArrayFace = [];
export let enemyesArrayEyes = [];
export let enemyesArrayMouth = [];
export let enemyesArrayHats = [];
export let enemyesArrayDanageFaces = [];
export let heroesArray = [];
export let enemyFirstPartName = ['Щербатый', 'Ржавый', 'Сопливый', 'Слюнявый', 'Сивый', 'Тощий'];
export let enemySecondPartName = ['шмыга', 'гном', 'гоблин', 'синяк', 'панк', 'торчок'];
export let enemyThirdPartName = ['Джонни', 'Макс', 'Димон', 'Валера', 'Нафаня', 'Сигиз'];
export let drugndropArray = ['КОРОВА', 'СОБАКА', 'РАДУГА', 'МАЛИНА', 'АНАНАС', 'ЛОПАТА'];

let github = 'https://siarhei-chaptsau.github.io/Game-South-Butovo/';

enemyesArrayBody = setInitArrays(github + 'assets/images/img/enemyes/body/body_', 3);
enemyesArrayShorts = setInitArrays(github + 'assets/images/img/enemyes/shorts/shorts_', 7);
enemyesArraySuits = setInitArrays(github + 'assets/images/img/enemyes/suits/suit_', 7);
enemyesArrayHands = setInitArrays(github + 'assets/images/img/enemyes/body/body_', 3);
enemyesArrayFace = setInitArrays(github + 'assets/images/img/enemyes/body/body_', 3);
enemyesArrayEyes = setInitArrays(github + 'assets/images/img/enemyes/eyes/eyes_', 7);
enemyesArrayMouth = setInitArrays(github + 'assets/images/img/enemyes/mouth/mouth_', 7);
enemyesArrayHats = setInitArrays(github + 'assets/images/img/enemyes/hats/hat_', 7);
enemyesArrayDanageFaces = setInitArrays(github + 'assets/images/img/enemyes/damage_face/damage_face_', 3);
heroesArray = setInitArrays(github + 'assets/images/img/heroes/hero_', 3);

function setInitArrays(link, sumImagesInFolder) {
  let n = sumImagesInFolder;
  let array = [], image;
  let i = 1;
  for (i = 1; i <= n; i++) {
    image = new Image;
  image.src = link + i + '.png' ;
    array.push(image);
  };
  return array;
};
