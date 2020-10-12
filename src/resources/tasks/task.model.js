const { Schema, model } = require('mongoose');
const uuid = require('uuid');

const Task = new Schema(
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
    order: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    userId: String,
    boardId: String,
    columnId: String
  },
  { versionKey: false }
);

Task.statics.toResponse = task => {
  const { id, title, order, description, userId, boardId, columnId } = task;

  return { id, title, order, description, userId, boardId, columnId };
};

module.exports = model('Task', Task);
