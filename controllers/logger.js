const { createLogger, transports, format } = require('winston');

// Define the log format
const logFormat = format.combine(
  format.timestamp(),
  format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
  })
);

// Create a logger instance
const logger = createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new transports.Console(), // Log to the console
    new transports.File({ filename: 'error.log', level: 'error' }), // Log errors to a file
    new transports.File({ filename: 'combined.log' }) // Log all messages to a combined file
  ]
});

module.exports = logger;
