const Joi = require('joi');

const schemas = {
  user: Joi.object()
    .options({ abortEarly: false, allowUnknown: true })
    .keys({
      name: Joi.string()
        .min(3)
        .max(30)
        .required(),

      password: Joi.string()
        .pattern(
          new RegExp(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_!@#$%^&*])(?=.{8,})'
          )
        )
        .required(),

      login: Joi.string()
        .min(3)
        .max(30)
        .required()
    }),

  board: Joi.object()
    .options({ abortEarly: false, allowUnknown: true })
    .keys({
      title: Joi.string().required(),

      columns: Joi.array().items({
        title: Joi.string().required(),
        order: Joi.number().required()
      })
    }),

  task: Joi.object()
    .options({ abortEarly: false, allowUnknown: true })
    .keys({
      title: Joi.string().required(),

      order: Joi.number().required(),

      description: Joi.string().required()
    })
};

module.exports = schemas;
