const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./config/keys");
require("./services/passport");

const app = express();

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

app.get("auth/google/callback", passport.authenticate("google"));

app.listen(8080, () => {
  console.log("server at 8080");
});
