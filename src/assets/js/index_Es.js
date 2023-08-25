
/** Carrousel IMagenes */
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

showSlide(currentSlide);
setInterval(nextSlide, 5000);

/** Carrousel Texto Animacion*/

const contentElement = document.querySelector('.content');
  
// Agregar clase para mostrar la animación
setTimeout(function() {
  contentElement.classList.add('show');
}, 1000);


/** Start Animacion caracteristicas */
window.addEventListener('scroll', function() {
  const caracteristicas = document.querySelector('.container_caracteristicas');
  const position = caracteristicas.getBoundingClientRect().top;

  const screenPosition = window.innerHeight / 1.3;

  if (position < screenPosition) {
    caracteristicas.classList.add('show');
  }
});


/**  Numero contador seccion number */
function activateNumberAnimation() {
  const countElements = document.querySelectorAll('.number span');
  const duration = 30000; // Duración de la animación en milisegundos
  const endValues = [20, 500, 10]; // Valores finales de los números

  const increment = (endValue, element) => {
    let currentValue = 0;
    const incrementValue = Math.ceil(endValue / (duration / 100));

    const interval = setInterval(() => {
      currentValue += incrementValue;
      element.textContent = currentValue;

      if (currentValue >= endValue) {
        clearInterval(interval);
        element.textContent = endValue;
      }
    }, 10);
  };

  countElements.forEach((element, index) => {
    const endValue = endValues[index];
    increment(endValue, element);
  });
}

function isElementVisible(element) {
  var rect = element.getBoundingClientRect();
  var windowHeight = window.innerHeight || document.documentElement.clientHeight;

  return (
    rect.top >= 0 &&
    rect.bottom <= windowHeight
  );
}

function checkVisibility() {
  var numberSection = document.querySelector('.number');

  if (isElementVisible(numberSection)) {
    activateNumberAnimation();
    window.removeEventListener('scroll', checkVisibility);
  }
}

window.addEventListener('scroll', checkVisibility);

/** Donantes */
window.addEventListener('scroll', function() {
  var containerImg = document.querySelector('.containerImg');
  var containerImgPosition = containerImg.getBoundingClientRect().top;
  var screenPosition = window.innerHeight / 1.3;

  if (containerImgPosition < screenPosition) {
    containerImg.classList.add('show');
  }
});

window.addEventListener('scroll', function() {
  var containerImg = document.querySelector('.titleDonante');
  var containerImgPosition = containerImg.getBoundingClientRect().top;
  var screenPosition = window.innerHeight / 1.3;

  if (containerImgPosition < screenPosition) {
    containerImg.classList.add('show');
  }
});

window.addEventListener('scroll', function() {
  var containerImg = document.querySelector('.parrafoDonante');
  var containerImgPosition = containerImg.getBoundingClientRect().top;
  var screenPosition = window.innerHeight / 1.3;

  if (containerImgPosition < screenPosition) {
    containerImg.classList.add('show');
  }
});
