const oscapLoading = document.querySelector(`.os-cap__loading`);
const oscapLoadingProgress = document.querySelector('.os-cap__loading-progress');
const oscapLoadingProgressBar = document.querySelector('.os-cap__loading-progress-bar');
const oscapModal = document.querySelector('.os-cap__modal');

const updateProgressBar = () => {
  if (!oscapLoadingProgressBar || !oscapLoadingProgress) return;
  const oscapLoadingProgressWidth = oscapLoadingProgress.offsetWidth;
  const oscapLoadingProgressBarWidth = oscapLoadingProgressBar.offsetWidth;
  const progress = Math.floor((oscapLoadingProgressBarWidth / oscapLoadingProgressWidth) * 100);
  oscapLoadingProgressBar.textContent = `${progress}%`;
};

if (oscapLoadingProgressBar) {
  const oscapLoadingIntervalId = setInterval(updateProgressBar, 100);

  oscapLoadingProgressBar.addEventListener('animationend', () => {
    clearInterval(oscapLoadingIntervalId);
    oscapLoading.style.display = 'none';
    if (oscapModal) oscapModal.classList.add('active');
  });
}
