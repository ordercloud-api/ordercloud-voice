const router = require("express").Router();
const skill = require('../skill');

// -- Web Authorization URI --
// The URI where customers will be redirected in the companion app to enter login credentials.
// https://developer.amazon.com/en-US/docs/alexa/account-linking/configure-implicit-grant.html#overview-of-the-implicit-grant-flow
router.route("/authorize").get((req, res) => {
  res.sendFile(`${projectRoot}/client/authorize/index.html`);
});

router.route('skill').post(skill)

module.exports = router;
