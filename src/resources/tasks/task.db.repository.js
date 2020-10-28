const { NOT_FOUND_ERROR, BAD_REQUEST } = require('../../errors/errors');
const Task = require('./task.model');

const getAll = async () => {
  const tasks = await Task.find({}).catch(() => {
    throw new BAD_REQUEST('Bad Request');
  });
  return tasks;
};

const get = async (id, boardId) => {
  const task = await Task.findOne({ _id: id, boardId }).catch(() => {
    throw new NOT_FOUND_ERROR(
      `The task with id: ${id} on the board with id: ${boardId} was not found`
    );
  });
  if (!task) {
    throw new NOT_FOUND_ERROR(
      `The task with id: ${id} on the board with id: ${boardId} was not found`
    );
  }

  return task;
};

const create = async task => {
  const newTask = await Task.create(task).catch(() => {
    throw new BAD_REQUEST('Bad Request');
  });
  if (!newTask) throw new BAD_REQUEST('Bad Request');
  return newTask;
};

const update = async (task, id, boardId) => {
  const newTask = await Task.findOneAndUpdate({ _id: id, boardId }, task).catch(
    () => {
      throw new BAD_REQUEST('Bad Request');
    }
  );
  if (!newTask) throw new BAD_REQUEST('Bad Request');
  return newTask;
};

const remove = async (id, boardId) => {
  const task = await Task.findOneAndDelete({ _id: id, boardId }).catch(() => {
    throw new NOT_FOUND_ERROR(
      `The task with id: ${id} on the board with id: ${boardId} was not found`
    );
  });
  if (!task) {
    throw new NOT_FOUND_ERROR(
      `The task with id: ${id} on the board with id: ${boardId} was not found`
    );
  }
  return task;
};

module.exports = { getAll, get, create, update, remove };
