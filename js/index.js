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
