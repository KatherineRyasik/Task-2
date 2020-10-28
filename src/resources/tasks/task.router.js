const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');
const asyncErrorHandler = require('../../errors/asyncErrorHandler');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll();
  res.json(tasks.map(Task.toResponse));
});

router.route('/:id').get(
  asyncErrorHandler(async (req, res) => {
    const task = await tasksService.get(req.params.id, req.params.boardId);
    res.json(Task.toResponse(task));
  })
);

router.route('/').post(
  asyncErrorHandler(async (req, res) => {
    const task = await tasksService.create(
      new Task({
        title: req.body.title,
        order: req.body.order,
        description: req.body.description,
        userId: req.body.userId,
        boardId: req.params.boardId,
        columnId: req.body.columnId
      })
    );

    res.json(Task.toResponse(task));
  })
);

router.route('/:id').put(
  asyncErrorHandler(async (req, res) => {
    const task = await tasksService.update(
      {
        title: req.body.title,
        order: req.body.order,
        description: req.body.description,
        userId: req.body.userId,
        columnId: req.body.columnId
      },
      req.params.id,
      req.params.boardId
    );

    res.json(Task.toResponse(task));
  })
);

router.route('/:id').delete(
  asyncErrorHandler(async (req, res) => {
    await tasksService.remove(req.params.id, req.params.boardId);
    res.sendStatus(204);
  })
);

module.exports = router;
