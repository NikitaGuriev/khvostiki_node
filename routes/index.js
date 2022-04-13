const {Router} = require('express');
const Ad = require('../models/ad_mdb');

const ROUTER = Router();

/**
 * Блок определения констант
 */
const MAX_QUERIES = 4;

ROUTER.get('/', async (req, res) => {
  const ADS = await Ad
      .find({
        is_archived: false,
      })
      .limit(MAX_QUERIES)
      .sort({
        _id: 'desc',
      });
  res.render('index', {
    pageTitle: 'Хвостики.Ру',
    isIndexPage: true,
    ADS,
  });
});

ROUTER.get('/load_more', async (req, res) => {
  const ADS = await Ad
      .find({
        is_archived: false,
      })
      .limit(4)
      .skip(4);
  res.send(ADS);
});

module.exports = ROUTER;
