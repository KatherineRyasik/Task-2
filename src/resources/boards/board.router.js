const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');
const asyncErrHandler = require('../../utils/async.handler');
const { verifyId, validate } = require('../../utils/validator');
const { ENTITY_BOARD: ENTITY } = require('../../common/config');

router.route('/').get(
  asyncErrHandler(async (req, res) => {
    const borads = await boardService.getAll();

    res.json(borads.map(Board.toResponse));
  })
);

router.route('/:id').get(
  asyncErrHandler(async (req, res) => {
    const id = verifyId(req.params.id, ENTITY);
    const board = await boardService.get(id);

    res.json(Board.toResponse(board));
  })
);

router.route('/').post(
  asyncErrHandler(async (req, res) => {
    validate(ENTITY, req.body);
    const board = await boardService.create(req.body);

    res.json(Board.toResponse(board));
  })
);

router.route('/:id').put(
  asyncErrHandler(async (req, res) => {
    const id = verifyId(req.params.id, ENTITY);
    const newBoard = req.body;

    validate(ENTITY, newBoard);

    await boardService.put({ id, newBoard });
    const board = await boardService.get(id);

    res.json(Board.toResponse(board));
  })
);

router.route('/:id').delete(
  asyncErrHandler(async (req, res) => {
    const id = verifyId(req.params.id, ENTITY);
    await boardService.del(id);

    res.status(204).send('The board has been deleted');
  })
);

module.exports = router;
