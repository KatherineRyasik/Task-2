const winston = require('winston');

const ansiRegexp = /\x1b\[[0-9]{0,2}m/g;

const winstonFormat = winston.format.printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message.replace(
    ansiRegexp,
    ''
  )}${info.splat !== undefined ? `${info.splat}` : ' '}`;
});

const winstonFormatConsole = winston.format.printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}${
    info.splat !== undefined ? `${info.splat}` : ' '
  }`;
});

const logger = winston.createLogger({
  format: winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  exitOnError: true,
  transports: [
    new winston.transports.File({
      filename: './src/logs/errors.log',
      level: 'error',
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      format: winston.format.combine(winstonFormat)
    }),
    new winston.transports.File({
      level: 'info',
      filename: './src/logs/combined.log',
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      format: winston.format.combine(winstonFormat)
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winstonFormatConsole
      )
    })
  ]
});

logger.stream = {
  write(message) {
    logger.info(message);
  }
};

const statusColor = (req, res, status) => {
  let color;
  if (status >= 500) {
    color = 31; // red
  } else if (status >= 400) {
    color = 33; // yellow
  } else if (status >= 300) {
    color = 36; // cyan
  } else if (status >= 200) {
    color = 32; // green
  } else {
    color = 0;
  }

  return status && color ? `\x1b[${color}m${status}\x1b[0m` : '';
};

const morganFormat = (tokens, req, res) => {
  delete req.body.password;
  return [
    tokens.method(req, res),
    `${req.protocol}://${req.get('host')}${req.originalUrl}`,
    statusColor(req, res, tokens.status(req, res)),
    'query =',
    JSON.stringify(req.query),
    'body =',
    JSON.stringify(req.body),
    '-',
    tokens['response-time'](req, res),
    'ms'
  ].join(' ');
};

module.exports = { logger, morganFormat };
