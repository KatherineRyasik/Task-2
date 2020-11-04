const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: 'Board'
    },
    columnId: String
  },
  {
    versionKey: false,
    collection: 'Tasks'
  }
);

taskSchema.statics.toResponse = task => {
  const { id, title, order, description, userId, boardId, columnId } = task;
  return { id, title, order, description, userId, boardId, columnId };
};

const Task = mongoose.model('Tasks', taskSchema);

module.exports = Task;
