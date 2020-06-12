const path = require('path');
const Database = require('better-sqlite3');
const localconfig  = require(`${__dirname}/../utils/configloader.js`);
const { logger4util } = require(`${__dirname}/../log4js`);

const dbfile = path.resolve(localconfig.db);
logger4util.debug('<sqliteutil> db:', dbfile);

let queryFromDatabase = function queryFromDatabase(query, param = '') {
  try {
    const db = new Database(dbfile);
    const result = param === '' ? db.prepare(query).all() : db.prepare(query).all(param);
    logger4util.trace('<sqliteutil> query:', query);
    logger4util.trace('<sqliteutil> param:', param);
    logger4util.trace('<sqliteutil> result:', result);
    return result;
  } catch (e) {
    logger4util.error('<sqliteutil> error:', e);
  }
}

module.exports.queryFromDatabase = queryFromDatabase;
