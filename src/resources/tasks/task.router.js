const taskRouter = require('express').Router();
const catchError = require('../../common/catchError');
const taskService = require('./task.service');
const Task = require('./task.model');
const { OK, NOT_FOUND } = require('http-status-codes');

taskRouter.route('/:boardId/tasks').get(
  catchError(async (req, res) => {
    const { boardId } = req.params;
    const boardTasks = await taskService.getAllByBoardId(boardId);

    res.status(OK).json(boardTasks.map(Task.toResponse));
  })
);

taskRouter.route('/:boardId/tasks/:taskId').get(
  catchError(async (req, res) => {
    const { boardId, taskId } = req.params;
    const task = await taskService.getByBoardIdAndTaskId(boardId, taskId);

    if (task) {
      res.status(OK).json(Task.toResponse(task));
    } else {
      res.status(NOT_FOUND).send('Task not found');
    }
  })
);

taskRouter.route('/:boardId/tasks').post(
  catchError(async (req, res) => {
    const { boardId } = req.params;
    const { title, order, description, userId, columnId } = req.body;
    const task = await taskService.create({
      title,
      order,
      description,
      boardId,
      userId,
      columnId
    });

    res.status(OK).json(Task.toResponse(task));
  })
);

taskRouter.route('/:boardId/tasks/:taskId').put(
  catchError(async (req, res) => {
    const { boardId, taskId } = req.params;
    const { title, order, description, columnId } = req.body;
    const potentialTask = await taskService.getByBoardIdAndTaskId(
      boardId,
      taskId
    );

    if (potentialTask) {
      const task = await taskService.update({
        title,
        order,
        description,
        boardId,
        taskId,
        columnId
      });

      res.status(OK).json(Task.toResponse(task));
    } else {
      res.status(NOT_FOUND).send('Task not found');
    }
  })
);

taskRouter.route('/:boardId/tasks/:taskId').delete(
  catchError(async (req, res) => {
    const { boardId, taskId } = req.params;
    const potentialTask = await taskService.getByBoardIdAndTaskId(
      boardId,
      taskId
    );

    if (potentialTask) {
      const isRemoved = await taskService.remove(boardId, taskId);

      if (isRemoved) {
        res.status(OK).send('The task has been deleted');
      }
    } else {
      res.status(NOT_FOUND).send('Task not found');
    }
  })
);

module.exports = taskRouter;
