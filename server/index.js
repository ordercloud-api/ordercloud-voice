const express = require("express");
const app = express();
const port = process.env.PORT || 4451;
const path = require("path");
const projectRoot = path.join(__dirname, "../");
const oc = require("ordercloud-javascript-sdk");


// client
app.use(express.static("client"));

// -- Web Authorization URI --
// The URI where customers will be redirected in the companion app to enter login credentials.
// https://developer.amazon.com/en-US/docs/alexa/account-linking/configure-implicit-grant.html#overview-of-the-implicit-grant-flow
app.get("/login", (req, res) => {
  // console.log('LOGIN REQUEST', JSON.stringify(req, null, 2));
  const { 
    state, 
    client_id, 
    response_type, 
    scope, 
    redirect_uri
  } =  req.query;
  res.sendFile(`${projectRoot}/client/login/index.html`, {
    headers: {
      ordercloud_voice_state: state,
      ordercloud_voice_client_id: client_id,
      ordercloud_voice_response_type: response_type,
      ordercloud_voice_scope: scope, 
      ordercloud_voice_redirect_uri: redirect_uri,
    }
  });
});

// -- Access Token URI --
// This URI will be used for both access token and token refresh requests.
// https://developer.amazon.com/en-US/docs/alexa/account-linking/configure-authorization-code-grant.html#tokens
app.get("/token", (req, res) => {
  console.log('TOKEN REQUEST', JSON.stringify(req));
  res.sendFile(`${projectRoot}/client/login/index.html`);
});

// TODO: Bring this page back if we have time, right now it is not necessary as we will use the same client ID for the entire skill
//
// // Hidden route for developers or application owners to register their ClientID with a keyword
// app.get("/register", (req, res) => {
//   res.sendFile(`${projectRoot}/client/register/index.html`);
// });

// server
app.use("/api/example", require("./routes/example"));

// catch-all
app.get("/*", (req, res) => {
  res.sendFile(`${projectRoot}/client/login/index.html`);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
