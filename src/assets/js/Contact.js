function activateAnimation() {
    var boxes = document.querySelectorAll('.box');

    for (var i = 0; i < boxes.length; i++) {
      if (isElementVisible(boxes[i])) {
        boxes[i].classList.add('show');
      }
    }
  }

  function isElementVisible(element) {
    var rect = element.getBoundingClientRect();
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;

    return (
      rect.top >= 0 &&
      rect.bottom <= windowHeight
    );
  }

  window.addEventListener('scroll', activateAnimation);

 
