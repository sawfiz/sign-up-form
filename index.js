// Input elements
const firstNameEl = document.querySelector('#first-name');
const emailEl = document.querySelector('#email');
const phoneEl = document.querySelector('#phone');
const pwd1El = document.querySelector('#password1');
const pwd2El = document.querySelector('#password2');
const errorMsgEl = document.querySelector('.error-msg');

// Elements of password rules
const pwdRulesEl = document.querySelector('.pwd-rules');
const capEl = document.querySelector('#cap1');
const letEl = document.querySelector('#let1');
const numEl = document.querySelector('#num1');
const splEl = document.querySelector('#spl1');
const char8El = document.querySelector('#char8');
const allowedEl = document.querySelector('#allowed');

// Elements of the Submit button
const submitEl = document.querySelector('button');
const incompleteInfoEl = document.querySelector('#incomplete-info');

// Functions for validation and checking the required inputs
function validateFirstName() {
  if (firstNameEl.validity.tooShort) {
    firstNameEl.setCustomValidity('Too Short!');
    firstNameEl.reportValidity();
    return false;
  }
  firstNameEl.setCustomValidity('');
  return true;
}

function validateEmail() {
  if (emailEl.validity.typeMismatch) {
    emailEl.setCustomValidity('Not an email!');
    emailEl.reportValidity();
    return false;
  }
  if (emailEl.validity.tooShort) {
    emailEl.setCustomValidity('Too short!');
    emailEl.reportValidity();
    return false;
  }
  emailEl.setCustomValidity('');
  return true;
}

function validatePhone() {
  const nonNum = phoneEl.value.match(/[^0-9]/g);
  if (nonNum) {
    if (nonNum.length > 0) {
      phoneEl.setCustomValidity('Numbers only!');
      phoneEl.reportValidity();
      return false;
    }
  }
  if (phoneEl.validity.tooShort) {
    phoneEl.setCustomValidity('Too Short!');
    phoneEl.reportValidity();
    return false;
  }
  phoneEl.setCustomValidity('');
  return true;
}

function validatePassword() {
  let conditionsMet = 0;

  const cap = pwd1El.value.match(/[A-Z]/g);
  capEl.style.color = cap ? 'green' : '#c0c0c0';
  conditionsMet += cap ? 1 : 0;

  const letter = pwd1El.value.match(/[a-z]/g);
  letEl.style.color = letter ? 'green' : '#c0c0c0';
  conditionsMet += letter ? 1 : 0;

  const num = pwd1El.value.match(/\d/g);
  numEl.style.color = num ? 'green' : '#c0c0c0';
  conditionsMet += num ? 1 : 0;

  const spl = pwd1El.value.match(/[@$!%*?&]/g);
  splEl.style.color = spl ? 'green' : '#c0c0c0';
  conditionsMet += spl ? 1 : 0;

  const len = pwd1El.value.length;
  char8El.style.color = len >= 8 ? 'green' : '#c0c0c0';
  conditionsMet += len >= 8 ? 1 : 0;

  const allowed = /^[A-Za-z\d@$!%*?&]*$/g.test(pwd1El.value);
  allowedEl.style.color = allowed ? 'green' : 'red';
  if (!allowed) return false;

  return conditionsMet >= 5;
}

function checkFirstName() {
  if (firstNameEl.validity.valueMissing) {
    incompleteInfoEl.innerText = 'First name missing';
    return false;
  }
  if (!validateFirstName()) {
    incompleteInfoEl.innerText = 'First name invalid';
    return false;
  }
  return true;
}

function checkEmail() {
  if (emailEl.validity.valueMissing) {
    incompleteInfoEl.innerText = 'Email missing';
    return false;
  }
  if (!validateEmail()) {
    incompleteInfoEl.innerText = 'Email invalid';
    return false;
  }
  return true;
}

function checkPhone() {
  if (phoneEl.validity.valueMissing) {
    incompleteInfoEl.innerText = 'Phone number missing';
    return false;
  }
  if (!validatePhone()) {
    incompleteInfoEl.innerText = 'Phone number invalid';
    return false;
  }
  return true;
}

function checkPassword() {
  if (pwd1El.validity.valueMissing) {
    incompleteInfoEl.innerText = 'Password missing';
    return false;
  }
  if (!validatePassword()) {
    incompleteInfoEl.innerText = 'Password invalid';
    return false;
  }
  return true;
}

function matchPasswords() {
  return pwd2El.value === pwd1El.value;
}

// Utility function to create a delay
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// Error is shown for 2 seconds
async function showError() {
  incompleteInfoEl.classList.add('show');
  await delay(2000);
  incompleteInfoEl.classList.remove('show');
}

// Main event listeners
firstNameEl.addEventListener('input', () => validateFirstName());
emailEl.addEventListener('input', () => validateEmail());
phoneEl.addEventListener('input', () => validatePhone());
pwd1El.addEventListener('input', () => validatePassword());

pwd1El.addEventListener('focus', () => {
  pwdRulesEl.classList.add('show');
});

pwd2El.addEventListener('input', () => {
  errorMsgEl.setAttribute('hidden', true);
});

submitEl.addEventListener('click', (e) => {
  if (!checkFirstName()) {
    showError();
    e.preventDefault();
  } else if (!checkEmail()) {
    showError();
    e.preventDefault();
  } else if (!checkPhone()) {
    showError();
    e.preventDefault();
  } else if (!checkPassword()) {
    showError();
    e.preventDefault();
  } else if (!matchPasswords()) {
    errorMsgEl.removeAttribute('hidden');
    e.preventDefault();
  }
});
