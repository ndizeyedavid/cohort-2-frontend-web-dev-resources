// 03 - Modifying Value (Inputs)
// Open index.html. Type in the input and use the buttons.
// This shows how to read and write form field values.

const nameInput = document.getElementById("name-input");
const valueOutput = document.getElementById("value-output");

document.getElementById("btn-read-value").addEventListener("click", function () {
  // .value reads what the user typed
  let val = nameInput.value.trim();
  if (val === "") {
    valueOutput.textContent = "Input is empty";
  } else {
    valueOutput.textContent = "You typed: " + val;
  }
  console.log("value read:", val);
});

document.getElementById("btn-set-value").addEventListener("click", function () {
  // .value can also set the input programmatically
  nameInput.value = "Mellow";
  valueOutput.textContent = 'Set input to "Mellow"';
  console.log("value set to Mellow");
});

document.getElementById("btn-clear-value").addEventListener("click", function () {
  nameInput.value = "";
  valueOutput.textContent = "Cleared";
  nameInput.focus();
  console.log("value cleared");
});

console.log("=== value ===");
console.log("For inputs, use .value not textContent");
console.log("Trim before validating: input.value.trim()");
