const Task = require('./task.model');

const getAllByBoardId = boardId => Task.find({ boardId });

const create = taskData => Task.create(taskData);

const getByBoardIdAndTaskId = (boardId, _id) => Task.findOne({ boardId, _id });

const update = async taskData => {
  const { boardId, taskId: _id } = taskData;

  await Task.updateOne({ boardId, _id }, taskData);

  return getByBoardIdAndTaskId(boardId, _id);
};

const remove = async (boardId, _id) => {
  return (await Task.deleteOne({ boardId, _id })).ok;
};

const removeAllByBoardId = async boardId => {
  return (await Task.deleteMany({ boardId })).ok;
};

const eraseUserIdAfterRemovingUser = async userId => {
  return (await Task.updateMany({ userId }, { userId: null })).ok;
};

module.exports = {
  getAllByBoardId,
  create,
  getByBoardIdAndTaskId,
  update,
  remove,
  removeAllByBoardId,
  eraseUserIdAfterRemovingUser
};
