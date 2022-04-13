/**
 * Блок подключения модулей
 */
const MULTER = require('multer');

/**
 * Блок определения констант
 */
const STORAGE = MULTER.diskStorage({
  destination(req, file, cb) {
    cb(null, 'photos');
  },
  filename(req, file, cb) {
    cb(null, new Date().getTime() + '_' + file.originalname);
  },
});

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

const FILE_FILTER = (req, file, cb) => {
  if (ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

/**
 * Экспорт
 */
module.exports = MULTER({
  storage: STORAGE,
  filter: FILE_FILTER,
});
