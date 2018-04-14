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
const infoAboutPadding = function() {
  console.log(document.documentElement.clientWidth)
  let containerBlock = document.querySelector('.container');

  let elemLeft = document.querySelector('.info-about__press-wrap');
  let elemRight = document.querySelector('.info-about__job-wrap');

  let margin = containerBlock.offsetLeft
  let padding = window.getComputedStyle(containerBlock, null).getPropertyValue('padding-left')
  console.log(margin)
  console.log(padding)
  elemLeft.style.paddingLeft = margin + parseInt(padding) + 'px';
  elemRight.style.paddingRight = margin + parseInt(padding) + 'px';
}

document.addEventListener('DOMContentLoaded', infoAboutPadding)
window.addEventListener('resize', infoAboutPadding)

//
// Hide cookie block than press 'I agree'
//


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

if (submenus) {
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
}

//
// Minify header when page scroll
//

const stickyNav = document.querySelector('.sticky-nav');

if (stickyNav) {
  stickyNav.classList.add('sticky-nav_load-state');

  const headerScroll = function() {
    this.scrollY < 8
      ? stickyNav.classList.remove('sticky-nav_scroll-state')
      : stickyNav.classList.add('sticky-nav_scroll-state');
  };
  headerScroll();
  window.onscroll = headerScroll;
}
