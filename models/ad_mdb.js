const {Schema, model} = require('mongoose');

const AD = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  tel_resp: {
    type: String,
    required: true,
  },
  is_girl: {
    type: Boolean,
    required: true,
  },
  is_dog: {
    type: Boolean,
    required: true,
  },
  is_adult: {
    type: Boolean,
    required: true,
  },
  is_sterility: {
    type: Boolean,
    required: true,
  },
  is_castrated: {
    type: Boolean,
    required: true,
  },
  img_link: {
    type: String,
    required: true,
  },
  publish_date: {
    type: String,
    required: true,
  },
  is_archived: {
    type: Boolean,
    required: true,
  },
});

module.exports = model('Ad', AD);
