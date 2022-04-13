const {Router} = require('express');
const Ad = require('../models/ad_mdb');
const FUNCS = require('../models/funcs');
const AUTH = require('../middlewares/auth');

const ROUTER = Router();

ROUTER.get('/:id/edit', AUTH, async (req, res) => {
  const AD = await Ad.findById(req.params.id);
  res.render('edit_ad', {
    pageTitle: `Редактировать ${AD.title}`,
    AD
  });
});

ROUTER.get('/:id/delete', AUTH, async (req, res) => {
  try {
    await Ad.deleteOne({_id: req.params.id});
    res.redirect('/');
  } catch (e) {
    console.log(e);
  }
});

ROUTER.get('/:id/archive', AUTH, async (req, res) => {
  req.body.is_archived = true;
  await Ad.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/');
});

ROUTER.get('/:id/unarchive', AUTH, async (req, res) => {
  req.body.is_archived = false;
  await Ad.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/found_a_home');
});

ROUTER.post('/edit', AUTH, async (req, res) => {
  const {id} = req.body;
  req.body.is_girl = FUNCS.checkSwitch(req.body.is_girl);
  req.body.is_dog = FUNCS.checkSwitch(req.body.is_dog);
  req.body.is_adult = FUNCS.checkSwitch(req.body.is_adult);
  req.body.is_sterility = FUNCS.checkSwitch(req.body.is_sterility);
  req.body.is_castrated = FUNCS.checkSwitch(req.body.is_castrated);
  delete req.body.id;
  await Ad.findByIdAndUpdate(id, req.body);
  res.redirect('/');
});

ROUTER.get('/:id', async (req, res) => {
  const AD = await Ad.findById(req.params.id);
  res.render('ad', {
    pageTitle: AD.title,
    AD
  });
});

module.exports = ROUTER;