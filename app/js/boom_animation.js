export {boomAnimationEnemy, boomAnimationHero};

const sound = new Audio("https://siarhei-chaptsau.github.io/Game-South-Butovo/assets/sounds/boom.mp3");
let boom;
let	boomImage;
let	canvas;
let requestId;

// Получить холст
canvas = document.querySelector('.boomAnimationActive');
canvas.width = 120;
canvas.height = 120;

// Создать лист для спрайтов
boomImage = new Image();

// Создание спрайта
boom = sprite({
  context: canvas.getContext("2d"),
  width: 1024,
  height: 64,
  image: boomImage,
  numberOfFrames: 16,
  ticksPerFrame: 4
});

// Загрузить лист спрайта
 boomImage.src = "https://siarhei-chaptsau.github.io/Game-South-Butovo/assets/images/img/boom-sprite-animation.png";

function gameLoop () {
  requestId = undefined;
  startBoomAnimation();
  boom.update();
  boom.render();
}

function sprite (options) {
  let that = {};
  let frameIndex = 0;
  let	tickCount = 0;
  let	ticksPerFrame = options.ticksPerFrame || 0;
  let	numberOfFrames = options.numberOfFrames || 1;
  that.context = options.context;
  that.width = options.width;
  that.height = options.height;
  that.image = options.image;
  that.update = () => {
    tickCount++;
    if (tickCount > ticksPerFrame) {
      tickCount = 0;
      if (frameIndex < numberOfFrames - 1) { // Если текущий индекс кадра находится в диапазоне
        frameIndex++; // Перейдите к следующему кадру
      } else {
        frameIndex = 0;
      }
      if (frameIndex == 15){
        stopBoomAnimation();  // Останавливаем анимацию после прокрутки спрайта
      }
    }
  };

  that.render = () => {
    that.context.clearRect(0, 0, that.width, that.height); // Очистить холст
    that.context.drawImage(that.image, frameIndex * that.width / numberOfFrames, 0, that.width / numberOfFrames, that.height, 0, 0, that.width / numberOfFrames, that.height);
  };
  return that;
}

function startBoomAnimation() {
  if (!requestId) {
    requestId = window.requestAnimationFrame(gameLoop);
  }
}

function stopBoomAnimation() {
  if (requestId) {
    window.cancelAnimationFrame(requestId);
    requestId = undefined;
  }
}

function boomAnimationHero() {
  canvas.style.left = "500px";
  canvas.style.top =  "0px";
  startBoomAnimation();
  sound.play();
}

function boomAnimationEnemy() {
  canvas.style.left = "1250px";
  canvas.style.top = "0px";
  startBoomAnimation();
  sound.play();
}
