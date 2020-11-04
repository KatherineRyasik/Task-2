const mongoose = require('mongoose');
const Joi = require('joi');
const schemas = require('./joi.schemas');
const { NOT_ACCEPTABLE_ERROR, BAD_REQUEST_ERROR } = require('./errors');

const verifyId = (id, entity) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new NOT_ACCEPTABLE_ERROR({
      entity,
      params: { id }
    });
  }
  return id;
};

const isNotObj = value => {
  return (
    value === null ||
    value === undefined ||
    Array.isArray(value) ||
    Object.keys(value).length === 0
  );
};

const isNotArr = value => {
  return (
    value === null ||
    value === undefined ||
    !Array.isArray(value) ||
    value.length !== 1
  );
};

const validate = (entity, value) => {
  try {
    Joi.assert(value, schemas[entity]);
  } catch (err) {
    throw new BAD_REQUEST_ERROR({
      message: JSON.stringify(
        err.details.map(e => {
          const { path, message } = e;
          return { path, message };
        })
      )
    });
  }
};

module.exports = { verifyId, validate, isNotObj, isNotArr };
