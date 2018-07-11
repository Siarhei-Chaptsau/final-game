export const pause = async (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

export const DURATION_HERO_ATTACK = 3000;
export const DURATION_ENEMY_COUNTER_ATTACK = 2000;
export const DURATION_ENEMY_ATTACK = 3000;
export const DURATION_GAME_ACTIVATION = 900;
export const DURATION_MODAL_HIDDEN = 1100;
export const DURATION_MODAL_SHOW = 5000;
export const DURATION_MODAL_ANIMATION_BUTTONS = 300;
export const DURATION_MODAL_ANIMATION_POPUP = 200;
export const DURATION_POPUP_LEVEL_SHOW = 2000;
export const DURATION_POPUP_LEVEL_HIDDEN = 5000;
export const DURATION_EXIT_GAME = 1500;
export const DURATION_DEACTIVATE_BUTTONS = 10;
