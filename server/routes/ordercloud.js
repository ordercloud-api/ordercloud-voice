const router = require("express").Router();
const { OrderCloudSDK, clientID, clientSecret, scope } = require("../config/ordercloud.config");

router.route("/login").post(async (req, res) => {
  const { username, password } = req.body;
  const authResponse = await OrderCloudSDK.Auth.ElevatedLogin(clientSecret, username, password, clientID, scope)
  res.send(authResponse)
});

module.exports = router;
