const mongoose = require('mongoose');
const { Schema } = mongoose;

const boardSchema = new Schema(
  {
    title: String,
    columns: [
      {
        title: String,
        order: Number
      }
    ]
  },
  {
    versionKey: false,
    collection: 'Boards'
  }
);

boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

const Board = mongoose.model('Boards', boardSchema);

module.exports = Board;
