const express = require("express");
const app = express();
const port = process.env.PORT || 4451;
const path = require("path");
const projectRoot = path.join(__dirname, "../");
// app.use(express.urlencoded()); // Used to parse form post bodies
// app.use(express.json()); // Used to parse JSON bodies

// client
app.use(express.static("client"));

// TODO: Bring this page back if we have time, right now it is not necessary as we will use the same client ID for the entire skill
// // Hidden route for developers or application owners to register their ClientID with a keyword
// app.get("/register", (req, res) => {
//   res.sendFile(`${projectRoot}/client/register/index.html`);
// });

// server
app.use("/api/ordercloud", require("./routes/ordercloud"));
app.use("/api/alexa", require("./routes/alexa"));

// catch-all
app.get("/*", (req, res) => {
  res.sendFile(`${projectRoot}/client/index.html`);
});

app.use(function (err, req, res, next) {
  console.log('custom error handler')
  console.log(err)
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});