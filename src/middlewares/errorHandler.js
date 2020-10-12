const logger = require('../common/logger');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
  if (err) {
    logger.error(`status: ${INTERNAL_SERVER_ERROR}, message: ${err.message}`);
    res
      .status(INTERNAL_SERVER_ERROR)
      .send(getStatusText(INTERNAL_SERVER_ERROR));
  }

  next();
};

module.exports = errorHandler;
