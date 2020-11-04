const tasksRepo = require('./task.memory.repository');

const getAllByBoardId = boardId => tasksRepo.getAllByBoardId(boardId);

const getByBoardId = props => tasksRepo.getByBoardId(props);

const create = newTask => tasksRepo.create(newTask);

const put = props => tasksRepo.update(props);

const del = props => tasksRepo.del(props);

module.exports = {
  getAllByBoardId,
  getByBoardId,
  create,
  put,
  del
};
