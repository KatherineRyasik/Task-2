const Board = require('./board.model');
const { isNotObj } = require('../../utils/validator');
const {
  NOT_FOUND_ERROR,
  UNPROCESSABLE_ENTITY_ERROR
} = require('../../utils/errors');
const { ENTITY_BOARD: ENTITY } = require('../../common/config');

const getAll = async () => Board.find({});

const get = async id => {
  const board = await Board.findById(id);

  if (isNotObj(board)) {
    throw new NOT_FOUND_ERROR({
      entity: ENTITY,
      params: { id }
    });
  }

  return board;
};

const create = async newBoard => Board.create(newBoard);

const update = async ({ id, newBoard }) => {
  const result = await Board.updateOne({ _id: id }, newBoard);

  if (result.nModified === 0) {
    throw new UNPROCESSABLE_ENTITY_ERROR({
      entity: ENTITY,
      params: { id, newBoard }
    });
  }
};

const del = async id => {
  const result = await Board.deleteOne({ _id: id });

  if (result.deletedCount === 0) {
    throw new NOT_FOUND_ERROR({
      entity: ENTITY,
      params: { id }
    });
  }
};

module.exports = { getAll, get, create, update, del };
