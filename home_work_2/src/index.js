import './polyfill/pep'

import generateContent from './generateContentFromTemplate';
import { setMaxHeightForTruncate, isTouchDevice, isTemplateSupported } from './utils';
import handleGestures from './handleGestures';

window.onload = async function () {
  /* Генерируются карточки из json данных на основании шаблона */
  if (isTemplateSupported) {
    await generateContent();
    // Установим максимально-возможную высоту для заголовков карточек
    setMaxHeightForTruncate();
  } else {
    console.error('тег <template> не поддерживается браузером. Обновитесь на Yandex Browser');
  }

  /* Если это тач устройства, то добавляем в body класс .touch */
  if (isTouchDevice()) {
    document.body.classList.add('touch');
  }

  /* При изменении размера окна пересчитываем максимально-возможную высоту заголовков карточек */
  window.onresize = function () {
    setMaxHeightForTruncate();
  }

  /* Показывать / скрывать меню на узких экранах по клику на "бургерное меню" */
  document.querySelector('#toggle-menu').addEventListener('click', () => {
    document.querySelector('#nav-menu').classList.toggle('menu_visible');
  });

  /* Обрабатывать жесты */
  handleGestures();
}

