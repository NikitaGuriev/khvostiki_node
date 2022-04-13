const {Router} = require('express');

const ROUTER = Router();

ROUTER.get('/', (req, res) => {
  res.render('gallery', {
    pageTitle: 'Галерея. Хвостики.Ру',
    isGalleryPage: true
  });
});

module.exports = ROUTER;