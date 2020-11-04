const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const asyncErrHandler = require('../../utils/async.handler');
const { verifyId, validate } = require('../../utils/validator');
const { ENTITY_USER: ENTITY } = require('../../common/config');

router.route('/').get(
  asyncErrHandler(async (req, res) => {
    const users = await usersService.getAll();

    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  asyncErrHandler(async (req, res) => {
    const id = verifyId(req.params.id, ENTITY);
    const user = await usersService.get(id);

    res.json(User.toResponse(user));
  })
);

router.route('/').post(
  asyncErrHandler(async (req, res) => {
    validate(ENTITY, req.body);
    const user = await usersService.create(req.body);

    res.json(User.toResponse(user));
  })
);

router.route('/:id').put(
  asyncErrHandler(async (req, res) => {
    const id = verifyId(req.params.id, ENTITY);
    const updatedUser = req.body;

    validate(ENTITY, updatedUser);

    await usersService.put({ id, updatedUser });
    const user = await usersService.get(id);

    res.json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  asyncErrHandler(async (req, res) => {
    const id = verifyId(req.params.id, ENTITY);
    await usersService.del(id);

    res.status(204).send('The user has been deleted');
  })
);

module.exports = router;
