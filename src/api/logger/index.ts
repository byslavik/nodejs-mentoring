import { createLogger, transports, format, config } from 'winston';

const formatter = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.colorize(),
  format.printf(
    ({ level, timestamp, message }) =>
      `${timestamp} ${level}: ${
        typeof message === 'object' ? JSON.stringify(message) : message
      }`
  )
);

export const logger = createLogger({
  levels: config.syslog.levels,
  transports: [
    new transports.Console({ level: 'info', format: formatter }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: formatter,
    }),
  ],
});
