class NOT_FOUND_ERROR extends Error {
  constructor(message = 'Not found') {
    super(message);
    this.status = '404';
  }
}

class BAD_REQUEST extends Error {
  constructor(message = 'Bad Request') {
    super(message);
    this.status = '400';
  }
}

module.exports = { NOT_FOUND_ERROR, BAD_REQUEST };
