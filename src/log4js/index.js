const log4js = require('log4js');
const logger = log4js.getLogger('log4js');
const localconfig = require(`${__dirname}/../utils/configloader.js`);

const logroot = localconfig.logroot || `${__dirname}/../../logs`
logger.debug('<log4js> logroot:', logroot);

log4js.configure({
  appenders: {
    file: {
      type: 'file',
      filename: `${logroot}/app`,
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      compress: true,
      maxLogSize: 10485760,
      backups: 3
    },
    out: {
      type: 'stdout'
    }
  },
  categories: {
    router: {
      appenders: ['file'],
      level: 'debug'
    },
    util: {
      appenders: ['file'],
      level: 'debug'
    },
    log4js: {
      appenders: ['file'],
      level: 'debug'
    },
    default: {
      appenders: ['out'],
      level: 'debug'
    }
  }
 });

module.exports = {
  logger4router: require(`${__dirname}/logger4router.js`),
  logger4util: require(`${__dirname}/logger4util.js`),
  log4js
}
