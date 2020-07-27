import * as path from 'path'
import * as sqlite from 'better-sqlite3'
import loadConfig from './configloader'
import { Utils } from './utils'

const loaded = loadConfig() ?? {}
const config: Utils.LocalConfig = Object.create(loaded)
const dbfile = path.resolve(config.db)

// logger4util.debug('<sqliteutil> db:', dbfile);

class DB {
  db: sqlite.Database
  constructor (file?: string) {
    this.db = file ? new sqlite(file) : new sqlite(dbfile)
  }

  query (querytext: string, param?: string | string[]) {
    try {
      const result: object[] = param ? this.db.prepare(querytext).all(param) : this.db.prepare(querytext).all()
      // logger4util.trace('<sqliteutil> query:', querytext);
      // logger4util.trace('<sqliteutil> param:', param);
      // logger4util.trace('<sqliteutil> result:', result);
      return result
    } catch (e) {
      // logger4util.error('<sqliteutil> error:', e);
    }
  }

  static queryFromDatabase (querytext: string, param?: string | string[]) {
    try {
      const db: sqlite.Database = new sqlite(dbfile)
      const result: object[] = param ? db.prepare(querytext).all(param) : db.prepare(querytext).all()
      // logger4util.trace('<sqliteutil> query:', querytext);
      // logger4util.trace('<sqliteutil> param:', param);
      // logger4util.trace('<sqliteutil> result:', result);
      return result
    } catch (e) {
      // logger4util.error('<sqliteutil> error:', e);
    }
  }
}

export default DB
