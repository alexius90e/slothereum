/// header lang

const headerLang = document.querySelector('.header__lang');

if (headerLang) {
  headerLang.addEventListener('click', (event) => {
    const isLayout = event.target === event.currentTarget;
    const isCurrent = event.target.classList.contains('header__lang-current');

    if (isLayout) headerLang.classList.remove('active');
    if (isCurrent) headerLang.classList.toggle('active');
  });
}

/// loading

const loadingEls = document.querySelectorAll(`.loading`);

loadingEls.forEach((loading) => {
  const loadingProgress = loading.querySelector('.loading__progress');
  const loadingProgressBar = loading.querySelector('.loading__progress-bar');
  const loadingScreen = document.querySelector('.loading-screen');

  const updateProgressBar = () => {
    if (!loadingProgressBar || !loadingProgress) return;
    const loadingProgressWidth = loadingProgress.offsetWidth;
    const loadingProgressBarWidth = loadingProgressBar.offsetWidth;
    const progress = Math.floor((loadingProgressBarWidth / loadingProgressWidth) * 100);
    loadingProgressBar.textContent = `${progress}%`;
  };

  if (loadingProgressBar) {
    let loadingIntervalId = setInterval(updateProgressBar, 100);

    loadingProgressBar.addEventListener('animationend', () => {
      clearInterval(loadingIntervalId);
      if (loadingScreen) loadingScreen.style.display = 'none';
    });
  }
});
