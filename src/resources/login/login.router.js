const router = require('express').Router();
const loginService = require('./login.service');
const asyncErrHandler = require('../../utils/async.handler');
const { validate } = require('../../utils/validator');
const { ENTITY_USER: ENTITY } = require('../../common/config');

router.route('/').post(
  asyncErrHandler(async (req, res) => {
    if (process.env.NODE_ENV === 'production') {
      validate(ENTITY, req.body);
    }

    const { login, password } = req.body;
    const token = await loginService.signToken({ login, password });

    res.json(token);
  })
);

module.exports = router;
