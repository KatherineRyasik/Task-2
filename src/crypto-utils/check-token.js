const { UNAUTHORIZED_ERROR } = require('../utils/errors');
const { JWT_SECRET_KEY } = require('../common/config');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  try {
    if (authHeader === undefined) {
      throw Error();
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer') {
      throw Error();
    }

    jwt.verify(token, JWT_SECRET_KEY);
  } catch (err) {
    return next(
      new UNAUTHORIZED_ERROR({
        message: 'Wrong auth schema!'
      })
    );
  }
  next();
};

module.exports = verifyToken;
