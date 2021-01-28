import express from 'express';
const router = express.Router();
const { OrderCloudSDK, scope } = require("../config/ordercloud.config");

router.route("/login").post(async (req, res) => {
  const { username, password, clientID, redirectUri, state } = req.body;
  const authResponse = await OrderCloudSDK.Auth.Login(
    username,
    password,
    clientID,
    scope
  );
  res.status(200).json({
    redirectUrl: `${redirectUri}?access_token=${authResponse.access_token}&token_type=bearer&state=${state}`,
  });
});

module.exports = router;
