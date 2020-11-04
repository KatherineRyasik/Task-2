const logger = require('../logger/logger');
const {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_ERROR,
  getStatusText,
  HttpError,
  StatusCodes
} = require('../utils/errors');

const transformError = (err, promise) => ({
  ...err,
  status: StatusCodes.INTERNAL_SERVER_ERROR,
  message: `${getStatusText(INTERNAL_SERVER_ERROR)}: ${
    err.message
  }, ${JSON.stringify(promise) || ''}`
});

const errorNotFound = (req, res, next) => {
  const url = req.originalUrl;
  next(
    new NOT_FOUND_ERROR({
      entity: 'URL',
      params: { url }
    })
  );
};

const errorClientHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    logger.errorClientHandler(err, req, res);
    res.status(err.status).send(err.message);
    return;
  }
  next(err);
};

const errorHandler = (err, req, res, next) => {
  logger.errorHandler(err);
  res
    .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
    .send(err.message || `${getStatusText(INTERNAL_SERVER_ERROR)}`);
  next();
};

const uncaughtExceptionHandler = err => {
  const exit = process.exit;
  logger.errorHandler(transformError(err), () => exit(1));
};

const unhandledRejectionHandler = (reason, promise) => {
  const exit = process.exit;
  logger.errorHandler(transformError(reason, promise));
  exit(1);
};

module.exports = {
  errorNotFound,
  errorClientHandler,
  errorHandler,
  uncaughtExceptionHandler,
  unhandledRejectionHandler
};
