const {Router} = require('express');

const ROUTER = Router();

ROUTER.get('/', async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = ROUTER;