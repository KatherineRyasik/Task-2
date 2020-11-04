const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');
const { hashByPassword } = require('../../crypto-utils/hash-helpers');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const create = async props => {
  const { password } = props;

  const hashedPassword = await hashByPassword(password);
  const newUser = {
    ...props,
    password: hashedPassword
  };

  return usersRepo.create(newUser);
};

const put = async ({ id, updatedUser }) => {
  const { password } = updatedUser;

  const hashedPassword =
    password !== undefined ? await hashByPassword(password) : null;

  const newUser =
    hashedPassword === null
      ? { ...updatedUser }
      : { ...updatedUser, password: hashedPassword };

  return usersRepo.update({ id, newUser });
};

const del = async id => {
  await usersRepo.del(id);
  await tasksRepo.resetUserId(id);
};

module.exports = { getAll, get, create, put, del };
