const logger = require('./common/logger');
const dbClient = require('./db/db.client');
const app = require('./app');
const { MONGO_CONNECTION_STRING, PORT } = require('./common/config');

process.on('uncaughtException', error => {
  logger.error(error.message);
  process.exitCode = 1;
});

process.on('unhandledRejection', reason => {
  logger.error(reason.message);
});

dbClient.connect(MONGO_CONNECTION_STRING, () => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
