const form = document.getElementById("form");
const inputEmail = document.getElementById("input-email");
const inputCountry = document.getElementById("input-country");
const inputPostal = document.getElementById("input-postal");
const inputPassword = document.getElementById("input-password");
const inputPasswordConfirmation = document.getElementById(
  "input-password-confirmation",
);

inputEmail.addEventListener("input", () => {
  validateEmail(inputEmail);
});

inputCountry.addEventListener("input", () => {
  validateCountry(inputCountry);
});

inputPostal.addEventListener("input", () => {
  validatePostal(inputPostal);
});

inputPassword.addEventListener("input", () => {
  validatePassword(inputPassword);
});

inputPasswordConfirmation.addEventListener("input", () => {
  validatePasswordConfirmation(inputPassword, inputPasswordConfirmation);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (validateForm()) {
    alert("Validated successfully! High five! 🖐️");
  }
});

function validateForm() {
  return (
    validateEmail(inputEmail) &&
    validateCountry(inputCountry) &&
    validatePostal(inputPostal) &&
    validatePassword(inputPassword) &&
    validatePasswordConfirmation(
      inputPassword,
      inputPasswordConfirmation,
    )
  );
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

  if (!emailRegex.test(email.value)) {
    email.setCustomValidity("Please enter a valid email address please.");
    return false;
  }
  email.setCustomValidity("");
  return true;
}

function validateCountry(country) {
  if (country.value.length < 3) {
    country.setCustomValidity("Please enter a valid country name.");
    return false;
  }
  country.setCustomValidity("");
  return true;
}

function validatePostal(code) {
  if (code.value.length !== 4) {
    code.setCustomValidity("Please enter a valid 4-digit postal code.");
    return false;
  }
  code.setCustomValidity("");
  return true;
}

function validatePassword(password) {
  if (password.value.length < 8) {
    password.setCustomValidity("Password must be at least 8 characters long.");
    return false;
  }
  password.setCustomValidity("");
  return true;
}

function validatePasswordConfirmation(password, passwordConfirmation) {
  if (passwordConfirmation.value !== password.value) {
    passwordConfirmation.setCustomValidity(
      "Passwords do not match. Please try again.",
    );
    return false;
  }
  passwordConfirmation.setCustomValidity("");
  return true;
}
