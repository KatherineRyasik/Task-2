const { finished } = require('stream');
const Url = require('url');
const { streamConsLog, streamErrLog, streamInfoLog } = require('./streams');

const fullUrl = req => {
  return Url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  });
};

const hidePass = body => {
  return body.password !== undefined ? { ...body, password: '*****' } : body;
};

const writeLog = ({ textMessage, jsonMessage, logType }) => {
  switch (logType) {
    case 'info':
      streamInfoLog(`${JSON.stringify(jsonMessage)}\n`);
      break;
    case 'error':
      streamErrLog(`${JSON.stringify(jsonMessage)}\n`);
      break;
    default:
      break;
  }
  if (process.env.NODE_ENV !== 'production') {
    streamConsLog(`${textMessage}\n`);
  }
};

const serverInfo = message => {
  const stampDate = new Date().toLocaleString();
  const textMessage = `Info: ${stampDate} -> ${message}`;

  const jsonMessage = {
    Info: stampDate,
    message
  };

  writeLog({ textMessage, jsonMessage, logType: 'info' });
};

const info = (req, res, next) => {
  const { method, query, body } = req;
  const url = fullUrl(req);
  const startTime = Date.now();

  const permittedBody = hidePass(body);

  // eslint-disable-next-line callback-return
  next();

  finished(res, () => {
    const ms = Date.now() - startTime;
    const { statusCode } = res;
    const stampDate = new Date().toLocaleString();

    const textMessage = `Info: ${stampDate} -> ${method}, ${statusCode} url: ${url}, query: ${JSON.stringify(
      query
    )}, body: ${JSON.stringify(permittedBody)} - [${ms} ms.]`;

    const jsonMessage = {
      Info: stampDate,
      method,
      statusCode,
      url,
      query,
      body: permittedBody,
      ms
    };

    writeLog({ textMessage, jsonMessage, logType: 'info' });
  });
};

const errorHandler = err => {
  const { message = null, stack = null, status = null } = err;
  const stampDate = new Date().toLocaleString();

  const textMessage = `Error: ${stampDate} -> Status: ${status}, Message: ${message},\nStack: ${stack}`;

  const jsonMessage = {
    Error: stampDate,
    status,
    message,
    stack
  };

  writeLog({ textMessage, jsonMessage, logType: 'error' });
};

const errorClientHandler = (err, req) => {
  const { message = null, stack = null, status = null } = err;
  const { method = null } = req;
  const url = req ? fullUrl(req) : null;
  const stampDate = new Date().toLocaleString();

  const textMessage = `Error: ${stampDate} -> Method: ${method}, Status: ${status}, URL: ${url}, Message: ${message},\nStack: ${stack}`;

  const jsonMessage = {
    Error: stampDate,
    method,
    status,
    url,
    message,
    stack
  };

  writeLog({ textMessage, jsonMessage, logType: 'error' });
};

const logger = {
  info,
  serverInfo,
  errorHandler,
  errorClientHandler
};

module.exports = logger;
