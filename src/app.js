const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const requestsLogger = require('./middlewares/requestsLogger');
const authorizationChecker = require('./middlewares/authorizationChecker');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const authorizationRouter = require('./resources/authorization/authorization.router');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(requestsLogger);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') return res.send('Service is running!');

  next();
});
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/users', authorizationChecker, userRouter);
app.use('/boards', authorizationChecker, boardRouter);
app.use('/boards', authorizationChecker, taskRouter);
app.use('/', authorizationRouter);

app.use(errorHandler);

module.exports = app;
