const { Schema, model } = require('mongoose');
const uuid = require('uuid');

const Board = new Schema(
  {
    _id: {
      type: String,
      default: uuid,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    columns: [
      {
        _id: {
          type: String,
          default: uuid,
          required: true
        },
        title: String,
        order: Number
      }
    ]
  },
  { versionKey: false }
);

Board.statics.toResponse = board => {
  const { id, title, columns } = board;

  return { id, title, columns };
};

module.exports = model('Board', Board);
