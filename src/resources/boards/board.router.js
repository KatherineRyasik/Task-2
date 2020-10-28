const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const asyncErrorHandler = require('../../errors/asyncErrorHandler');

router.route('/').get(
  asyncErrorHandler(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
  })
);

router.route('/:id').get(
  asyncErrorHandler(async (req, res) => {
    const board = await boardsService.get(req.params.id);
    res.json(Board.toResponse(board));
  })
);

router.route('/').post(
  asyncErrorHandler(async (req, res) => {
    const board = await boardsService.create(
      new Board({
        title: req.body.title,
        columns: req.body.columns
      })
    );

    res.json(Board.toResponse(board));
  })
);

// router.route('/:id').put(
//   asyncErrorHandler(async (req, res) => {
//     const board = await boardsService.update(
//       {
//         title: req.body.title,
//         columns: req.body.columns
//       },
//       req.params.id
//     );
//
//     res.json(Board.toResponse(board));
//   })
// );

router.route('/:id').delete(
  asyncErrorHandler(async (req, res) => {
    await boardsService.remove(req.params.id);
    res.sendStatus(204);
  })
);

module.exports = router;
