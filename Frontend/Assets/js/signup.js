document.addEventListener('DOMContentLoaded', function () {

  const formSteps = document.querySelectorAll('.form');
  const nextButtons = document.querySelectorAll('.button-submit');

  let currentStep = 0;

  const nom = document.getElementById("nom");
  const prenom = document.getElementById("prenom");
  const bd = document.getElementById("birthday");

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmInput = document.getElementById("confirm_password");

  const cardName = document.getElementById("cardName");
  const cardNumber = document.getElementById("cardNumber");
  const expiryDate = document.getElementById("expiryDate");
  const cvv = document.getElementById("cvv");

  const emailError = document.getElementById("error-email");
  const passwordError = document.getElementById("error-password");
  const confirmError = document.getElementById("error-confirm");

  const nameError = document.getElementById("error-nom");
  const prenomError = document.getElementById("error-prenom");
  const birthdayError = document.getElementById("error-birthday");

  function showStep(stepIndex) {
      formSteps.forEach((form, index) => {
          form.style.display = index === stepIndex ? 'block' : 'none';
      });
  }

  function validateNameField(fieldElement, errorElement) {
    const value = fieldElement.value.trim();
    const parentBox = fieldElement.parentElement;

    let isValid = true;
    const allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÀ-ÖØ-öø-ÿ ";

    for (let i = 0; i < value.length; i++) {
      if (!allowedChars.includes(value[i])) {
        isValid = false;
        break;
      }
    }

    isValid = isValid && value.length > 0;

    parentBox.style.border = isValid ? "1px solid black" : "1px solid red";
    parentBox.style.boxShadow = isValid ? "0 10px 30px black" : "0 5px 30px red";

    return isValid;
  }

  function validateBirthday() {
    const birthday = bd.value;
    const parentBox = bd.parentElement;

    if (!birthday) {
      parentBox.style.border = "1px solid red";
      parentBox.style.boxShadow = "0 5px 30px red";
      birthdayError.textContent = "Please select a date";
      return false;
    }

    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    const isValid = age >= 18;

    parentBox.style.border = isValid ? "1px solid black" : "1px solid red";
    parentBox.style.boxShadow = isValid ? "0 10px 30px black" : "0 5px 30px red";
    
    return isValid;
  }

  function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(email)) {
      styleInputParent(emailInput, false);


    } else {
      styleInputParent(emailInput, true);
      emailError.textContent = "";
      return true;
    }
  }

  function validatePassword() {
    const password = passwordInput.value;
    if (password.length < 6) {
      styleInputParent(passwordInput, false);
      return false;
    } else {
      styleInputParent(passwordInput, true);
      return true;
    }
  }

  function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmInput.value;
    if (password !== confirmPassword) {
      styleInputParent(confirmInput, false);
      return false;
    } else {
      styleInputParent(confirmInput, true);
      confirmError.textContent = "";
      return true;
    }
  }

  function validateCardName() {
    const name = cardName.value.trim();
    if (name.length === 0) {
      styleInputSelf(cardName, false);
      return false;
    }
    styleInputSelf(cardName, true);
    return true;
  }

  function validateCardNumber() {
    const number = cardNumber.value.replace(/\s+/g, '');
    const isValid = /^\d{16}$/.test(number);
    styleInputSelf(cardNumber, isValid);
    return isValid;
  }

  function validateExpiryDate() {
    const date = expiryDate.value.trim();
    const match = date.match(/^(0[1-9]|1[0-2])\/\d{2}$/);
    styleInputSelf(expiryDate, !!match);
    return !!match;
  }

  function validateCVV() {
    const value = cvv.value.trim();
    const isValid = /^\d{3}$/.test(value);
    styleInputSelf(cvv, isValid);
    return isValid;
  }

  function styleInputParent(inputElement, isValid) {
      const wrapper = inputElement.parentElement;
      wrapper.style.border = isValid ? "1px solid black" : "1px solid red";
      wrapper.style.boxShadow = isValid ? "0 10px 30px black" : "0 5px 30px red";
  }
  function styleInputSelf(inputElement, isValid) {
    const wrapper = inputElement;
    wrapper.style.border = isValid ? "1px solid black" : "1px solid red";
    wrapper.style.boxShadow = isValid ? "0 10px 30px black" : "0 5px 30px red";
}

  function validateStep(stepIndex) {
      switch (stepIndex) {
          case 0:
              return validateNameField(nom, nameError) && validateNameField(prenom, prenomError) && validateBirthday();
          case 1:
              return validateEmail() && validatePassword() && validateConfirmPassword();
          case 2:
              return validateCardName() && validateCardNumber() && validateExpiryDate() && validateCVV();
          default:
              return false;
      }
  }

  nom.addEventListener("input", () => validateNameField(nom, nameError));
  prenom.addEventListener("input", () => validateNameField(prenom, prenomError));
  bd.addEventListener("input", validateBirthday);

  emailInput.addEventListener("input", validateEmail);
  passwordInput.addEventListener("input", () => {
    validatePassword();
    validateConfirmPassword();
  });
  confirmInput.addEventListener("input", validateConfirmPassword);

  cardName.addEventListener('input', validateCardName);
  cardNumber.addEventListener('input', validateCardNumber);
  expiryDate.addEventListener('input', validateExpiryDate);
  cvv.addEventListener('input', validateCVV);

  nextButtons.forEach((button, index) => {
      button.addEventListener('click', function (e) {
          e.preventDefault();
          if (validateStep(currentStep)) {
              currentStep++;
              if (currentStep >= formSteps.length) {
                  window.location.href = "confirmation.html"; 
              } else {
                  showStep(currentStep);
              }
          }
      });
  });

  showStep(currentStep);
});
