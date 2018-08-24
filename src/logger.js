const { createLogger, format, transports } = require('winston');
const chalk = require('chalk');

const { combine, timestamp, printf } = format;

const myFormat = printf((info) => {
  let l;
  if (info.level === 'error') {
    l = chalk.red(info.level.toUpperCase());
  } else {
    l = chalk.blue(info.level.toUpperCase());
  }
  return `${chalk.green(info.timestamp)} ${l}: ${info.message}`;
});

const logger = createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: './logs/error.log', level: 'error' }),
    new transports.File({ filename: './logs/combined.log' })
  ]
});

module.exports = logger;
