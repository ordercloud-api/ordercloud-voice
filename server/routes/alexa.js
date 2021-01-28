const router = require("express").Router();

// -- Web Authorization URI --
// The URI where customers will be redirected in the companion app to enter login credentials.
// https://developer.amazon.com/en-US/docs/alexa/account-linking/configure-implicit-grant.html#overview-of-the-implicit-grant-flow
router.route("/authorize").get((req, res) => {
  res.sendFile(`${projectRoot}/client/authorize/index.html`);
});

// // -- Access Token URI --
// // This URI will be used for both access token and token refresh requests.
// // https://developer.amazon.com/en-US/docs/alexa/account-linking/configure-authorization-code-grant.html#tokens

module.exports = router;
