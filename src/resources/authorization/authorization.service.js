const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');

const getToken = userData => {
  const { _id, login } = userData;
  const token = jwt.sign({ _id, login }, JWT_SECRET_KEY, { expiresIn: '1h' });

  return token;
};

module.exports = { getToken };
