const osSections = {
  loading: 'loading',
  auth: 'auth',
};

const showOsSection = (sectionClassName) => {
  const section = document.querySelector(`.${sectionClassName}`);
  if (section) section.classList.remove('hidden');
};

const hideOsSection = (sectionClassName) => {
  const section = document.querySelector(`.${sectionClassName}`);
  if (section) section.classList.add('hidden');
};

/// loading

const loading = document.querySelector(`.${osSections.loading}`);
const loadingProgress = document.querySelector('.loading__progress');
const loadingProgressBar = document.querySelector('.loading__progress-bar');

if (loading && loadingProgress) {
  loading.addEventListener('mouseover', () => {
    loadingProgress.classList.add('animated');
  });
}

const updateProgressBar = () => {
  if (!loadingProgressBar || !loadingProgress) return;
  const loadingProgressWidth = loadingProgress.offsetWidth;
  const loadingProgressBarWidth = loadingProgressBar.offsetWidth;
  const progress = Math.floor((loadingProgressBarWidth / loadingProgressWidth) * 100);
  loadingProgressBar.textContent = `${progress}%`;
};

if (loadingProgressBar) {
  const loadingIntervalId = setInterval(updateProgressBar, 100);

  loadingProgressBar.addEventListener('animationend', () => {
    clearInterval(loadingIntervalId);
    hideOsSection(osSections.loading);
    showOsSection(osSections.auth);
  });
}
