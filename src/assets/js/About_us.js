function activateAnimationCuadro1() {
  var fotoElement = document.querySelector('.About_us_foto');
  var cuadroElement = document.querySelector('.cuadro_1');

  if (isElementVisible(fotoElement)) {
    cuadroElement.classList.add('show');
    fotoElement.classList.add('show');
  }

  if (isElementVisible(cuadroElement)) {
    cuadroElement.classList.add('show');
    fotoElement.classList.add('show');
    window.removeEventListener('scroll', activateAnimationCuadro1);
  }
}

function activateAnimationCuadro2() {
  var cuadro2Element = document.querySelector('.cuadro_2');
  var foto2Element = document.querySelector('.About_us_foto02');

  if (isElementVisible(cuadro2Element)) {
    cuadro2Element.classList.add('show');
  }

  if (isElementVisible(foto2Element)) {
    foto2Element.classList.add('show');
  }

  if (isElementVisible(cuadro2Element) && isElementVisible(foto2Element)) {
    window.removeEventListener('scroll', activateAnimationCuadro2);
  }
}

function isElementVisible(element) {
  var rect = element.getBoundingClientRect();
  var windowHeight = window.innerHeight || document.documentElement.clientHeight;

  return rect.top >= 0 && rect.bottom <= windowHeight;
}

window.addEventListener('scroll', activateAnimationCuadro1);
window.addEventListener('scroll', activateAnimationCuadro2);
