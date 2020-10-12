const userRouter = require('express').Router();
const catchError = require('../../common/catchError');
const userService = require('./user.service');
const User = require('./user.model');
const { OK, NOT_FOUND } = require('http-status-codes');

userRouter.route('/').get(
  catchError(async (req, res) => {
    const users = await userService.getAll();

    res.status(OK).json(users.map(User.toResponse));
  })
);

userRouter.route('/:id').get(
  catchError(async (req, res) => {
    const { id } = req.params;
    const user = await userService.getById(id);

    if (user) {
      res.status(OK).json(User.toResponse(user));
    } else {
      res.status(NOT_FOUND).send('User not found');
    }
  })
);

userRouter.route('/').post(
  catchError(async (req, res) => {
    const { name, login, password } = req.body;
    const user = await userService.create({ name, login, password });

    res.status(OK).json(User.toResponse(user));
  })
);

userRouter.route('/:id').put(
  catchError(async (req, res) => {
    const { id } = req.params;
    const { name, login, password } = req.body;
    const potentialUser = await userService.getById(id);

    if (potentialUser) {
      const user = await userService.update({ id, name, login, password });

      res.status(OK).json(User.toResponse(user));
    } else {
      res.status(NOT_FOUND).send('User not found');
    }
  })
);

userRouter.route('/:id').delete(
  catchError(async (req, res) => {
    const { id } = req.params;
    const potentialUser = await userService.getById(id);

    if (potentialUser) {
      const isRemoved = await userService.remove(id);

      if (isRemoved) res.status(OK).send('The user has been deleted');
    } else {
      res.status(NOT_FOUND).send('User not found');
    }
  })
);

module.exports = userRouter;
