const bcrypt = require('bcrypt');
const { SOLT_ROUNDS } = require('../common/config');

const hashByPassword = async password =>
  await bcrypt.hash(password, SOLT_ROUNDS);

const chechPassword = async (password, hash) =>
  await bcrypt.compare(password, hash);

module.exports = {
  hashByPassword,
  chechPassword
};
