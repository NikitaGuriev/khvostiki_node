const {v4: uuidv4} = require('uuid');

const FS = require('fs');
const PATH = require('path');

class Ad {
  /**
   * Конструктор класса
   * @param {string} title Заголовок
   * @param {string} text Описание
   * @param {string} tel Номер телефона
   * @param {string} telResp Ответственный номера
   * @param {string} isGirl Самка?
   * @param {string} isDog Собака?
   * @param {string} isAdult Взрослая?
   * @param {string} isSterility Стерильная?
   * @param {string} isCastrated Кастрированный?
   * @param {string} imgLink Ссылка на изображение животного
   * @param {string} publishDate Дата публикации
   */
  constructor(
    title,
    text,
    tel,
    telResp,
    isGirl,
    isDog,
    isAdult,
    isSterility,
    isCastrated,
    imgLink,
    publishDate
  ) {
    this.TITLE = title;
    this.TEXT = text;
    this.TEL = tel.replace(/\s|\(|\)|-/g, '');
    this.TEL_RESP = telResp;
    this.IS_GIRL = isGirl;
    this.IS_DOG = isDog;
    this.IS_ADULT = isAdult;
    this.IS_STERILITY = isSterility;
    this.IS_CASTRATED = isCastrated;
    this.IMG_LINK = imgLink;
    this.PUBLISH_DATE = new Date().toLocaleDateString();
    this.ID = uuidv4();
  }

  toJSON() {
    return {
      title: this.TITLE,
      text: this.TEXT,
      tel: this.TEL,
      tel_resp: this.TEL_RESP,
      is_girl: this.IS_GIRL === 'on',
      is_dog: this.IS_DOG === 'on',
      is_adult: this.IS_ADULT === 'on',
      is_sterility: this.IS_STERILITY === 'on',
      is_castrated: this.IS_CASTRATED === 'on',
      id: this.ID,
      img_link: this.IMG_LINK,
      publish_date: this.PUBLISH_DATE
    };
  }

  async save() {
    const ADS = await Ad.getAll();
    ADS.push(this.toJSON());

    return new Promise((resolve, reject) => {
      FS.writeFile(
        PATH.join(__dirname, '..', 'data', 'ads.json'),
        JSON.stringify(ADS),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      )
    });
  }

  static getAll() {
    return new Promise(((resolve, reject) => {
      FS.readFile(PATH.join(__dirname, '..', 'data', 'ads.json'),
        'utf-8',
        (err, content) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(content));
          }
        }
      );
    }));
  }

  static async getById(id) {
    const ADS = await Ad.getAll();
    return ADS.find(c => c.id === id);
  }

  static async update(ad) {
    ad.tel = ad.tel.replace(/\s|\(|\)|-/g, ''); // Форматирование номера
    // телефона
    const ADS = await Ad.getAll();
    const INDEX = ADS.findIndex(c => c.id === ad.id);
    ADS[INDEX] = ad;

    return new Promise((resolve, reject) => {
      FS.writeFile(
        PATH.join(__dirname, '..', 'data', 'ads.json'),
        JSON.stringify(ADS),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      )
    });
  }
}

module.exports = Ad;