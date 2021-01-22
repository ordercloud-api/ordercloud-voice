const router = require("express").Router();

//  /api/example/success
router.route("/success").get((req, res) => {
  res.status(200).json({ Response: "Success!" });
});

//  /api/example/failure
router.route("/failure").get((req, res) => {
  res.status(400).json({ Response: "Failure!" });
});

module.exports = router;
