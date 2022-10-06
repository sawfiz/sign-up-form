const firstNameEl = document.querySelector('#first-name');
const emailEl = document.querySelector('#email');

const capEl = document.querySelector('#cap1');
const letEl = document.querySelector('#let1');
const numEl = document.querySelector('#num1');
const splEl = document.querySelector('#spl1');
const char8El = document.querySelector('#char8');

const pwd1El = document.querySelector('#password1');
const pwd2El = document.querySelector('#password2');
const pwdRulesEl = document.querySelector('.pwd-rules');
const errorMsgEl = document.querySelector('.error-msg');
const submitEl = document.querySelector('button');
const incompleteInfoEl = document.querySelector('#incomplete-info');

firstNameEl.addEventListener('input', () => firstNameValid());

function firstNameValid() {
  if (firstNameEl.validity.tooShort) {
    firstNameEl.setCustomValidity('Too Short!');
    firstNameEl.reportValidity();
    return false;
  } else {
    firstNameEl.setCustomValidity('');
    return true;
  }
}

emailEl.addEventListener('input', () => emailValid());

function emailValid() {
  if (emailEl.validity.typeMismatch) {
    emailEl.setCustomValidity('Not an email!');
    emailEl.reportValidity();
    return false;
  } else if (emailEl.validity.tooShort) {
    emailEl.setCustomValidity('Too short!');
    emailEl.reportValidity();
    return false;
  } else {
    emailEl.setCustomValidity('');
    return true;
  }
}

pwd1El.addEventListener('input', () => {
  checkPassword();
});



function checkFirstName() {
  if (firstNameEl.validity.valueMissing) {
    incompleteInfoEl.innerText = 'First name missing';
    return false;
  } else {
    if (!firstNameValid()) {
      incompleteInfoEl.innerText = 'First name invalid';
      return false;
    }
  }
  return true;
}

function checkEmail() {
  if (emailEl.validity.valueMissing) {
    incompleteInfoEl.innerText = 'Email missing';
    return false;
  } else {
    if (!emailValid()) {
      incompleteInfoEl.innerText = 'Email invalid';
      return false;
    }
  }
  return true;
}

function checkPassword() {
  if (pwd1El.validity.valueMissing) {
    incompleteInfoEl.innerText = 'Password missing';
    return false;
  }

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

  const spl = pwd1El.value.match(/[!@#$%^&*]/g);
  splEl.style.color = spl ? 'green' : '#c0c0c0';
  conditionsMet += spl ? 1 : 0;

  const len = pwd1El.value.length;
  
  char8El.style.color = len >= 8 ? 'green' : '#c0c0c0';
  conditionsMet += len >= 8 ? 1 : 0;

  if (conditionsMet < 5 ) {
    incompleteInfoEl.innerText = 'Password invalid';
    return false;
  }
  return true;
}

submitEl.addEventListener('click', (e) => {
  console.log(firstNameValid());

  if (!checkFirstName()) {
    showError();
    e.preventDefault();
  } else {
    if (!checkEmail()) {
      showError();
      e.preventDefault();
    } else {
      if (!checkPassword()) {
        showError();
        e.preventDefault();
      } else {
        if (!matchPasswords()) {
            errorMsgEl.removeAttribute('hidden');
            e.preventDefault();
            return;
          }
        }
    }
  }
});

async function showError() {
  incompleteInfoEl.classList.add('show');
  await delay(2000);
  incompleteInfoEl.classList.remove('show');
}

function matchPasswords() {
  return pwd2El.value === pwd1El.value ? true : false;
}

pwd1El.addEventListener('focus', () => {
  pwdRulesEl.classList.add('show');
});

pwd2El.addEventListener('input', () => {
  errorMsgEl.setAttribute('hidden', true);
});

// Utility function to create a delay
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
