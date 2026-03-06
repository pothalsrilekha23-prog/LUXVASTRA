import winston from "winston";
import "winston-daily-rotate-file";
import fs from "fs";
import path from "path";

const logDir = "logs";

// Ensure logs folder exists (no behavior change)
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const { combine, timestamp, errors, json } = winston.format;

const transport = new winston.transports.DailyRotateFile({
  filename: "logs/app-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "14d"
});

const errorTransport = new winston.transports.DailyRotateFile({
  filename: "logs/error-%DATE%.log",
  level: "error",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "30d"
});

const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp(),
    errors({ stack: true }),
    json()
  ),
  transports: [transport, errorTransport]
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

export default logger;