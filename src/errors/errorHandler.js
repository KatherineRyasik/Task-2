const { NOT_FOUND_ERROR, BAD_REQUEST } = require('./errors');
const { logger } = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  if (err instanceof NOT_FOUND_ERROR || err instanceof BAD_REQUEST) {
    logger.error(`${err.message}\n`);
    res.status(err.status).send(err.message);
  } else if (err) {
    logger.error(
      `Internal Server Error\n${
        err.stack ? `\n${err.stack.split('\n').slice(1, 2)}` : ''
      }\n`
    );
    res.status(500).send('500. Internal Server Error');
  }
  next();
};

module.exports = errorHandler;
