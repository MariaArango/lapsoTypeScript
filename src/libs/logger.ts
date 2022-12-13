import * as winston from 'winston';

const { combine, timestamp, json } = winston.format;
const errorFilter = winston.format((info: winston.Logform.TransformableInfo) =>
info.level === 'error' ? info : false
);
const warnFilter = winston.format((info: winston.Logform.TransformableInfo) =>
info.level === 'warn' ? info : false
);
const infoFilter = winston.format((info: winston.Logform.TransformableInfo) =>
info.level === 'info' ? info : false
);
const logger = winston.createLogger({
level: process.env.LOG_LEVEL || 'info',
format: combine(timestamp(), json()),
transports: [
new winston.transports.File({
filename: 'logs/combined.log',
}),
new winston.transports.File({
filename: 'logs/error.log',
level: 'error',
format: combine(errorFilter(), timestamp(), json()),
}),
new winston.transports.File({
filename: 'logs/warn.log',
level: 'warn',
format: combine(warnFilter(), timestamp(), json()),
}),
new winston.transports.File({
filename: 'logs/info.log',
level: 'info',
format: combine(infoFilter(), timestamp(), json()),
}),
],
});
export default logger;