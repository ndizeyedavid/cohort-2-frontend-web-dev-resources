const expressions = {
  nameRegex: /^[a-zA-Z]+(?:['\s-][a-zA-Z]+)+$/,
  emailRegex: /^[a-zA-Z0-9_.]+@[a-zA-Z.]+\.[a-zA-Z]{2,3}$/,
  unameRegex: /^@[a-zA-Z_]{5,}$/,
  genderRegex: /^(male|female|other)$/i,
  passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/,
  addressRegex: /^[A-Z]{2} [a-zA-Z0-9 ]+$/,
  phoneRegex: /^\+250[0-9]{9}$/,
  dobRegex: /^\d{4}[-/]\d{1,2}[-/]\d{1,2}$/,
};

const nameField = document.getElementById("name");

function throwError(text, textField) {
  const parent = textField.parentElement;
  const old = parent.querySelector(".error");
  if (old) old.remove();

  const errorSpan = document.createElement("span");
  errorSpan.className = "error";
  errorSpan.textContent = text;
  parent.appendChild(errorSpan);
}

function clearError(textField) {
  const old = textField.parentElement.querySelector(".error");
  if (old) old.remove();
}

function handleForm() {
  console.log("Validating form...");
  const emailField = document.getElementById("email");
  const unameField = document.getElementById("uname");
  const genderField = document.getElementById("gender");
  const passwordField = document.getElementById("pswd");
  const addressField = document.getElementById("address");
  const phoneField = document.getElementById("phone");
  const dobField = document.getElementById("dob");

  let isValid = true;

  if (expressions.nameRegex.test(nameField.value.trim())) {
    console.log("Name field is correct");
    nameField.style.borderColor = "";
    clearError(nameField);
  } else {
    isValid = false;
    nameField.style.borderColor = "red";
    throwError(
      "The name field should have your FirstName and LastName",
      nameField,
    );
  }

  if (expressions.emailRegex.test(emailField.value.trim())) {
    console.log("Email field is correct");
    emailField.style.borderColor = "";
    clearError(emailField);
  } else {
    isValid = false;
    emailField.style.borderColor = "red";
    alert("The email should respect this example: mellow123@gmail.com");
  }

  if (expressions.unameRegex.test(unameField.value.trim())) {
    console.log("User Name field is correct");
    unameField.style.borderColor = "";
    clearError(unameField);
  } else {
    isValid = false;
    unameField.style.borderColor = "red";
    alert(
      "The username should start with @ sign and have at least 5 characters",
    );
  }

  if (expressions.genderRegex.test(genderField.value)) {
    console.log("Gender field is correct");
    genderField.style.borderColor = "";
    clearError(genderField);
  } else {
    isValid = false;
    genderField.style.borderColor = "red";
    alert("The gender should be either Male, Female or Other");
  }

  if (expressions.passwordRegex.test(passwordField.value)) {
    console.log("password field is correct");
    passwordField.style.borderColor = "";
    clearError(passwordField);
  } else {
    isValid = false;
    passwordField.style.borderColor = "red";
    alert(
      "The password should have at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 symbol and a length of 8+ characters",
    );
  }

  if (expressions.addressRegex.test(addressField.value.trim())) {
    console.log("address field is correct");
    addressField.style.borderColor = "";
    clearError(addressField);
  } else {
    isValid = false;
    addressField.style.borderColor = "red";
    alert(
      "The address should start with two uppercase letters (e.g. KG) then letters and numbers",
    );
  }

  const cleanPhone = phoneField.value.replace(/\s+/g, "");
  if (expressions.phoneRegex.test(cleanPhone)) {
    console.log("phone field is correct");
    phoneField.style.borderColor = "";
    clearError(phoneField);
  } else {
    isValid = false;
    phoneField.style.borderColor = "red";
    alert("Please use only a Rwanda phone number(starts with +250)");
  }

  if (expressions.dobRegex.test(dobField.value)) {
    console.log("date of birth field is correct");
    dobField.style.borderColor = "";
    clearError(dobField);
  } else {
    isValid = false;
    dobField.style.borderColor = "red";
    alert("Please enter a valid date of birth");
  }

  if (isValid) {
    alert("Form submitted successfully!");
  }
}
