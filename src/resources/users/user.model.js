const { Schema, model } = require('mongoose');
const uuid = require('uuid');

const User = new Schema(
  {
    _id: {
      type: String,
      default: uuid,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    login: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { versionKey: false }
);

User.statics.toResponse = user => {
  const { id, name, login } = user;

  return { id, name, login };
};

module.exports = model('User', User);
