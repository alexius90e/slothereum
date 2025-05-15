const osSections = {
  loading: 'os-cap',
  auth: 'auth',
  authEmail: 'auth-email',
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

const shakeOsSections = () => {
  Object.values(osSections).forEach((sectionName) => {
    if (sectionName !== osSections.loading) {
      showOsSection(sectionName);
      hideOsSection(sectionName);
    }
  });
};

// shakeOsSections();

/// oscap

const oscapLoading = document.querySelector(`.os-cap__loading`);
const oscapLoadingProgress = document.querySelector('.os-cap__loading-progress');
const oscapLoadingProgressBar = document.querySelector('.os-cap__loading-progress-bar');
const oscapModal = document.querySelector('.os-cap__modal');

const updateOscapProgressBar = () => {
  if (!oscapLoadingProgressBar || !oscapLoadingProgress) return;
  const oscapLoadingProgressWidth = oscapLoadingProgress.offsetWidth;
  const oscapLoadingProgressBarWidth = oscapLoadingProgressBar.offsetWidth;
  const progress = Math.floor((oscapLoadingProgressBarWidth / oscapLoadingProgressWidth) * 100);
  oscapLoadingProgressBar.textContent = `${progress}%`;
};

if (oscapLoadingProgressBar) {
  const oscapLoadingIntervalId = setInterval(updateOscapProgressBar, 100);

  oscapLoadingProgressBar.addEventListener('animationend', () => {
    clearInterval(oscapLoadingIntervalId);
    oscapLoading.style.display = 'none';
    if (oscapModal) oscapModal.classList.add('active');
  });
}

if (oscapLoadingProgressBar) {
  const loadingIntervalId = setInterval(updateOscapProgressBar, 100);

  oscapLoadingProgressBar.addEventListener('animationend', () => {
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
    const isWalletButton = event.target.classList.contains('auth__method-button_wallet');
    const isEmailButton = event.target.classList.contains('auth__method-button_email');

    if (isEmailButton) {
      hideOsSection(osSections.auth);
      showOsSection(osSections.authEmail);
    }

    if (isTgButton || isXButton || isWalletButton) {
      hideOsSection(osSections.auth);
      showOsSection(osSections.authCodeRef);
    }
  });
}

/// auth-email

const authEmailElem = document.querySelector(`.${osSections.authEmail}`);

if (authEmailElem) {
  authEmailElem.addEventListener('click', (event) => {
    const isBackButton = event.target.classList.contains('auth-email__heading-back');
    const authEmailForm = event.currentTarget.querySelector('.auth-email__form');

    if (authEmailForm) {
      authEmailForm.addEventListener('submit', (event) => {
        event.preventDefault();
        hideOsSection(osSections.authEmail);
        showOsSection(osSections.authCodeEmail);
      });
    }

    if (isBackButton) {
      hideOsSection(osSections.authEmail);
      showOsSection(osSections.auth);
    }
  });
}

/// auth-code

const authCodeElems = document.querySelectorAll(`.${osSections.authCode}`);

authCodeElems.forEach((authCodeElem) => {
  const inputs = authCodeElem.querySelectorAll('.auth-code__code-input');
  const continueButton = authCodeElem.querySelector('.auth-code__continue-button');
  const clearButton = authCodeElem.querySelector('.auth-code__clear-button');
  const isEmailElem = authCodeElem.classList.contains('auth-code_email');

  authCodeElem.addEventListener('click', (event) => {
    const isBackButton = event.target.classList.contains('auth-code__heading-back');

    if (isBackButton) {
      hideOsSection(osSections.authCodeEmail);
      hideOsSection(osSections.authCodeRef);

      if (isEmailElem) {
        showOsSection(osSections.authEmail);
      } else {
        showOsSection(osSections.auth);
      }
    }
  });

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

    if (index > 0) {
      input.addEventListener('beforeinput', (event) => {
        const isEmpty = event.currentTarget.value === '';

        if (event.inputType.startsWith('delete') && isEmpty) {
          inputs[index - 1].focus();
          inputs[index - 1].value = '';
        }
      });

      input.addEventListener('keydown', (event) => {
        const isEmpty = event.currentTarget.value === '';

        if (event.key === 'Backspace' && isEmpty) {
          event.preventDefault();
          inputs[index - 1].focus();
          inputs[index - 1].value = '';
        }
      });
    }
  });

  if (continueButton) {
    continueButton.addEventListener('click', () => {
      hideOsSection(osSections.authCodeEmail);
      hideOsSection(osSections.authCodeRef);
      showOsSection(osSections.swipeLogin);
    });
  }

  if (clearButton) {
    clearButton.addEventListener('click', () => {
      inputs.forEach((input) => {
        input.value = '';
      });
      if (continueButton) continueButton.disabled = true;
      authCodeElem.classList.remove('auth-code_invalid');
    });
  }
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
    maxLeft = slider.clientWidth - track.clientHeight;

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
  });
});

const osModals = document.querySelectorAll('.os-modal');

osModals.forEach((modal) => {
  const modalWindow = modal.querySelector('.os-modal__body');
  const header = modal.querySelector('.os-modal__header');
  const close = modal.querySelector('.os-modal__header-close');

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let translateX = 0;
  let translateY = 0;
  let currentX = window.innerWidth / 2;
  let currentY = window.innerHeight / 2;

  function hideModal() {
    modal.classList.add('hidden');
  }

  function updatePosition() {
    const rect = modalWindow.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width;
    const maxY = window.innerHeight - rect.height;

    currentX = Math.max(0, Math.min(currentX, maxX));
    currentY = Math.max(0, Math.min(currentY, maxY));

    const minTranslateX = -(window.innerWidth - rect.width) / 2;
    const maxTranslateX = (window.innerWidth - rect.width) / 2;
    const minTranslateY = -(window.innerHeight - rect.height) / 2;
    const maxTranslateY = (window.innerHeight - rect.height) / 2;

    if (translateX < minTranslateX) translateX = minTranslateX;
    if (translateX > maxTranslateX) translateX = maxTranslateX;
    if (translateY < minTranslateY) translateY = minTranslateY;
    if (translateY > maxTranslateY) translateY = maxTranslateY;

    modalWindow.style.transform = `translate(${translateX}px, ${translateY}px)`;
  }

  header.addEventListener('mousedown', startDrag);
  header.addEventListener('touchstart', startDrag, { passive: true });

  document.addEventListener('mouseup', endDrag);
  document.addEventListener('touchend', endDrag);

  document.addEventListener('mousemove', drag);
  document.addEventListener('touchmove', drag, { passive: false });

  modal.addEventListener('click', (event) => {
    const isOverlay = event.target === event.currentTarget;
    const isClose = event.target === close;
    if (isClose || isOverlay) hideModal();
  });

  function startDrag(e) {
    isDragging = true;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    startX = clientX - translateX;
    startY = clientY - translateY;
  }

  function drag(e) {
    if (!isDragging) return;
    e.preventDefault();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    translateX = clientX - startX;
    translateY = clientY - startY;

    updatePosition();
  }

  function endDrag() {
    isDragging = false;
  }

  window.addEventListener('resize', (event) => {
    updatePosition();
  });
});
