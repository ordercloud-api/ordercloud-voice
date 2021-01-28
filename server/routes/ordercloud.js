const router = require("express").Router();
const { OrderCloudSDK, scope } = require("../config/ordercloud.config");

router.route("/login").post(async (req, res) => {
  const { username, password, clientID, requestUri } = req.body;
  const authResponse = await OrderCloudSDK.Auth.Login(
    username,
    password,
    clientID,
    scope
  );
  res.status(200).json(authResponse);
});

module.exports = router;
