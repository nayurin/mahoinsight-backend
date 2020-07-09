const Item = require(__dirname + '/global/getItemInfo.js');
const Princess = require(__dirname + '/global/getPrincessInfo.js');
const Quest = require(__dirname + '/global/getQuestInfo.js');
const ClanBattle = require(__dirname + '/global/getClanBattleInfo.js');
const sqlite = require(__dirname + '/sqliteutil.js');

class Getter {
  constructor({ type, id = 0, db }) {
    this.type = type;
    this.id = id;
    this.db = db || new sqlite();
  }

  _getChara(id) {
    let p = new Princess(id, this.db);
    if (id === 0) {
      return p.list();
    } else {
      p.connect();
      return p;
    }
  }

  _getCharaAll() {
    let obj = new Object();
    const p = new Princess(0, this.db);
    p.list().forEach(chara => {
      obj[this._getChara(chara).status.unit_name] = this._getChara(chara);
    });
    return obj;
  }

  _getItem(id) {
    let i = new Item(id, this.db);
    if (id === 0) {
      return i.list();
    } else {
      i.analyze();
      return i;
    }
  }

  _getItemAll() {
    let obj = new Object();
    const i = new Item(0, this.db);
    i.list().forEach(item => {
      obj[item] = this._getItem(item);
    });
    return obj;
  }

  _getQuest(id) {
    const q = new Quest(id, this.db);
    if (id === 0) {
      return q.getQuestList();
    } else {
      q.getQuestLootDetail();
      q.getQuestEnemyDetail();
      return q;
    }
  }

  _getQuestAll() {
    let q = new Quest(0, this.db);
    const quest = q.getQuestList(), obj = {
      normal: new Object(),
      hard: new Object(),
      other: new Object(),
      area: q.getQuestArea()
    };
    // let r = new Object();
    quest.normal.map(quest => {
      q = new Quest(quest, this.db);
      q.getQuestLootDetail();
      q.getQuestEnemyDetail();
      obj.normal[quest] = q;
    });
    quest.hard.map(quest => {
      q = new Quest(quest, this.db);
      q.getQuestLootDetail();
      q.getQuestEnemyDetail();
      obj.hard[quest] = q;
    });
    quest.other.map(quest => {
      q = new Quest(quest, this.db);
      q.getQuestLootDetail();
      q.getQuestEnemyDetail();
      obj.other[quest] = q;
    });
    return obj;
  }

  _getClanBattle (id) {
    const c = new ClanBattle(id, this.db);
    if (id === 0) {
      return ClanBattle.list();
    } else {
      c.prepare();
      return c;
    }
  }

  _getClanBattleAll () {
    const obj = new Object();
    const c = new ClanBattle(0, this.db);
    c.list().forEach(eventid => {
      obj[eventid] = this._getClanBattle(eventid);
    })
    return obj;
  }

  _get() {
    switch (this.type) {
      case 'chara':
        return this._getChara(this.id);
      case 'item':
        return this._getItem(this.id);
      case 'quest':
        return this._getQuest(this.id);
      default:
        throw new Error('incorrect type');
    }
  }

  get(key = '') {
    let r = this._get();
    if (!r || r == -1) {
      return -1;
    }
    return r.hasOwnProperty(key) ? this._get()[key] : this._get();
  }
}

module.exports = Getter;
