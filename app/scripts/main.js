//
// Get direction from html tag
//

const rootDirection = document.documentElement.getAttribute('dir') || 'ltr';

//
// Init gumshoe plugin for create brillyant guidebook
//

gumshoe.init();

//
// Init init smoth scroll
//

var scroll = new SmoothScroll('nav [href*="#"], .scroll-to[href*="#"]');

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
// Toggle
//

const toggles = document.querySelectorAll('.toggle');

if (toggles.length) {
  toggles.forEach(function(toggle) {
    toggle.addEventListener('click', function() {
      let input = this.querySelector('input');
      input.value = +input.value ? 0 : 1;

      this.classList.toggle('toggle_on');
    });
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
// select
//

const select = document.querySelectorAll('.select');

if (select) {
  select.forEach(function(item) {
    item.addEventListener('click', function() {
      const select = this.querySelector('select');
      const selectVal = select.value;

      selectVal
        ? item.classList.add('selected')
        : item.classList.remove('selected');
    });
  });
}

//
// radio input
//

const radio = document.querySelectorAll('[data-input-radio]');

if (radio) {
  radio.forEach(function(item, id, er) {
    item.addEventListener('click', function() {
      er.forEach(function(item) {
        item.classList.remove('checked');
      });
      this.classList.add('checked');
    });
  });
}

//
// Tabs
//

const tabsItem = document.querySelectorAll('[data-tabs-link]');

if (tabsItem) {
  tabsItem.forEach(function(item, id, er) {
    item.addEventListener('click', function(e) {
      e.preventDefault();

      er.forEach(function(item) {
        const idDisactive = item.getAttribute('href').substring(1);
        const tabContentDisactive = document.getElementById(idDisactive);
        tabContentDisactive.classList.remove('active');
        item.classList.remove('active');
      });
      const idActive = this.getAttribute('href').substring(1);
      const tabContentActive = document.getElementById(idActive);
      tabContentActive.classList.add('active');
      this.classList.add('active');
    });
  });
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
// Hide and show alert block
//

const alertBlock = document.querySelector('.sticky-nav__alert');
const alertBlockBtn = document.querySelector('.sticky-nav__alert-btn-light');

if (alertBlock) {
  alertBlockBtn.addEventListener('click', function() {
    alertBlock.classList.add('sticky-nav__alert_hide');
  });

  setTimeout(function() {
    alertBlock.classList.remove('sticky-nav__alert_hide');
  }, 1000);
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
      if (window.innerWidth < 992) {
        this.classList.toggle('sticky-nav__nav-link_active');

        let panel = this.nextElementSibling;

        panel.style.maxHeight
          ? (panel.style.maxHeight = null)
          : (panel.style.maxHeight = panel.scrollHeight + 'px');
      }
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

if (reviewsSlider) {
  const reviewsSliderG = new Glide(reviewsSlider, {
    perView: 1
  });

  reviewsSliderG.on('move', function() {
    let bullets = document.querySelectorAll('.glide__bullet');
    bullets.forEach(function(elem) {
      elem.classList.remove('glide__bullet--active');
    });

    let activeBullet = document.querySelector(
      '.glide__bullet[data-glide-dir="=' + reviewsSliderG.index + '"]'
    );
    activeBullet.classList.add('glide__bullet--active');
  });

  reviewsSliderG.mount();
}

//
// Simple slider
//

const simpleSlider = document.querySelector('.simple-slider .glide');

if (simpleSlider) {
  const simpleControls = document.querySelector('.simple-slider__bullets');
  const simpleSliderG = new Glide(simpleSlider, {
    perView: 1
  });

  simpleSliderG.on('move', function() {
    let bullets = document.querySelectorAll('.simple-slider__bullet');
    bullets.forEach(function(elem) {
      elem.classList.remove('simple-slider__bullet_active');
    });
    let activeBullet = document.querySelector(
      '.simple-slider__bullet[data-glide-dir="=' + simpleSliderG.index + '"]'
    );
    activeBullet.classList.add('simple-slider__bullet_active');
  });

  simpleSliderG.mount();

  const sliderButton = document.querySelectorAll(
    '.simple-slider__bullets .simple-slider__bullet'
  );
  const sliderNativeButton = document.querySelector(
    '.simple-controls [data-glide-dir]'
  );
  if (sliderButton.length) {
    sliderButton.forEach(function(node, i) {
      node.addEventListener('click', function() {
        let nativeElem = document.querySelector(
          '.simple-controls [data-glide-dir="=' + i + '"]'
        );
        nativeElem.click();
      });
    });
  }
}

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
// Large slider
//

const largeSlider = document.querySelector('.large-slider .glide');

if (largeSlider) {
  const largeSliderCounterCurrent = document.querySelector(
    '.large-slider__count-current'
  );
  const largeSliderCounterTotal = document.querySelector(
    '.large-slider__count-total'
  );

  largeSliderGlide = new Glide(largeSlider, {
    perView: 1,
    peek: 140,
    breakpoints: {
      988: { peek: 50 },
      412: { peek: 20 }
    }
  });

  largeSliderCounterTotal.innerHTML = document.querySelectorAll(
    '.large-slider .glide__slide'
  ).length;

  largeSliderGlide.on(['move.after', 'build.after'], function() {
    largeSliderCounterCurrent.innerHTML = largeSliderGlide.index + 1;
  });

  largeSliderGlide.mount();
}

//
// Circle progress set value
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
// Accordion for everything
//

const accordions = document.querySelectorAll('[data-accordion]');

if (accordions) {
  accordions.forEach(function(elem) {
    elem.addEventListener('click', function() {
      elem.classList.toggle('accordion__header_active');

      let panel = elem.nextElementSibling;

      panel.style.maxHeight
        ? (panel.style.maxHeight = null)
        : (panel.style.maxHeight = panel.scrollHeight + 'px');
    });
  });
}

//
// Accordion with one actiove element
//

const accordionsOne = document.querySelectorAll('[data-accordion-one]');
const accordionsOneActive = document.querySelector(
  '[data-accordion-one][data-accordion-active]'
);

if (accordionsOneActive) {
  const accord = function(elem) {
    elem.classList.toggle('accordion__header_active');

    let panel = elem.nextElementSibling;

    panel.style.maxHeight
      ? (panel.style.maxHeight = null)
      : (panel.style.maxHeight = panel.scrollHeight + 'px');
  };

  accord(accordionsOneActive);
  accordionsOne.forEach(function(elem, key, array) {
    elem.addEventListener('click', function() {
      array.forEach(function(elem) {
        elem.classList.remove('accordion__header_active');

        let panel = elem.nextElementSibling;
        panel.style.maxHeight = null;
      });

      accord(this);
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

//
// Range slider
//

const rangeSliders = document.querySelectorAll('.range-slider');

if (rangeSliders) {
  rangeSliders.forEach(function(rangeSlider) {
    let bindInput = document.querySelector(
      'input[name=' + rangeSlider.getAttribute('data-bind') + ']'
    );

    let settings = {
      start: +rangeSlider.getAttribute('data-value') || 0,
      step: +rangeSlider.getAttribute('data-step') || 1,
      tooltips: true,
      connect: [true, false],
      direction: rootDirection,
      range: {
        min: +rangeSlider.getAttribute('data-min') || 0,
        max: +rangeSlider.getAttribute('data-max') || 100
      },
      format: {
        to: function(value) {
          return Math.round(value);
        },
        from: function(value) {
          return Math.round(value);
        }
      }
    };

    noUiSlider.create(rangeSlider, settings);

    rangeSlider.noUiSlider.on('update', function(value) {
      bindInput && (bindInput.value = value);
    });
  });
}

//
// jsBusinessPlansToggle
//

const businessPlansToggle = document.querySelector('#businessPlansToggle');

if (businessPlansToggle) {
  businessPlansToggle.addEventListener('click', function() {
    rangeBusinessSlider.noUiSlider.updateOptions({});
  });
}

//
// Zones hack for Range slider
//

const clickZones = document.querySelectorAll('.range-slider__click-zone');

if (clickZones.length) {
  clickZones.forEach(function(zone) {
    zone.addEventListener('click', function() {
      let index = +this.getAttribute('data-zone');
      if (rangeBusinessSlider) {
        rangeBusinessSlider.noUiSlider.set(index);
      }
      if (rangeBuySlider) {
        rangeBuySlider.noUiSlider.set(index);
      }
    });

    zone.addEventListener('mouseover', function() {
      let index = +this.getAttribute('data-zone');

      let allLabel = document.querySelectorAll(
        '.range-slider__label'
      );

      allLabel.forEach(function(label) {
        label.classList.remove('range-slider__label_hover');
      })
      
      let label = document.querySelector(
        '.range-slider__label:nth-child(' + index + ')'
      );
      label.classList.add('range-slider__label_hover');
    });

    zone.addEventListener('mouseleave', function(e) {
      if (e.relatedTarget.classList.value === 'noUi-connects') {
        return false;
      }

      let index = +this.getAttribute('data-zone');
      let label = document.querySelector(
        '.range-slider__label:nth-child(' + index + ')'
      );
      label.classList.remove('range-slider__label_hover');
    });
  });
}

//
// Range business plan slider
//

const rangeBusinessSlider = document.querySelector('.range-slider_plan-js');

if (rangeBusinessSlider) {
  var rangeBusinessSliderColorLabes = function(value, oldValue) {
    const load = document.querySelector('.range-plan__slider');
    load.classList.add('range-plan__slider_load');

    let toggle = +document.querySelector('#businessPlansToggle input').value
      ? 'year'
      : 'month';

    let current = document.querySelector(
      '.range-slider__label:nth-child(' + value + ')'
    );

    let prev = document.querySelector(
      '.range-slider__label:nth-child(' + oldValue + ')'
    );

    let blockPrice = document.querySelector('.range-plan__msg-block_price');

    if (current.getAttribute('data-target') === 'hight') {
      blockPrice.classList.remove('range-plan__msg-block_price-show');
    }

    // price block - set price from data attr
    if (current.getAttribute('data-target') === 'price') {
      // blockPrice.querySelector(
      //   '.range-plan__price span'
      // ).textContent = current.getAttribute('data-' + toggle);

      new CountUp(
        blockPrice.querySelector('.range-plan__price span'),
        prev.getAttribute('data-' + toggle),
        current.getAttribute('data-' + toggle),
        0,
        1.28
      ).start();

      // if old price exist, set it
      let oldPrice = current.getAttribute('data-old-' + toggle);

      if (oldPrice !== null) {
        setTimeout(function() {
          blockPrice.classList.add('range-plan__msg-block_price-show');
        }, 100);
      } else {
        blockPrice.classList.remove('range-plan__msg-block_price-show');
      }

      if (oldPrice !== null) {
        blockPrice.querySelector(
          '.range-plan__price-old'
        ).textContent = oldPrice;
      }

      // if sale percent exist, set it
      let salePercent = current.getAttribute('data-percent');

      if (salePercent !== null) {
        blockPrice.querySelector(
          '.range-plan__price-sale span'
        ).textContent = salePercent;
      }

      // if trial, set class
      let trial = current.getAttribute('data-trial');

      if (trial !== null) {
        blockPrice.querySelector('.action-block__btn-trial').style.display =
          'block';
      } else {
        blockPrice.querySelector('.action-block__btn-trial').style.display =
          'none';
      }

      // set text for price
      let priceText = blockPrice.querySelector('.range-plan__price-small');
      priceText.textContent = priceText.getAttribute('data-text-' + toggle);
    }

    // label dots - make all gray
    document.querySelectorAll('.range-slider__label').forEach(function(elem) {
      elem.classList.remove('range-slider__label_select');
    });

    // label dots - make only right colored
    for (let i = 0; i < value; i++) {
      document
        .querySelector('.range-slider__label:nth-child(' + (i + 1) + ')')
        .classList.add('range-slider__label_select');
    }

    // label text - make all hidden (by css class, than viewport < 768px)
    document
      .querySelectorAll('.range-slider__label-text')
      .forEach(function(elem) {
        elem.classList.add('range-slider__label-text_hidden');
      });

    // label text - make current visible
    current
      .querySelector('.range-slider__label-text')
      .classList.remove('range-slider__label-text_hidden');

    // text block for label - make all hidden
    document.querySelectorAll('.range-plan__msg-block').forEach(function(elem) {
      elem.style.display = 'none';
    });

    // text block for label - make current visible
    document.querySelector(
      '.range-plan__msg-block_' + current.getAttribute('data-target')
    ).style.display =
      'flex';
  };

  let startPosition =
    +rangeBusinessSlider.getAttribute('data-start-position') || 0;

  let settings = {
    start: startPosition,
    step: 1,
    tooltips: true,
    connect: [true, false],
    direction: rootDirection,
    range: {
      min: 1,
      max: 8
    },
    format: {
      to: function(value) {
        return Math.round(value);
      },
      from: function(value) {
        return Math.round(value);
      }
    }
  };

  noUiSlider.create(rangeBusinessSlider, settings);

  var oldValue = 1;

  rangeBusinessSlider.noUiSlider.on('update', function(value) {
    rangeBusinessSliderColorLabes(value[0], oldValue);
    oldValue = value[0];
  });

  //rangeBusinessSliderColorLabes(startPosition);
}

//
// Select icon click
//

const selectArrows = document.querySelectorAll('.select__arrow');

selectArrows.length &&
  selectArrows.forEach(function(selectArrow) {
    selectArrow.addEventListener('click', function() {
      selectArrow.parentNode.querySelector('select').click();
      console.log(selectArrow.parentNode.querySelector('select'));
    });
  });

//
// View more
//

const viewMoreBtn = document.querySelectorAll('[data-more-btn]');

if (viewMoreBtn.length) {
  viewMoreBtn.forEach(function(elem) {
    elem.addEventListener('click', function() {
      console.log(this);
      console.log(this.parentNode.previousElementSibling);
      var viewMoreContainer = this.parentNode.previousElementSibling;
      viewMoreContainer.style.maxHeight = viewMoreContainer.scrollHeight + 'px';
    });
  });
}

//
// Buy process tabs
//

const buyProcessBtns = document.querySelectorAll('[data-process-step]');

if (buyProcessBtns.length) {
  const buyProcessSteps = document.querySelectorAll('.steps-nav__item');
  const progressBar = document.querySelector('.steps-nav__progress-bar');
  const currentStep = document.querySelector('.steps-nav__text-current');

  buyProcessBtns.forEach(function(buyProcessBtn) {
    buyProcessBtn.addEventListener('click', function(e) {
      e.preventDefault();

      let nextStep = +this.getAttribute('data-process-step');

      currentStep.textContent = nextStep;

      switch (nextStep) {
        case 1:
          progressBar.style.width = '33.333%';
          break;
        case 2:
          progressBar.style.width = '66.6666%';
          break;
        case 3:
          progressBar.style.width = '100%';
          break;
      }

      document.querySelectorAll('.process-content').forEach(function(elem) {
        elem.classList.remove('active');
      });

      document
        .querySelector('#buy-process-' + nextStep)
        .classList.add('active');

      buyProcessSteps.forEach(function(buyProcessStep, index) {
        let currentStep = index + 1;

        if (currentStep <= nextStep) {
          buyProcessStep.classList.add('steps-nav__item_active');
        } else {
          buyProcessStep.classList.remove('steps-nav__item_active');
        }
      });
    });
  });
}
//
// videoToggle
//

function toggleVideo(state) {
  // if state == 'hide', hide. Else: show video
  var div = document.getElementById('popupVid');
  var iframe = div.getElementsByTagName('iframe')[0].contentWindow;
  div.style.display = state == 'hide' ? 'none' : '';
  func = state == 'hide' ? 'pauseVideo' : 'playVideo';
  iframe.postMessage(
    '{"event":"command","func":"' + func + '","args":""}',
    '*'
  );
}

//
// Modal
//

const modalOpen = document.querySelectorAll('[data-modal]');

function modal(e) {
  let modalId = this.getAttribute('data-modal');
  let modalElem = document.getElementById(modalId);
  let modalClose = modalElem.querySelector('.modal__close');
  toggleVideo();
  modalElem.classList.add('modal_open');

  modalClose.addEventListener('click', function(e) {
    modalElem.classList.remove('modal_open');
    toggleVideo('hide');
  });

  modalElem.addEventListener('click', function(e) {
    if (e.target == modalElem) {
      modalElem.classList.remove('modal_open');
      toggleVideo('hide');
    }
  });
}

if (modalOpen.length) {
  modalOpen.forEach(node => {
    node.addEventListener('click', modal);
  });
}

//
// File upload http://www.dropzonejs.com
//

const fileUploader = document.querySelectorAll('.image-loader');

if (fileUploader.length) {
  const previewNode = document.querySelector('.image-loader__previews-wrap');
  const previewTemplate = previewNode.innerHTML;
  //previewNode.parentNode.removeChild(previewNode);
  previewNode.innerHTML = '';
  previewNode.style.display = 'block';

  const myDropzone = new Dropzone('.image-loader', {
    url: '#',
    clickable: '.image-loader__text',
    previewTemplate: previewTemplate,
    previewsContainer: '.image-loader__previews-wrap'
  });
}

//
// About page slider tooltips
//

const awardTooltips = document.querySelectorAll('[data-tooltip]');

if (awardTooltips.length) {
  awardTooltips.forEach(function(node, i, a) {
    const nodeTemplateName = node.getAttribute('data-tooltip');

    tippy(node, {
      theme: 'awards',
      arrow: true,
      html: '#' + nodeTemplateName,
      distance: -30,
      placement: 'bottom'
    });
  });
}

//
// Buy process page tooltips
//

const buyProcessTooltips = document.querySelectorAll('[data-buy-tooltip]');

if (buyProcessTooltips.length) {
  buyProcessTooltips.forEach(function(node, i, a) {
    const nodeTemplateName = node.getAttribute('data-buy-tooltip');

    tippy(node, {
      theme: 'awards',
      arrow: true,
      html: '#' + nodeTemplateName,
      distance: 3,
      placement: 'bottom'
    });
  });
}

//
// Protection-home page plan tooltips
//

const planTooltips = document.querySelectorAll('.card-plan__caption-text');

if (planTooltips.length) {
  planTooltips.forEach(function(planTooltip) {
    const nodeTemplateName = planTooltip.querySelector(
      '.card-plan__caption-tooltip'
    );

    tippy(planTooltip, {
      theme: 'card-plan__caption-tooltip',
      arrow: true,
      html: nodeTemplateName,
      distance: 15,
      placement: 'right-start'
    });
  });
}

//
// jsHomePlansToggle
//

const homePlansToggle = document.querySelector('#jsHomePlansToggle');

if (homePlansToggle) {
  homePlansToggle.addEventListener('click', function() {
    const homePlansAmounts = document.querySelectorAll(
      '.card-plan__price-value'
    );
    const homePlansAmountSmalls = document.querySelectorAll(
      '.card-plan__price-small-value'
    );
    const homePlansAmountsSaves = document.querySelectorAll('.card-plan__save');

    let toggle = +homePlansToggle.querySelector('input').value
      ? 'data-month'
      : 'data-year';

    homePlansAmounts.forEach(function(homePlansAmount) {
      let from = +homePlansAmount.innerHTML;
      let to = +homePlansAmount.getAttribute(toggle);

      new CountUp(homePlansAmount, from, to, 0, 1.28).start();
    });

    homePlansAmountSmalls.forEach(function(homePlansAmountSmall) {
      let text = homePlansAmountSmall.getAttribute(toggle);

      homePlansAmountSmall.innerHTML = text;
    });

    homePlansAmountsSaves.forEach(function(homePlansAmountsSave) {
      homePlansAmountsSave.classList.toggle('card-plan__save_show');
    });
  });
}

//
// Plans slider
//

const plansSlider = document.querySelector('.card-plan__container .glide');

if (plansSlider) {
  var plansSliderInit = false;

  const plansSliderFn = function() {
    if (window.innerWidth < 768) {
      if (!plansSliderInit) {
        plansSliderInit = new Glide(plansSlider, {
          perView: 2,
          gap: 0,
          breakpoints: {
            576: { perView: 1 }
          }
        }).mount();
      }
    } else {
      // destroy slider if init
      if (typeof plansSliderInit === 'object') {
        plansSliderInit.destroy();
        plansSliderInit = false;
      }
    }
  };

  plansSliderFn();
  window.addEventListener('resize', plansSliderFn);
}

//
// All logic for buy process
//

//
// Range slider buy process
//

const rangeBuySlider = document.querySelector('.range-slider_buy');

if (rangeBuySlider) {
  const load = document.querySelector('.range-plan__slider');
  load.classList.add('range-plan__slider_load');

  const users = document.querySelector('[data-users]');
  const time = document.querySelector('[data-time]');
  const total = document.querySelector('[data-total]');
  const total2 = document.querySelector('[data-total2]');

  const setTotal = function() {
    let checked = document.querySelector(
      '.payment-radio__item.checked .payment-radio__price-value span'
    );
    total.textContent = checked.textContent;
    total2.textContent = checked.textContent;

    let timeV = document.querySelector('.payment-radio__item.checked');

    time.textContent = timeV.getAttribute('data-time-value');
  };

  const options = document.querySelectorAll('.payment-radio__item');

  options.forEach(function(option) {
    option.addEventListener('click', setTotal);
  });

  const amountM = document.querySelector('[data-amount-m]');
  const amountY = document.querySelector('[data-amount-y]');
  const amountY2 = document.querySelector('[data-amount-y2]');
  const amountY2Old = document.querySelector('[data-amount-y2o]');
  const amountY3 = document.querySelector('[data-amount-y3]');
  const amountY3Old = document.querySelector('[data-amount-y3o]');

  var rangeBuySliderColorLabes = function(value) {
    let current = document.querySelector(
      '.range-slider__label:nth-child(' + value + ')'
    );

    users.textContent = current.getAttribute('data-value');

    let data = JSON.parse(current.getAttribute('data-amount'));

    amountM.textContent = data.mountly;
    amountY.textContent = data.year;
    amountY2.textContent = data.year2;
    amountY2Old.textContent = data.year2old;
    amountY3.textContent = data.year3;
    amountY3Old.textContent = data.year3old;

    setTotal();

    // label dots - make all gray
    document.querySelectorAll('.range-slider__label').forEach(function(elem) {
      elem.classList.remove('range-slider__label_select');
    });

    // label dots - make only right colored
    for (let i = 0; i < value; i++) {
      document
        .querySelector('.range-slider__label:nth-child(' + (i + 1) + ')')
        .classList.add('range-slider__label_select');
    }

    // label text - make all hidden (by css class, than viewport < 768px)
    document
      .querySelectorAll('.range-slider__label-text')
      .forEach(function(elem) {
        elem.classList.add('range-slider__label-text_hidden');
      });

    // label text - make current visible
    current
      .querySelector('.range-slider__label-text')
      .classList.remove('range-slider__label-text_hidden');
  };

  let startPosition = +rangeBuySlider.getAttribute('data-start-position') || 0;

  let settings = {
    start: startPosition,
    step: 1,
    tooltips: true,
    connect: [true, false],
    direction: rootDirection,
    range: {
      min: 1,
      max: 6
    },
    format: {
      to: function(value) {
        return Math.round(value);
      },
      from: function(value) {
        return Math.round(value);
      }
    }
  };

  noUiSlider.create(rangeBuySlider, settings);

  rangeBuySlider.noUiSlider.on('update', function(value) {
    rangeBuySliderColorLabes(value[0], oldValue);
  });

  //rangeBusinessSliderColorLabes(startPosition);
}

//
// Mask for creditcard
//

const maskCard = document.querySelector('[mask-card]');

if (maskCard) {
  new IMask(maskCard, {
    mask: /^[0-9]\d{0,16}$/
  });

  const maskCardName = document.querySelector('[mask-card-name]');

  new IMask(maskCardName, {
    mask: /^[a-zA-Z ]{0,50}$/
  });

  const maskCardCvv = document.querySelector('[mask-card-cvv]');

  new IMask(maskCardCvv, {
    mask: /^[0-9]\d{0,3}$/
  });

  // Bank icons for creditcard

  const maskCardBlock = maskCard.parentNode.querySelector('.card-icon');

  maskCard.addEventListener('input', function() {
    let n = this.value;

    maskCardBlock.classList.value = 'card-icon';

    switch (+n.slice(0, 2)) {
      case 35:
        maskCardBlock.classList.add('card-icon_jcb');
        break;
      case 36:
        maskCardBlock.classList.add('card-icon_dc');
        break;
      case 37:
        maskCardBlock.classList.add('card-icon_ae');
        break;
      default:
        switch (+n.slice(0, 1)) {
          case 4:
            maskCardBlock.classList.add('card-icon_visa');
            break;
          case 5:
            maskCardBlock.classList.add('card-icon_mc');
            break;
          case 6:
            maskCardBlock.classList.add('card-icon_dis');
            break;
        }
    }
  });
}
