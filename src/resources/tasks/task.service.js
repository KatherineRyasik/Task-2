const tasksRepo = require('./task.db.repository');

const getAll = () => tasksRepo.getAll();

const get = (id, boardId) => tasksRepo.get(id, boardId);

const create = task => tasksRepo.create(task);

const update = (task, id, boardId) => tasksRepo.update(task, id, boardId);

const remove = (id, boardId) => tasksRepo.remove(id, boardId);

module.exports = { getAll, get, create, update, remove };
