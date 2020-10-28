const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const asyncErrorHandler = require('../../errors/asyncErrorHandler');

router.route('/').get(
  asyncErrorHandler(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  asyncErrorHandler(async (req, res) => {
    const user = await usersService.get(req.params.id);
    res.json(User.toResponse(user));
  })
);

router.route('/').post(
  asyncErrorHandler(async (req, res) => {
    const user = await usersService.create(
      new User({
        name: req.body.name,
        login: req.body.login,
        password: req.body.password
      })
    );

    res.json(User.toResponse(user));
  })
);

router.route('/:id').put(
  asyncErrorHandler(async (req, res) => {
    const user = await usersService.update(
      {
        name: req.body.name,
        login: req.body.login,
        password: req.body.password
      },
      req.params.id
    );

    res.json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  asyncErrorHandler(async (req, res) => {
    await usersService.remove(req.params.id);
    res.sendStatus(204);
  })
);

module.exports = router;
