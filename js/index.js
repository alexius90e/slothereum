import './os.js';
import './slide-to-unlock.js';

const preloaderWrapper = document.querySelector('.preloader__wrapper');
const preloaderContent = document.querySelector('.preloader__content');
const preloaderVideo = document.querySelector('.preloader__video');
const screen = document.querySelector('.screen');

if (preloaderWrapper && preloaderContent && preloaderVideo) {
  preloaderWrapper.addEventListener('scroll', (event) => {
    const contentHeight = preloaderContent.offsetHeight;
    const videoHeight = preloaderVideo.offsetHeight;
    const scrollPosition = event.target.scrollTop;
    const percentPosition = Math.floor((scrollPosition / (contentHeight - videoHeight)) * 100);
    const transformProp = `scale(${1 + (percentPosition * 1.4) / 100}) translateX(${
      -percentPosition * 0.22
    }%)`;
    preloaderVideo.style.transform = transformProp;

    if (percentPosition >= 85 && screen) {
      screen.classList.add('active');
    }
  });
}

/// new design

const videoScreen = document.querySelector('.video-screen');

if (videoScreen) {
  if ('onwheel' in document) {
    videoScreen.addEventListener('wheel', onVideoScreenWheel);
  } else if ('onmousewheel' in document) {
    videoScreen.addEventListener('mousewheel', onVideoScreenWheel);
  } else {
    videoScreen.addEventListener('MozMousePixelScroll', onVideoScreenWheel);
  }
}

function onVideoScreenWheel(event) {
  event.preventDefault();
  const delta = event.deltaY || event.detail || event.wheelDelta;
  window.location.hash = delta >= 0 ? '#menuSliders' : '';
}

const menuSliders = document.querySelector('.menu-sliders__main');

const menuSlidersMain = document.querySelector('.menu-sliders__main');
const menuSlidersThumbs = document.querySelector('.menu-sliders__main');

if (menuSlidersMain && menuSlidersThumbs) {
  const menuSliderThumbsSwiper = new Swiper('.menu-sliders__thumbs .swiper', {
    slidesPerView: 1,
    spaceBetween: 40,
    allowTouchMove: false,
  });

  const menuSlidersMainSwiper = new Swiper('.menu-sliders__main .swiper', {
    slidesPerView: 3,
    spaceBetween: 0,
    centeredSlides: true,
    initialSlide: 1,
    mousewheel: true,
    thumbs: {
      swiper: menuSliderThumbsSwiper,
    },
  });

  menuSlidersMainSwiper.on('slideChange', () => {
    if (menuSlidersMainSwiper.activeIndex === 1) {
      menuSlidersMainSwiper.allowSlidePrev = false;
    } else if (menuSlidersMainSwiper.activeIndex === menuSlidersMainSwiper.slides.length - 2) {
      menuSlidersMainSwiper.allowSlideNext = false;
    } else {
      menuSlidersMainSwiper.allowSlidePrev = true;
      menuSlidersMainSwiper.allowSlideNext = true;
    }
  });

  if (menuSliders) {
    if ('onwheel' in document) {
      menuSliders.addEventListener('wheel', onMenuSlidersWheel);
    } else if ('onmousewheel' in document) {
      menuSliders.addEventListener('mousewheel', onMenuSlidersWheel);
    } else {
      menuSliders.addEventListener('MozMousePixelScroll', onMenuSlidersWheel);
    }
  }

  let readyToScroll = false;

  function onMenuSlidersWheel(event) {
    event.preventDefault();

    const delta = event.deltaY || event.detail || event.wheelDelta;

    if (menuSlidersMainSwiper.activeIndex === 1) {
      if (readyToScroll === true) {
        window.location.hash = '';
        readyToScroll = false;
      } else {
        if (delta <= 0 && menuSlidersMainSwiper.activeIndex === 1 && readyToScroll === false) {
          readyToScroll = true;
        } else {
          readyToScroll = false;
        }
      }
    }
  }
}
