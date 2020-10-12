const boardRouter = require('express').Router();
const catchError = require('../../common/catchError');
const boardService = require('./board.service');
const Board = require('./board.model');
const { OK, NOT_FOUND } = require('http-status-codes');

boardRouter.route('/').get(
  catchError(async (req, res) => {
    const boards = await boardService.getAll();

    res.status(OK).json(boards.map(Board.toResponse));
  })
);

boardRouter.route('/:id').get(
  catchError(async (req, res) => {
    const { id } = req.params;
    const board = await boardService.getById(id);

    if (board) {
      res.status(OK).json(Board.toResponse(board));
    } else {
      res.status(NOT_FOUND).send('Board not found');
    }
  })
);

boardRouter.route('/').post(
  catchError(async (req, res) => {
    const { title, columns } = req.body;
    const board = await boardService.create({ title, columns });

    res.status(OK).json(Board.toResponse(board));
  })
);

boardRouter.route('/:id').put(
  catchError(async (req, res) => {
    const { id } = req.params;
    const { title, columns } = req.body;
    const potentialBoard = await boardService.getById(id);

    if (potentialBoard) {
      const board = await boardService.update({ id, title, columns });

      res.status(OK).json(Board.toResponse(board));
    } else {
      res.status(NOT_FOUND).send('Board not found');
    }
  })
);

boardRouter.route('/:id').delete(
  catchError(async (req, res) => {
    const { id } = req.params;
    const potentialBoard = await boardService.getById(id);

    if (potentialBoard) {
      const isRemoved = await boardService.remove(id);

      if (isRemoved) {
        res.status(OK).send('The board has been deleted');
      }
    } else {
      res.status(NOT_FOUND).send('Board not found');
    }
  })
);

module.exports = boardRouter;
