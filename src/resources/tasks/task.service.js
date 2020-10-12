const taskDbRepository = require('./task.db.repository');

const getAllByBoardId = boardId => taskDbRepository.getAllByBoardId(boardId);

const create = taskData => taskDbRepository.create(taskData);

const getByBoardIdAndTaskId = (boardId, taskId) =>
  taskDbRepository.getByBoardIdAndTaskId(boardId, taskId);

const update = taskData => taskDbRepository.update(taskData);

const remove = async (boardId, taskId) => {
  const isRemoved = await taskDbRepository.remove(boardId, taskId);

  return isRemoved;
};

module.exports = {
  getAllByBoardId,
  create,
  getByBoardIdAndTaskId,
  update,
  remove
};
