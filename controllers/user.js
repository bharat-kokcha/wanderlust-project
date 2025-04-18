// controllers/user.js

const User = require('../models/user');
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');

module.exports.renderSignupForm = (req, res) => {
  res.render('users/signup');
};

module.exports.signup = wrapAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email });
  const registeredUser = await User.register(user, password);
  req.login(registeredUser, err => {
    if (err) return next(err);
    req.flash('success', 'Welcome to Wanderlust!');
    res.redirect('/listings');
  });
});

module.exports.renderLoginForm = (req, res) => {
  res.render('users/login');
};

module.exports.login = (req, res) => {
  req.flash('success', 'Welcome back!');
  const redirectUrl = req.session.returnTo || '/listings';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.flash('success', 'Goodbye!');
    res.redirect('/listings');
  });
};
