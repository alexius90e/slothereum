const osSections = {
  loading: 'loading',
  auth: 'auth',
  authCode: 'auth-code',
  authCodeRef: 'auth-code_referral',
  authCodeEmail: 'auth-code_email',
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
});
