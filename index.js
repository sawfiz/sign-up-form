const pwd1El = document.querySelector("#password1");
const pwd2El = document.querySelector("#password2");
const submitEl = document.querySelector("button");
const errorMsgEl = document.querySelector(".error-msg");

submitEl.addEventListener("click", (e) => {
    if (!validatePasswords()) {
        e.preventDefault();
        errorMsgEl.removeAttribute("hidden");
    }
});

function validatePasswords() {
    return pwd2El.value === pwd1El.value ? true : false;
}

pwd2El.addEventListener("input", () => {
        errorMsgEl.setAttribute("hidden", true);
});
