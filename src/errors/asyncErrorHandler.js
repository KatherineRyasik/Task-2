const asyncErrorHandler = cb => async (req, res, next) => {
  try {
    return await cb(req, res, next);
  } catch (err) {
    return next(err);
  }
};

module.exports = asyncErrorHandler;
