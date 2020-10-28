const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Board = new Schema(
  {
    title: String,
    columns: [{}]
  },
  { collection: 'boards' }
);

Board.statics.toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

module.exports = mongoose.model('boards', Board);
