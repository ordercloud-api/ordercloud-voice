const form = document.getElementById("form");
const username = document.getElementById("username");
// TODO: maybe bring this back if we have time
// const email = document.getElementById("keyword");
const password = document.getElementById("password");

const urlSearchParams = new URLSearchParams(window.location.search);

const clientID = urlSearchParams.get('client_id');
const requestUri = urlSearchParams.get('redirect_uri');

if (!clientID || !requestUri) {
  window.alert('This login screen is not configured correctly!');
}

function showError(input, message) {
  input.className = "form-control is-invalid";
  const small = input.parentElement.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  input.className= "form-control is-valid";
  const small = input.parentElement.querySelector("small");
  small.innerText = '';
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

function submitRequest(username, password) {
  const data = {
    username,
    password,
    clientID,
    requestUri,
  };

  console.log(JSON.stringify(data, null, 2));
  
  $.ajax({
    type: "POST",
    url: `${window.location.protocol}//${window.location.host}/api/ordercloud/login`,    
    dataType: 'json',
    data,
  })
  .catch(console.log)
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!checkRequired([username, password])) {
    submitRequest(username.value, password.value);
  }
});
