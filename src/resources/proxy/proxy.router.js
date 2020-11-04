const { ROUTE_WHITELIST } = require('../../common/config');
const verifyToken = require('../../crypto-utils/check-token');

const proxyRouter = (req, res, next) => {
  const result = ROUTE_WHITELIST.includes(req.path);

  if (!result) {
    verifyToken(req, res, next);
    return;
  }

  next();
};

module.exports = proxyRouter;
