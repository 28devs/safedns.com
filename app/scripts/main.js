window.onload = function() {
  // init vanilla slider

  const awardsSlider = $('#awards-slider').lightSlider({
    item: 4,
    slideMove: 3,
    loop: false,
    controls: false,
    pager: false,
    autoWidth: true,
    adaptiveHeight: true,
    slideMargin: 50,
    onSliderLoad: function() {
      $('.awards__slider-control').addClass('awards__slider-control_load');
    },
    responsive: [
      {
        breakpoint: 992,
        settings: {
          item: 4,
          slideMove: 3,
          autoWidth: false,
          slideMargin: 40
        }
      },
      {
        breakpoint: 750,
        settings: {
          item: 3,
          slideMove: 2,
          autoWidth: false,
          slideMargin: 30
        }
      },
      {
        breakpoint: 576,
        settings: {
          item: 2,
          slideMove: 2,
          autoWidth: false,
          slideMargin: 20
        }
      }
    ]
  });

  const prevSlide = $('#prev').on('click', function() {
    awardsSlider.goToPrevSlide();
  });

  const nextSlide = $('#next').on('click', function() {
    awardsSlider.goToNextSlide();
  });
};

//
// Do indentation as the container
// Container simulation for About page
//

const elemLeft = document.querySelector('.info-about__press-wrap');
const elemRight = document.querySelector('.info-about__job-wrap');

if (elemLeft) {
  const infoAboutPadding = function() {
    let containerBlock = document.querySelector('.container');
    let margin = containerBlock.offsetLeft;
    let padding = window
      .getComputedStyle(containerBlock, null)
      .getPropertyValue('padding-left');

    elemLeft.style.paddingLeft = margin + parseInt(padding) + 'px';
    elemRight.style.paddingRight = margin + parseInt(padding) + 'px';
  };

  document.addEventListener('DOMContentLoaded', infoAboutPadding);
  window.addEventListener('resize', infoAboutPadding);
}

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

const heroBlocks = document.querySelector('.hero__down');
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
var submenusAligment;

if (submenus) {
  submenusAligment = function() {
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

//
// Accordion for mobile menu
//

const stickyNavMobileAccordionMenu = document.querySelectorAll(
  '.sticky-nav__nav-wrap:not(.sticky-nav__nav-close) .sticky-nav__nav-link'
);

if (stickyNavMobileAccordionMenu) {
  stickyNavMobileAccordionMenu.forEach(function(elem) {
    elem.addEventListener('click', function() {
      this.classList.toggle('sticky-nav__nav-link_active');

      let panel = this.nextElementSibling;

      panel.style.maxHeight
        ? (panel.style.maxHeight = null)
        : (panel.style.maxHeight = panel.scrollHeight + 'px');
    });
  });
}

//
// Open mobile menu button
//

const stickyNavMobileOpenBtn = document.querySelector('.sticky-nav__menu');

if (stickyNavMobileOpenBtn) {
  stickyNavMobileOpenBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    document
      .querySelector('.sticky-nav__nav')
      .classList.add('sticky-nav__nav_open');
  });
}

//
// Close menu button in mobile menu
//

const stickyNavMobileCloseBtn = document.querySelector(
  '.sticky-nav__nav-close'
);

if (stickyNavMobileCloseBtn) {
  stickyNavMobileCloseBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    this.parentNode.classList.remove('sticky-nav__nav_open');
  });
}

//
// Rtl direction
//

const root = document.documentElement;

function rtlDirection(e) {
  var evtobj = window.event ? event : e;
  if (evtobj.keyCode == 90) {
    root.getAttribute('dir') === 'rtl'
      ? root.setAttribute('dir', 'ltr')
      : root.setAttribute('dir', 'rtl');
  }
}
document.onkeydown = rtlDirection;
