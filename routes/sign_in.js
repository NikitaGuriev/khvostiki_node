const {Router} = require('express');
const BCRYPT = require('bcryptjs');

const User = require('../models/user');

const ROUTER = Router();

ROUTER.get('/', (req, res) => {
  res.render('sign_in', {
    pageTitle: 'Вход. Хвостики.Ру',
    isSignInPage: true,
    loginError: req.flash('login_error'),
    passwordError: req.flash('password_error'),
  });
});

ROUTER.post('/', async (req, res) => {
  try {
    const {login, password} = req.body;
    const CANDIDATE = await User.findOne({login});
    if (CANDIDATE) {
      const IS_SAME = await BCRYPT.compare(password, CANDIDATE.password);
      if (IS_SAME) {
        req.session.isAuthenticated = true;
        req.session.user = CANDIDATE;
        req.session.save((err) => {
          if (err) {
            throw err;
          } else {
            res.redirect('/');
          }
        });
      } else {
        req.flash('password_error', 'Не верный логин или пароль');
        res.redirect('/sign_in');
      }
    } else {
      req.flash('login_error', 'Пользователь не найден');
      res.redirect('/sign_in');
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = ROUTER;
