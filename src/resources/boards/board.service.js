const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const create = newBoard => boardsRepo.create(newBoard);

const put = props => boardsRepo.update(props);

const del = async id => {
  await boardsRepo.del(id);
  await tasksRepo.delByBoradId(id);
};

module.exports = { getAll, get, create, put, del };
