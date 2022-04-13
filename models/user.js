const {Schema, model} = require('mongoose');

const USER_SCHEMA = new Schema({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = model('User', USER_SCHEMA);
