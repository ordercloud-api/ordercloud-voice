const express = require("express");
const app = express();
const port = process.env.PORT || 4451;
const path = require("path");
const projectRoot = path.join(__dirname, "../");

// client
app.use(express.static("client"));
app.get("/", (req, res) => {
  res.sendFile(`${projectRoot}/client/index.html`);
});

// server
app.use("/api/example", require("./routes/example"));

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
