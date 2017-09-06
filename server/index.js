const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyParser = require('body-parser');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const requireLogin = require('./middlewares/requireLogin');

const keys = require("./config/keys")
const stripe = require('stripe')(keys.stripeSecretKey);
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req,res) => {
    res.redirect('/surveys');
  }
);

app.get("/api/logout", (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get("/api/current_user", (req, res) => {
  console.log(req.user);
  res.send(req.user);
});

app.post('/api/stripe', requireLogin, (req,res) => {
  stripe.charges.create({
    amount: 500,
    currency: 'usd',
    description: '5 f0r 5',
    source: req.body.id
  },function(err, charge){
    console.log(charge);
  })
  .then(() => {
      req.user.credits += 5;
      return req.user.save()
    })
  .then((user) => res.send(user))
});

app.listen(8080, () => {
  console.log("server at 8080");
});
