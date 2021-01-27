const router = require("express").Router();

// -- Web Authorization URI --
// The URI where customers will be redirected in the companion app to enter login credentials.
// https://developer.amazon.com/en-US/docs/alexa/account-linking/configure-implicit-grant.html#overview-of-the-implicit-grant-flow
router.route("/authorize").get((req, res) => {
  const { state, client_id, response_type, scope, redirect_uri } = req.query;
  res.sendFile(`${projectRoot}/client/login/index.html`, {
    headers: {
      ordercloud_voice_state: state,
      ordercloud_voice_client_id: client_id,
      ordercloud_voice_response_type: response_type,
      ordercloud_voice_scope: scope,
      ordercloud_voice_redirect_uri: redirect_uri,
    },
  });
});

// -- Access Token URI --
// This URI will be used for both access token and token refresh requests.
// https://developer.amazon.com/en-US/docs/alexa/account-linking/configure-authorization-code-grant.html#tokens
router.route("/authorize").get((req, res) => {
  console.log("TOKEN REQUEST", JSON.stringify(req));
  res.sendFile(`${projectRoot}/client/login/index.html`);
});

module.exports = router;
