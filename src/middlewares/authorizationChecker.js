const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
const { UNAUTHORIZED, getStatusText } = require('http-status-codes');

const authorizationChecker = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    const token = authorization.split(' ')[1];

    jwt.verify(token, JWT_SECRET_KEY, err => {
      if (err) {
        return res.status(UNAUTHORIZED).send(getStatusText(UNAUTHORIZED));
      }

      return next();
    });
  } else {
    res.status(UNAUTHORIZED).send(getStatusText(UNAUTHORIZED));
  }
};

module.exports = authorizationChecker;
