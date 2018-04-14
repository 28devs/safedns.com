// document.addEventListener("DOMContentLoaded", function() {
//
// init vanilla slyder
//
// var slider = tns({
//   container: '#awards-slider',
//   items: 4,
//   mouseDrag: true,
//   controls: false,
//   nav: false
// });

// });

//
// Hide cookie block than press 'I agree'
//

//
// Hide cookie block than press 'I agree'
//

const containerBlock = document.querySelector('.container');
const containerBlockMargin = containerBlock.style;

console.log(containerBlockMargin)

const heroCookieBlock = document.querySelector('.hero__cookie');
const heroCookieBtn = document.querySelector('.hero__cookie .btn');

if (heroCookieBtn) {
  heroCookieBtn.addEventListener('click', function() {
    heroCookieBlock.classList.add('hero__cookie_hide');
  });

  setTimeout(function() {
    heroCookieBlock.classList.remove('hero__cookie_hide');
  }, 2000);
}

//
// Scroll home page than press down button
//

const heroBlocks = document.querySelector('.hero-blocks');
const heroDownBtn = document.querySelector('.hero__down');

if (heroDownBtn) {
  heroDownBtn.addEventListener('click', function() {
    heroBlocks.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    });
  });
}

//
// Center alignment for submenus
//

const submenus = document.querySelectorAll('.sticky-nav__nav-childs');

const submenusAligment = function() {
  submenus.forEach(function(elem) {
    elem.style.left =
      -Math.round(
        Math.abs((elem.offsetWidth - elem.parentNode.offsetWidth) / 2)
      ) + 'px';
  });
};
submenusAligment();
window.onresize = submenusAligment;
