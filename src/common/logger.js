const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.cli())
    }),
    new transports.File({
      filename: './logs/error.log',
      level: 'error'
    }),
    new transports.File({
      filename: './logs/info.log',
      level: 'info'
    })
  ]
});

module.exports = logger;
