const User = require('./user.model');
const { isNotObj, isNotArr } = require('../../utils/validator');
const {
  NOT_FOUND_ERROR,
  UNPROCESSABLE_ENTITY_ERROR,
  FORBIDDEN_ERROR
} = require('../../utils/errors');
const { ENTITY_USER: ENTITY } = require('../../common/config');

const getAll = async () => User.find({});

const get = async id => {
  const user = await User.findById(id);

  if (isNotObj(user)) {
    throw new NOT_FOUND_ERROR({
      entity: ENTITY,
      params: { id }
    });
  }

  return user;
};

const getUser = async login => {
  const user = await User.find({ login });

  if (isNotArr(user)) {
    throw new FORBIDDEN_ERROR({
      entity: ENTITY,
      params: { login }
    });
  }

  return user;
};

const create = async newUser => User.create(newUser);

const update = async ({ id, newUser }) => {
  const result = await User.updateOne({ _id: id }, newUser);

  if (result.nModified === 0) {
    throw new UNPROCESSABLE_ENTITY_ERROR({
      entity: ENTITY,
      params: { id, newUser }
    });
  }
};

const del = async id => {
  const result = await User.deleteOne({ _id: id });

  if (result.deletedCount === 0) {
    throw new NOT_FOUND_ERROR({
      entity: ENTITY,
      params: { id }
    });
  }
};

module.exports = { getAll, create, get, del, update, getUser };
