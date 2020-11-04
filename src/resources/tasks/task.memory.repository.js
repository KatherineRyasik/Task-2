const Task = require('./task.model');
const { isNotArr } = require('../../utils/validator');
const {
  NOT_FOUND_ERROR,
  UNPROCESSABLE_ENTITY_ERROR
} = require('../../utils/errors');
const { ENTITY_TASK: ENTITY } = require('../../common/config');

const getAllByBoardId = async boardId => Task.find({ boardId });

const getByBoardId = async ({ id, boardId }) => {
  const task = await Task.find({ _id: id, boardId });

  if (isNotArr(task)) {
    throw new NOT_FOUND_ERROR({
      entity: ENTITY,
      params: { id, boardId }
    });
  }

  return task;
};

const create = async newTask => Task.create(newTask);

const update = async ({ id, boardId, newTask }) => {
  const result = await Task.updateOne({ _id: id, boardId }, newTask);

  if (result.nModified === 0) {
    throw new UNPROCESSABLE_ENTITY_ERROR({
      entity: ENTITY,
      params: { id, boardId, newTask }
    });
  }
};

const del = async ({ id, boardId }) => {
  const result = await Task.deleteOne({ _id: id, boardId });

  if (result.deletedCount === 0) {
    throw new NOT_FOUND_ERROR({
      entity: ENTITY,
      params: { id, boardId }
    });
  }
};

const delByBoradId = async boardId => Task.deleteMany({ boardId });

const resetUserId = async userId =>
  Task.updateMany({ userId }, { userId: null });

module.exports = {
  getAllByBoardId,
  getByBoardId,
  create,
  update,
  del,
  delByBoradId,
  resetUserId
};
