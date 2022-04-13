/**
 * Блок подключения модулей
 */
const EXPRESS = require('express');
const PATH = require('path');
const HANDLEBARS = require('handlebars');
const EXHB = require('express-handlebars');
const BCRYPT = require('bcryptjs');
const CSRF = require('csurf');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const MONGOOSE = require('mongoose');
const SESSIONS = require('express-session');
const MongoStore = require('connect-mongodb-session')(SESSIONS);
const FLASH = require('connect-flash');
// const HELMET = require('helmet');
const COMPRESSION = require('compression');

const User = require('./models/user');
const varMiddleware = require('./middlewares/variables');
const errorHandler = require('./middlewares/errors');
const fileMiddleware = require('./middlewares/files');
const KEYS = require('./keys/');

/**
 * Блой импорта роутов
 */
const INDEX_ROUTES = require('./routes/index');
const FOUND_A_HOME_ROUTES = require('./routes/found_a_home');
const SEARCH_ROUTES = require('./routes/search');
const CONTACTS_ROUTES = require('./routes/contacts');
const GALLERY_ROUTES = require('./routes/gallery');
const SIGN_IN_ROUTES = require('./routes/sign_in');
const SIGN_OUT_ROUTES = require('./routes/sign_out');
const ADD_AD_ROUTES = require('./routes/add_ad');
const AD_ROUTES = require('./routes/ad');

/**
 * Блок определения констант
 */
const APP = EXPRESS();
const PORT = process.env.PORT || 3030;

/**
 * MongoDB
 */
const STORE = new MongoStore({
  collection: 'sessions',
  uri: KEYS.MONGO_DB_URI,
});

/**
 * Блок определения функций
 */
async function start() {
  try {
    await MONGOOSE.connect(KEYS.MONGO_DB_URI, {
      useNewUrlParser: true,
      // useFindAndModify: false
    },
    );
    /* const CANDIDATE = await User.findOne();
    if (!CANDIDATE) {
      const HASH_PASSWORD = await BCRYPT.hash('Hvostiki123#', 10);
      const USER = new User({
        login: 'Hvostiki',
        password: HASH_PASSWORD
      });
      await USER.save();
    } */
    /**
     * Блок запуска сервера
     */
    APP.listen(PORT, () => {
      console.log(`Сервер запущен на http://localhost:${PORT}/`);
    });
  } catch (e) {
    console.log('Ошибка подключения к mongoDB');
    console.log(e);
  }
}

start();


/**
 * Блок алгоритма работы
 */

/**
 * Настройка HandleBars
 */
APP.engine('hbs', EXHB({
  handlebars: allowInsecurePrototypeAccess(HANDLEBARS),
  defaultLayout: 'main',
  extname: 'hbs',
}));
APP.set('view engine', 'hbs');
APP.set('views', 'views');
APP.use(EXPRESS.static(PATH.join(__dirname, 'public')));
APP.use('/photos', EXPRESS.static(PATH.join(__dirname, 'photos')));
APP.use(EXPRESS.urlencoded({extended: true}));
APP.use(SESSIONS({
  secret: KEYS.SESSIONS_SECRET,
  resave: false,
  saveUninitialized: false,
  store: STORE,
}));
APP.use(fileMiddleware.single('animal_photo'));
APP.use(CSRF());
APP.use(FLASH());
// APP.use(HELMET());
APP.use(COMPRESSION());
APP.use(varMiddleware);

/**
 * Блок подключения роутов
 */
APP.use('/', INDEX_ROUTES);
APP.use('/found_a_home', FOUND_A_HOME_ROUTES);
APP.use('/search', SEARCH_ROUTES);
APP.use('/contacts', CONTACTS_ROUTES);
APP.use('/gallery', GALLERY_ROUTES);
APP.use('/sign_in', SIGN_IN_ROUTES);
APP.use('/sign_out', SIGN_OUT_ROUTES);
APP.use('/add_ad', ADD_AD_ROUTES);
APP.use('/ad', AD_ROUTES);

APP.use(errorHandler);
