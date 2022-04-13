const {body} = require('express-validator');

exports.addAdValidators = [
  body('title')
      .isLength({max: 128})
      .withMessage(
          `Заголовок не более 128 символов`,
      )
      .trim(),
  body('text')
      .isLength({max: 2000})
      .withMessage(
          `Описание не более 2 000 символов`,
      )
      .trim(),
  body('tel_resp')
      .isLength({max: 128})
      .withMessage(
          `Имя ответственного не более 128 символов`,
      )
      .trim(),
];
