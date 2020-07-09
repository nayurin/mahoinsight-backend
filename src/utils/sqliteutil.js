const path = require('path');
const Database = require('better-sqlite3');
const localconfig  = require(`${__dirname}/../utils/configloader.js`);
const { logger4util } = require(`${__dirname}/../log4js`);

const dbfile = path.resolve(localconfig.db);
logger4util.debug('<sqliteutil> db:', dbfile);

class db {
  constructor (file) {
    this.db = file ? new Database(file) : new Database(dbfile);
  }

  query (querytext, param = '') {
    try {
      const result = param ? this.db.prepare(querytext).all(param) : this.db.prepare(querytext).all();
      logger4util.trace('<sqliteutil> query:', querytext);
      logger4util.trace('<sqliteutil> param:', param);
      logger4util.trace('<sqliteutil> result:', result);
      return result;
    } catch (e) {
      logger4util.error('<sqliteutil> error:', e);
    }
  }

  static queryFromDatabase (querytext, param = '') {
    try {
      const db = new Database(dbfile);
      const result = param ? db.prepare(querytext).all(param) : db.prepare(querytext).all();
      logger4util.trace('<sqliteutil> query:', querytext);
      logger4util.trace('<sqliteutil> param:', param);
      logger4util.trace('<sqliteutil> result:', result);
      return result;
    } catch (e) {
      logger4util.error('<sqliteutil> error:', e);
    }
  }
}

module.exports = db;
