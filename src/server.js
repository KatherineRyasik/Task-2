const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const mongoose = require('mongoose');
const logger = require('./logger/logger');

const {
  uncaughtExceptionHandler,
  unhandledRejectionHandler,
  errorHandler
} = require('./errors-handler/error.handler');

process.on('uncaughtException', uncaughtExceptionHandler);
process.on('unhandledRejection', unhandledRejectionHandler);

const app = require('./app');

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const db = mongoose.connection;

db.on('error', () => errorHandler(new Error('MongoDB connection error'))).once(
  'open',
  () => {
    logger.serverInfo('Successful connection to MongoDB');
    app.listen(PORT, () =>
      logger.serverInfo(`App is running on http://localhost:${PORT}`)
    );
  }
);
