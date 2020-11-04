const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    login: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      unique: true
    }
  },
  {
    versionKey: false,
    collection: 'Users'
  }
);

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const User = mongoose.model('Users', userSchema);

module.exports = User;
