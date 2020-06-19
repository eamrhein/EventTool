/* eslint-disable no-console */
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const expressGraphQl = require("express-graphql");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const models = require("./models");
const scheduler = require("./services/scheduler");
const schema = require("./schema/schema");

const db = require("../config/keys").mongoURI;

const app = express();

if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}
// scheduler.eventCleaner();
// Connect MongoDB:
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
app.use(cors());
app.use(helmet());
let redirector = require("redirect-https")({
  body: "<!-- Hello Developer! Please use HTTPS instead: {{ URL }} -->",
});
app.use(compression());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

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
app.use("/", redirector);
app.use(bodyParser.json());

module.exports = app;
