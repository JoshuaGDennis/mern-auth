const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

const users = require("./routes/api/users");

// Middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api/users", users);

// DB Config
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("MONGO DB CONNECTED"))
  .catch(console.log);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port: ${port}`));
