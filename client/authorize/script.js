const form = document.getElementById("form");
const username = document.getElementById("username");
// TODO: maybe bring this back if we have time
// const email = document.getElementById("keyword");
const password = document.getElementById("password");

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkRequired(inputArray) {
  let isRequired = false;
  inputArray.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });
  return isRequired;
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function submitRequest(username, password) {}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!checkRequired([username, password])) {
    // checkKeyword(keyword);
    submitRequest(username, password);
  }
});
