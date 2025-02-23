/// loading

const loadingProgress = document.querySelector('.loading__progress');
const loadingProgressBar = document.querySelector('.loading__progress-bar');

const updateProgressBar = () => {
  if (!loadingProgressBar || !loadingProgress) return;
  const loadingProgressWidth = loadingProgress.offsetWidth;
  const loadingProgressBarWidth = loadingProgressBar.offsetWidth;
  const progress = Math.floor((loadingProgressBarWidth / loadingProgressWidth) * 100);
  loadingProgressBar.textContent = `${progress}%`;
};

const hideLoading = () => {
  const loading = document.querySelector('.loading');
  if (loading) loading.style.display = 'none';
};

if (loadingProgressBar) {
  const loadingIntervalId = setInterval(updateProgressBar, 100);

  loadingProgressBar.addEventListener('animationend', () => {
    clearInterval(loadingIntervalId);
    hideLoading();
  });
}
