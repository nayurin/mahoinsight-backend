const Database = require('better-sqlite3');
const loadconfig = require(`${__dirname}/loadconfig.js`);
const dbpath = loadconfig.load(`${__dirname}/../../.local_config.json`).config.dbpath;

let queryFromDatabase = function queryFromDatabase(query, param = '') {
  let db = new Database(dbpath);
  if (param == '') {
    return db.prepare(query).all();
  } else {
    return db.prepare(query).all(param);
  }
}

module.exports.queryFromDatabase = queryFromDatabase;
