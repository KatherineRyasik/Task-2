const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');
const asyncErrHandler = require('../../utils/async.handler');
const { verifyId, validate } = require('../../utils/validator');
const { ENTITY_TASK: ENTITY } = require('../../common/config');

router.route('/').get(
  asyncErrHandler(async (req, res) => {
    const boardId = verifyId(req.params.boardId, ENTITY);
    const tasks = await taskService.getAllByBoardId(boardId);

    res.json(tasks.map(Task.toResponse));
  })
);

router.route('/:id').get(
  asyncErrHandler(async (req, res) => {
    const boardId = verifyId(req.params.boardId, ENTITY);
    const id = verifyId(req.params.id, ENTITY);

    const task = await taskService.getByBoardId({ id, boardId });

    res.json(Task.toResponse(task[0]));
  })
);

router.route('/').post(
  asyncErrHandler(async (req, res) => {
    const boardId = verifyId(req.params.boardId, ENTITY);
    const newTask = {
      ...req.body,
      boardId
    };

    validate(ENTITY, newTask);

    const task = await taskService.create(newTask);

    res.json(Task.toResponse(task));
  })
);

router.route('/:id').put(
  asyncErrHandler(async (req, res) => {
    const boardId = verifyId(req.params.boardId, ENTITY);
    const id = verifyId(req.params.id, ENTITY);
    const newTask = {
      ...req.body,
      boardId
    };

    validate(ENTITY, newTask);

    await taskService.put({ id, boardId, newTask });

    const task = await taskService.getByBoardId({ id, boardId });

    res.json(Task.toResponse(task[0]));
  })
);

router.route('/:id').delete(
  asyncErrHandler(async (req, res) => {
    const boardId = verifyId(req.params.boardId, ENTITY);
    const id = verifyId(req.params.id, ENTITY);

    await taskService.del({ boardId, id });

    res.status(204).send('The task has been deleted');
  })
);

module.exports = router;
