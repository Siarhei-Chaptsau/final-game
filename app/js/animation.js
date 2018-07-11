export {animateCharacter, animateEnemy, character};

const PAUSE_MOTION_ANIMATION = 2300;
const character = document.querySelector('.game__character');
const enemy = document.querySelector('.game__enemy');

function animate(draw, duration) { // Рисует функция draw, продолжительность анимации duration
  let start = performance.now();
  requestAnimationFrame(function animate(time) {
    let timePassed = time - start; // определить, сколько прошло времени с начала анимации
    if (timePassed > duration) timePassed = duration; // возможно небольшое превышение времени, в этом случае зафиксировать конец
    draw(timePassed); // нарисовать состояние анимации в момент timePassed
    if (timePassed <= duration) { // если время анимации не закончилось - запланировать ещё кадр
      requestAnimationFrame(animate);
    }
  });
}

function animateEnemy() {
  animate(timePassed => {
    enemy.style.right = timePassed / 5 + 'px';
  }, PAUSE_MOTION_ANIMATION);
};

function animateCharacter() {
  animate(timePassed => {
    character.style.left = timePassed / 5 + 'px';
  }, PAUSE_MOTION_ANIMATION);
};
