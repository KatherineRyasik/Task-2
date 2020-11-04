const {
  BAD_REQUEST, // 400
  UNAUTHORIZED, // 401
  FORBIDDEN, // 403
  NOT_FOUND, // 404
  INTERNAL_SERVER_ERROR, // 500
  UNPROCESSABLE_ENTITY, // 422
  NOT_ACCEPTABLE, // 406
  getStatusText,
  StatusCodes
} = require('http-status-codes');

class HttpError extends Error {}

class Unauthorized extends HttpError {
  constructor({ entity, message, params }) {
    super(
      message ||
        `Unauthorized "${entity}" with params: ${JSON.stringify(params)}`
    );
    this.status = UNAUTHORIZED;
  }
}

class Forbidden extends HttpError {
  constructor({ entity, message, params }) {
    super(
      message ||
        `Forbidden! Wrong login/password "${entity}" with ${JSON.stringify(
          params
        )}`
    );
    this.status = FORBIDDEN;
  }
}

class UnprocessableEntity extends HttpError {
  constructor({ entity, message, params }) {
    super(
      message ||
        `Unprocessable entity "${entity}" with params: ${JSON.stringify(
          params
        )}`
    );
    this.status = UNPROCESSABLE_ENTITY;
  }
}

class NotAcceptable extends HttpError {
  constructor({ entity, message, params }) {
    super(
      message ||
        `Not acceptable "${entity}" with params: ${JSON.stringify(params)}`
    );
    this.status = NOT_ACCEPTABLE;
  }
}

class BadRequest extends HttpError {
  constructor({ entity, message, params }) {
    super(
      message ||
        `Bad request "${entity}" with params: ${JSON.stringify(params)}`
    );
    this.status = BAD_REQUEST;
  }
}

class NotFoundError extends HttpError {
  constructor({ entity, params, message }) {
    super(
      message || `Couldn't find a(an) ${entity} with: ${JSON.stringify(params)}`
    );
    this.status = NOT_FOUND;
  }
}

class InternalServerError extends Error {
  constructor({ entity, params, message }) {
    super(
      message ||
        `Internal Server Error ${entity} with: ${JSON.stringify(params)}`
    );
    this.status = INTERNAL_SERVER_ERROR;
  }
}

module.exports = {
  BAD_REQUEST_ERROR: BadRequest,
  CUSTOM_SERVER_ERROR: InternalServerError,
  NOT_FOUND_ERROR: NotFoundError,
  UNPROCESSABLE_ENTITY_ERROR: UnprocessableEntity,
  FORBIDDEN_ERROR: Forbidden,
  UNAUTHORIZED_ERROR: Unauthorized,
  NOT_ACCEPTABLE_ERROR: NotAcceptable,
  HttpError,
  getStatusText,
  StatusCodes,
  INTERNAL_SERVER_ERROR
};
