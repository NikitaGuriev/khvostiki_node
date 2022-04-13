/**
 * Блок подключения модулей
 */
const {Router} = require('express');
const NODE_MAILER = require('nodemailer');
const sendGrid = require('nodemailer-sendgrid-transport');
const {validationResult} = require('express-validator');

/**
 * Блок определения констант
 */
const Ad = require('../models/ad_mdb');
const FUNCS = require('../models/funcs');
const AUTH = require('../middlewares/auth');
const KEYS = require('../keys/');
const SETTINGS = require('../settings');
const {addAdValidators} = require('../utils/validators');

const ROUTER = Router();
const TRANSPORTER = NODE_MAILER.createTransport(sendGrid({
  auth: {
    api_key: KEYS.SEND_GRID_API_KEY,
  },
}));

ROUTER.get('/', AUTH, (req, res) => {
  res.render('add_ad', {
    pageTitle: 'Добавить объявление. Хвостики.Ру',
    addAdError: req.flash('add_ad_error'),
  });
});

ROUTER.post('/', addAdValidators, async (req, res) => {
  const AD = new Ad({
    title: req.body.title,
    text: req.body.text,
    tel: req.body.tel,
    tel_resp: req.body.tel_resp,
    is_girl: FUNCS.checkSwitch(req.body.is_girl),
    is_dog: FUNCS.checkSwitch(req.body.is_dog),
    is_adult: FUNCS.checkSwitch(req.body.is_adult),
    is_sterility: FUNCS.checkSwitch(req.body.is_sterility),
    is_castrated: FUNCS.checkSwitch(req.body.is_castrated),
    img_link: req.file.path,
    publish_date: new Date().toLocaleDateString(),
    is_archived: false,
  });

  const ERRORS = validationResult(req);
  if (!ERRORS.isEmpty()) {
    req.flash('add_ad_error', ERRORS.array()[0].msg);
    return res.status(422).redirect('/add_ad');
  }

  try {
    await AD.save();
  } catch (e) {
    console.log(e);
  }
  await AD.save();

  res.redirect('/');

  /**
   * Блок отправки E-Mail
   */
  if (SETTINGS.SEND_MAIL_AFTER_ADD_AD) {
    await TRANSPORTER.sendMail({
      to: KEYS.NODEMAILER_NOTIFICATIONS_EMAIL,
      from: 'stig.guriev@gmail.com',
      subject: 'Новое объявление было добавлено на сайт!',
      html:
        `
        <h4>Khvostiki.Ru</h4>
        <h6>На сайт было добавлено новое объявление!</h6>
        <a href="${KEYS.BASE_URL}" target="_blank">Посмотреть</a>
        `,
    });
  }
});

module.exports = ROUTER;
