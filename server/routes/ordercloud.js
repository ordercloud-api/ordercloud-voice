const router = require("express").Router();
const { OrderCloudSDK, scope } = require("../config/ordercloud.config");

router.route("/login").post(async (req, res) => {
  console.log(req.body);
  const { username, password, clientID } = req.body;
  console.log(username, password, clientID, scope);
  const authResponse = await OrderCloudSDK.Auth.Login(
    username,
    password,
    clientID,
    scope
  );
  res.status(200).json(authResponse);
});

module.exports = router;
