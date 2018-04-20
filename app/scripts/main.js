//
// Init gumshoe plugin for create brillyant guidebook
//

gumshoe.init();

//
// Init init smoth scroll
//

var scroll = new SmoothScroll('[href*="#"]');

//
// fixed menu for guide book
//

const element = document.querySelector('[data-gumshoe-header]');
if (element) {
  const aside = document.querySelector('aside');
  var cs = getComputedStyle(aside);
  //max width for menu
  const maxWidth = function() {
    var width = parseFloat(aside.clientWidth);
    width -= parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
    element.style.width = width + 'px';
  };
  maxWidth();
  //check resize
  window.addEventListener('resize', maxWidth);
  //get position and get fixed class
  const getPosition = function() {
    var yPosition = 0;

    yPosition += element.offsetTop - element.scrollTop + element.clientTop;

    if (200 <= this.scrollY) {
      element.classList.add('guidebook_fixed');
    } else {
      element.classList.remove('guidebook_fixed');
    }
  };

  getPosition();
  window.addEventListener('scroll', function(e) {
    getPosition();
    clientScroll = this.scrollY;
  });
}

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
    elemLeft.style.paddingRight = margin + parseInt(padding) + 'px';
    elemRight.style.paddingLeft = margin + parseInt(padding) + 'px';
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
// DEV - Rtl direction
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

//
// Dots generate for sliders
//

const sliderDotBlocks = document.querySelectorAll(
  '[data-glide-el="controls[nav]"]'
);

if (sliderDotBlocks) {
  sliderDotBlocks.forEach(function(dotBlock) {
    let sliderSlides = dotBlock.parentNode.querySelector('.glide__slides');

    for (let i = 0; i < sliderSlides.children.length; i++) {
      let sliderDot = document.createElement('div');
      sliderDot.classList.add('glide__bullet');
      sliderDot.setAttribute('data-glide-dir', '=' + i);

      dotBlock.appendChild(sliderDot);
    }
  });
}

//
// Reviews slider
//

const reviewsSlider = document.querySelector('.reviews-slider .glide');

reviewsSlider &&
  new Glide(reviewsSlider, {
    perView: 1
  }).mount();

//
// Awards slider
//

const awardsSlider = document.querySelector('.awards-slider .glide');

awardsSlider &&
  new Glide(awardsSlider, {
    perView: 4,
    type: 'carousel',
    breakpoints: {
      576: { perView: 2 },
      1200: { perView: 3 },
      1300: { perView: 4 }
    }
  }).mount();

//
// Progress value
//

const progressBlocks = document.querySelectorAll('[data-progress]');

progressBlocks &&
  progressBlocks.forEach(function(progressBlock) {
    let percent = progressBlock.getAttribute('data-progress');

    progressBlock.querySelector('svg').style.strokeDashoffset =
      percent * 1.9 + 170;
  });

//
// Contacts map
//

function initMap() {
  var map = new google.maps.Map(document.getElementById('contacts-map'), {
    zoom: 12,
    center: { lat: 38.86, lng: -77.0423239 }
  });
  var marker = new google.maps.Marker({
    position: { lat: 38.8140638, lng: -77.0423239 },
    map: map
  });
}

//
// Accordion for vacancies
//

const vacanciesAccordion = document.querySelectorAll('.vacancies__header');

if (vacanciesAccordion) {
  vacanciesAccordion.forEach(function(elem) {
    elem.addEventListener('click', function() {
      this.classList.toggle('vacancies__header_active');

      let panel = this.nextElementSibling;

      panel.style.maxHeight
        ? (panel.style.maxHeight = null)
        : (panel.style.maxHeight = panel.scrollHeight + 'px');
    });
  });
}

//
// Contacts page form submit
//
const feedbackForm = document.querySelector('.feedback form');

if (feedbackForm) {
  feedbackForm.addEventListener('submit', function(e) {
    e.preventDefault();
    feedbackForm.classList.add('form_success');
  });
}
