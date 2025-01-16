const fs = require('fs');
const path = require('path');
import { app } from 'electron';
import { log } from './lib';

// const env = process.env.NODE_ENV.slice(0, 3);

// const logFile = () => path.join(app.getPath('userData'), `log-${env}.log`);

// export function log(message, title = '', level = 'INFO') {
//   const timestamp = new Date().toISOString();
//   const logMessage = `[${timestamp}]\n [${level}] ${message}\n ${title} \n\n`;
//   fs.appendFile(logFile(), logMessage, (err) => {
//     if (err) console.error('Failed to write log:', err);
//   });
// }

export { log };
