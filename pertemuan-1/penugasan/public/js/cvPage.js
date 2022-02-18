const allSliderContents = document.querySelectorAll('.slide-in');

function checkSlide(e) {
  allSliderContents.forEach(sliderContent => {
    // Half way through the content
    const slideInAt = (window.scrollY + window.innerHeight) - sliderContent.clientHeight / 2;
    const isHalfShown = slideInAt > sliderContent.offsetTop;
      
    if (isHalfShown) {
      sliderContent.classList.add("active");
    }
    else {
      sliderContent.classList.remove("active");
    }
  });
}

window.addEventListener('scroll', checkSlide);