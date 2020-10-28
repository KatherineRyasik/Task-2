const Board = require('./board.model');
const Task = require('../tasks/task.model');
const { NOT_FOUND_ERROR, BAD_REQUEST } = require('../../errors/errors');

// const getAll = async () => {
//   const boards = await Board.find({}).catch(() => {
//     throw new BAD_REQUEST('Bad Request');
//   });
//   return boards;
// };

const get = async id => {
  const board = await Board.findById(id).catch(() => {
    throw new NOT_FOUND_ERROR(`The the board with id: ${id} was not found`);
  });
  if (!board) {
    throw new NOT_FOUND_ERROR(`The the board with id: ${id} was not found`);
  }
  return board;
};

const create = async board => {
  const newBoard = await Board.create(board).catch(() => {
    throw new BAD_REQUEST('Bad Request');
  });
  if (!newBoard) throw new BAD_REQUEST('Bad Request');
  return newBoard;
};

const update = async (board, id) => {
  const newBoard = await Board.findOneAndUpdate({ _id: id }, board).catch(
    () => {
      throw new BAD_REQUEST('Bad Request');
    }
  );
  if (!newBoard) throw new BAD_REQUEST('Bad Request');
  return newBoard;
};

const remove = async id => {
  await Task.deleteMany({ boardId: id });

  const board = await Board.findOneAndDelete({ _id: id }).catch(() => {
    throw new NOT_FOUND_ERROR(`The board with id: ${id} was not found`);
  });
  if (!board) {
    throw new NOT_FOUND_ERROR(`The board with id: ${id} was not found`);
  }
  return board;
};

module.exports = { getAll, get, create, update, remove };
