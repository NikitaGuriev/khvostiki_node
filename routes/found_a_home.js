const {Router} = require('express');
const Ad = require('../models/ad_mdb');

const ROUTER = Router();

ROUTER.get('/', async (req, res) => {
  const ADS = await Ad
    .find({
      is_archived: true
    })
    .sort({
      _id: 'desc'
    });
  res.render('found_a_home', {
    pageTitle: 'Нашли дом. Хвостики.Ру',
    isFoundAHomePage: true,
    ADS
  });
});

module.exports = ROUTER;