const osSections = {
  loading: 'loading',
  auth: 'auth',
  authCode: 'auth-code',
  authCodeRef: 'auth-code_referral',
  authCodeEmail: 'auth-code_email',
  swipeLogin: 'swipe-login',
  os: 'os',
  osModal: 'os-modal',
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

/// auth

const authElem = document.querySelector(`.${osSections.auth}`);

if (authElem) {
  authElem.addEventListener('click', (event) => {
    const isTgButton = event.target.classList.contains('auth__method-button_tg');
    const isXButton = event.target.classList.contains('auth__method-button_x');
    const isGmailButton = event.target.classList.contains('auth__method-button_gmail');
    const isEmailButton = event.target.classList.contains('auth__method-button_email');

    if (isEmailButton) {
      hideOsSection(osSections.auth);
      showOsSection(osSections.authCodeEmail);
    }

    if (isTgButton || isXButton || isGmailButton) {
      hideOsSection(osSections.auth);
      showOsSection(osSections.authCodeRef);
    }
  });
}

/// auth-code

const authCodeElems = document.querySelectorAll(`.${osSections.authCode}`);

authCodeElems.forEach((authCodeElem) => {
  const inputs = authCodeElem.querySelectorAll('.auth-code__code-input');
  const continueButton = authCodeElem.querySelector('.auth-code__continue-button');
  const isEmailElem = authCodeElem.classList.contains('auth-code_email');

  const checkInputs = () => {
    if (!continueButton) return;
    const code = [...inputs].map((input) => input.value).join('');
    const codeMinLength = 6;

    if (code.length === codeMinLength) {
      continueButton.disabled = false;
      continueButton.classList.add('auth-code__continue-button_valid');
    } else {
      continueButton.disabled = true;
      continueButton.classList.remove('auth-code__continue-button_valid');
    }
  };

  inputs.forEach((input, index) => {
    input.addEventListener('input', (event) => {
      if (isEmailElem) {
        const correctSymbols = '0123456789'.split('');
        const isValueCorrect = correctSymbols.includes(event.currentTarget.value);
        if (isValueCorrect) {
          if (event.currentTarget.value != '' && inputs[index + 1]) {
            inputs[index + 1].focus();
          }
          if (event.currentTarget.value != '' && !inputs[index + 1]) {
            [inputs[0], inputs[index]].forEach((item) => item.focus());
          }
          checkInputs();
        } else {
          event.currentTarget.value = '';
        }
      } else {
        if (event.currentTarget.value != '' && inputs[index + 1]) {
          inputs[index + 1].focus();
        }
        if (event.currentTarget.value != '' && !inputs[index + 1]) {
          [inputs[0], inputs[index]].forEach((item) => item.focus());
        }
        checkInputs();
      }
    });
  });

  if (continueButton)
    continueButton.addEventListener('click', () => {
      hideOsSection(osSections.authCodeEmail);
      hideOsSection(osSections.authCodeRef);
      showOsSection(osSections.swipeLogin);
    });
});

/// swipe-login

const swipeLoginSliders = document.querySelectorAll('.swipe-login__slider');

swipeLoginSliders.forEach((slider) => {
  const draggable = document.querySelector('.swipe-login__slider-draggable');
  const track = document.querySelector('.swipe-login__slider-track');

  let isDragging = false;
  let startX = 0;
  let draggableLeft = 0;
  let maxLeft = 0;

  draggable.addEventListener('mousedown', startDrag);
  draggable.addEventListener('touchstart', startDrag);

  function startDrag(e) {
    isDragging = true;
    startX = e.clientX || e.touches[0].clientX;
    draggableLeft = draggable.offsetLeft;
    maxLeft = slider.clientWidth * 0.6;

    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
    document.addEventListener('contextmenu', (event) => event.preventDefault());
    document.body.style.userSelect = 'none';
  }

  function drag(e) {
    if (!isDragging) return;
    const x = (e.clientX || e.touches[0].clientX) - startX;
    let newLeft = draggableLeft + x;

    newLeft = Math.max(0, Math.min(newLeft, maxLeft));

    draggable.style.left = `${newLeft}px`;
    track.style.width = `${newLeft + draggable.offsetWidth}px`;
  }

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;

    if (draggable.offsetLeft >= maxLeft) {
      unlock();
    } else {
      draggable.style.left = '0';
      track.style.width = '0';
    }
  }

  function unlock() {
    draggable.removeEventListener('mousedown', startDrag);
    draggable.removeEventListener('touchstart', startDrag);
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('touchmove', drag);
    document.removeEventListener('contextmenu', (event) => event.preventDefault());
    document.body.style.userSelect = '';
    hideOsSection(osSections.swipeLogin);
    showOsSection(osSections.os);
  }
});

/// os

const osTimeEl = document.querySelector('.os__footer-controls-time');

function updateOsTime() {
  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
  const currentTime = timeFormatter.format(new Date());
  if (osTimeEl) osTimeEl.textContent = currentTime;
}

updateOsTime();
if (osTimeEl) setInterval(() => updateOsTime(), 10000);

const osMainApps = document.querySelectorAll('.os__main-app');

osMainApps.forEach((osMainApp) => {
  osMainApp.addEventListener('click', (event) => {
    showOsSection(osSections.osModal);
    console.log('osModal');
  });
});

const osModals = document.querySelectorAll('.os-modal');

osModals.forEach((modal) => {
  const modalWindow = modal.querySelector('.os-modal__body');
  const header = modal.querySelector('.os-modal__header');
  const close = modal.querySelector('.os-modal__header-close');

  let isDragging = false;
  let currentX = 0;
  let currentY = 0;
  let initialX = 0;
  let initialY = 0;
  let xOffset = 0;
  let yOffset = 0;

  function closeModal() {
    modal.classList.add('hidden');
  }

  header.addEventListener('mousedown', dragStart);
  header.addEventListener('touchstart', dragStart);

  document.addEventListener('mouseup', dragEnd);
  document.addEventListener('touchend', dragEnd);

  document.addEventListener('mousemove', drag);
  document.addEventListener('touchmove', drag);

  modal.addEventListener('click', (event) => {
    const isLayout = event.target === event.currentTarget;
    const isClose = event.target === close;
    if (isLayout || isClose) closeModal();
  });

  function dragStart(e) {
    if (e.type === 'touchstart') {
      initialX = e.touches[0].clientX - xOffset;
      initialY = e.touches[0].clientY - yOffset;
    } else {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
    }

    isDragging = true;
    modalWindow.style.cursor = 'grabbing';
    modalWindow.style.transition = 'none';
  }

  function drag(e) {
    if (!isDragging) return;

    if (e.type === 'touchmove') {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY);
  }

  function dragEnd() {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
    modalWindow.style.cursor = 'move';
    modalWindow.style.transition = 'transform 0.3s';
  }

  function setTranslate(x, y) {
    const rect = modalWindow.getBoundingClientRect();
    const maxX = window.innerWidth;
    const maxY = window.innerHeight;

    x = Math.min(Math.max(x, -rect.left), maxX - rect.left);
    y = Math.min(Math.max(y, -rect.top), maxY - rect.top);

    modalWindow.style.transform = `translate(${x}px, ${y}px)`;
  }
});
