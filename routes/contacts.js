const {Router} = require('express');

const ROUTER = Router();

ROUTER.get('/', (req, res) => {
  res.render('contacts', {
    pageTitle: 'Контакты. Хвостики.Ру',
    isContactsPage: true
  });
});

module.exports = ROUTER;