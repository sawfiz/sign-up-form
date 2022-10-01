const pwd1El = document.querySelector("#password1");
const pwd2El = document.querySelector("#password2");
const submitEl = document.querySelector("button");
const errorMsgEl = document.querySelector(".error-msg");
let error = false;
errorMsgEl.style.opacity = 0;

submitEl.addEventListener("click", (e) => {
    if (!validatePasswords()) {
        e.preventDefault();
        if (error === false) {
            pwd1El.classList.add("error");
            pwd2El.classList.add("error");
            errorMsgEl.style.opacity = 1;
            error = true;
        }
    }
});

function validatePasswords() {
    return pwd2El.value === pwd1El.value ? true : false;
}

pwd2El.addEventListener("input", () => {
    if (error === true) {
        pwd1El.classList.remove("error");
        pwd2El.classList.remove("error");
        errorMsgEl.style.opacity = 0;
        error = false;
    }
});
