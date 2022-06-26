const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const app = express();
app.use(express.json());

// Used in production to server client files
if (process.env.NODE_ENV !== "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client.js", "build.js", "index.html"));
  });
}

// Connecting to mongoDB and then running server on port 4000
const dbURI = config.get("dbURI");
const port = process.env.PORT || 4000;
mongoose
  .connect(dbURI, {
    userNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));