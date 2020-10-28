const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const cors = require('cors');
const helmet = require('helmet');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const errorHandler = require('./errors/errorHandler');

const morgan = require('morgan');
const { logger, morganFormat } = require('./utils/logger');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(morgan(morganFormat, { stream: logger.stream }));

app.use('/users', userRouter);

app.use('/boards', boardRouter);

boardRouter.use('/:boardId/tasks', taskRouter);

app.use(errorHandler);

process.on('uncaughtException', err => {
  logger.error(
    `${err.message}${
      err.stack ? `\n${err.stack.split('\n').slice(1, 2)}` : ''
    }\n`
  );
});

process.on('unhandledRejection', err => {
  logger.error(
    `${err.message}${
      err.stack ? `\n${err.stack.split('\n').slice(1, 2)}` : ''
    }\n`
  );
});

module.exports = app;
