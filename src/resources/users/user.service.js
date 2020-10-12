const userDbRepository = require('./user.db.repository');
const taskDbRepository = require('../tasks/task.db.repository');
const bcrypt = require('bcrypt');
const { BCRYPT_SALT_ROUNDS } = require('../../common/config');

const getAll = () => userDbRepository.getAll();

const getById = id => userDbRepository.getById(id);

const getByLogin = login => userDbRepository.getByLogin(login);

const getByLoginAndPassword = async userData => {
  const { login, password } = userData;
  const potentialUser = await getByLogin(login);

  if (potentialUser) {
    const { password: hashedPassword } = potentialUser;
    const isMatchPassword = await bcrypt.compare(password, hashedPassword);

    if (isMatchPassword) return potentialUser;
  }

  return;
};

const create = async userData => {
  const { name, login, password } = userData;
  const hashedPassword = await bcrypt.hash(password, +BCRYPT_SALT_ROUNDS);

  return userDbRepository.create({ name, login, password: hashedPassword });
};

const update = async userData => {
  const { id, name, login, password } = userData;
  const hashedPassword = await bcrypt.hash(password, +BCRYPT_SALT_ROUNDS);

  return userDbRepository.update({ id, name, login, password: hashedPassword });
};

const remove = async id => {
  const isRemoved = await userDbRepository.remove(id);

  if (isRemoved) {
    return await taskDbRepository.eraseUserIdAfterRemovingUser(id);
  }
};

module.exports = {
  getAll,
  getById,
  getByLogin,
  getByLoginAndPassword,
  create,
  update,
  remove
};
