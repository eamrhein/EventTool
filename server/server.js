/* eslint-disable no-console */
const express = require("express");
const mongoose = require("mongoose");
const expressGraphQl = require("express-graphql");
const bodyParser = require("body-parser");
const cors = require("cors");
const models = require("./models");

const schema = require("./schema/schema");

const db = require("../config/keys").mongoURI;

const app = express();

app.use(cors());

app.use(
  "/graphql",
  expressGraphQl((req) => {
    return {
      schema,
      context: {
        token: req.headers.authorization,
      },
      graphiql: true,
    };
  })
);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
  });
}

if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}

// Connect MongoDB:
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(bodyParser.json());

module.exports = app;
