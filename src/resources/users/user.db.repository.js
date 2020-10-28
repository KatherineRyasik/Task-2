const { NOT_FOUND_ERROR, BAD_REQUEST } = require('../../errors/errors');
const User = require('./user.model');
const Task = require('../tasks/task.model');

const getAll = async () => {
  const users = await User.find({}).catch(() => {
    throw new BAD_REQUEST('Bad Request');
  });
  return users;
};

const get = async id => {
  const user = await User.findById(id).catch(() => {
    throw new NOT_FOUND_ERROR(`The user with id: ${id} was not found`);
  });
  if (!user) throw new NOT_FOUND_ERROR(`The user with id: ${id} was not found`);
  return user;
};

const create = async user => {
  const newUser = await User.create(user).catch(() => {
    throw new BAD_REQUEST('Bad Request');
  });
  if (!newUser) throw new BAD_REQUEST('Bad Request');
  return newUser;
};

const update = async (user, id) => {
  const newUser = await User.findOneAndUpdate({ _id: id }, user).catch(() => {
    throw new BAD_REQUEST('Bad Request');
  });
  if (!newUser) throw new BAD_REQUEST('Bad Request');

  return newUser;
};

const remove = async id => {
  await Task.updateMany({ userId: id }, { userId: null });

  const user = await User.findOneAndDelete({ _id: id }).catch(() => {
    throw new NOT_FOUND_ERROR(`The user with id: ${id} was not found`);
  });
  if (!user) throw new NOT_FOUND_ERROR(`The user with id: ${id} was not found`);
  return user;
};

module.exports = { getAll, get, create, update, remove };
