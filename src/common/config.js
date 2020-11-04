const dotenv = require('dotenv');
const path = require('path');
const appRoot = require('app-root-path');

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  DIR_LOG: `${appRoot}/${process.env.DIR_LOG}`,
  ERROR_LOG: process.env.ERROR_LOG,
  INFO_LOG: process.env.INFO_LOG,
  ENTITY_USER: process.env.ENTITY_USER,
  ENTITY_BOARD: process.env.ENTITY_BOARD,
  ENTITY_TASK: process.env.ENTITY_TASK,
  ENTITY_LOGIN: process.env.ENTITY_LOGIN,
  SOLT_ROUNDS: parseInt(process.env.SOLT_ROUNDS, 10),
  ROUTE_WHITELIST: process.env.ROUTE_WHITELIST.split(',')
};
