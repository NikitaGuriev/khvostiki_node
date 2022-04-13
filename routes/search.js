const {Router} = require('express');

const ROUTER = Router();

ROUTER.get('/', (req, res) => {
  res.render('search', {
    pageTitle: 'Быстрый поиск. Хвостики.Ру',
    isSearchPage: true
  });
});

module.exports = ROUTER;