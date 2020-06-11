const path = require('path');
const Database = require('better-sqlite3');
const loadconfig = require(`${__dirname}/loadconfig.js`);

let queryFromDatabase = function queryFromDatabase(query, param = '') {
  const dbfile = path.resolve(loadconfig.load(`${__dirname}/../../.local_config.json`).config.db);
  const db = new Database(dbfile);
  if (param == '') {
    return db.prepare(query).all();
  } else {
    return db.prepare(query).all(param);
  }
}

module.exports.queryFromDatabase = queryFromDatabase;
