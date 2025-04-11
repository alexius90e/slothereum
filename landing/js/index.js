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

    loadingProgressBar.addEventListener('animationstart', () => {
      loadingProgressBar.style.width = '0%';
      loadingIntervalId = setInterval(updateProgressBar, 100);
    });

    loadingProgressBar.addEventListener('animationend', () => {
      clearInterval(loadingIntervalId);
      loadingProgressBar.style.width = '100%';
      if (loadingScreen) loadingScreen.style.display = 'none';
    });
  }
});
