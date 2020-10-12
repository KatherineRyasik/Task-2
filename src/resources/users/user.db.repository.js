const User = require('./user.model');

const getAll = () => User.find({});

const getById = id => User.findById(id);

const getByLogin = login => User.findOne({ login });

const create = userData => User.create(userData);

const update = async userData => {
  const { id: _id } = userData;

  await User.updateOne({ _id }, userData);

  return getById(_id);
};

const remove = async _id => {
  return (await User.deleteOne({ _id })).ok;
};

module.exports = { getAll, getById, getByLogin, create, update, remove };
