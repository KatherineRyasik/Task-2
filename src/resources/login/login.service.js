const usersRepo = require('../users/user.memory.repository');
const { FORBIDDEN_ERROR } = require('../../utils/errors');
const { ENTITY_USER: ENTITY, JWT_SECRET_KEY } = require('../../common/config');
const jwt = require('jsonwebtoken');
const { chechPassword } = require('../../crypto-utils/hash-helpers');

const signToken = async props => {
  const { login: reqLogin, password: reqPassword } = props;

  const resUser = await usersRepo.getUser(reqLogin);
  const { _id: id, login, password: hashedPassword } = resUser[0];

  const resultReconciling = await chechPassword(reqPassword, hashedPassword);

  if (resultReconciling !== true) {
    throw new FORBIDDEN_ERROR({
      entity: ENTITY,
      params: { login: reqLogin, password: reqPassword }
    });
  }

  const token = jwt.sign({ id, login }, JWT_SECRET_KEY, { expiresIn: '30m' });

  return { token };
};

module.exports = { signToken };
