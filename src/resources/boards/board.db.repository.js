const Board = require('./board.model');

const getAll = () => Board.find({});

const getById = id => Board.findById(id);

const create = boardData => Board.create(boardData);

const update = async boardData => {
  const { id: _id } = boardData;

  await Board.updateOne({ _id }, boardData);

  return Board.findById(_id);
};

const remove = async _id => {
  return (await Board.deleteOne({ _id })).ok;
};

module.exports = { getAll, getById, create, update, remove };
