const queryData = require(__dirname + '/sqliteutil.js');

class Quest {
  constructor (id) {
    this.id = parseInt(id);
  }

  static getQuestArea() {
    return queryData.queryFromDatabase("select * from quest_area_data")
  }

  _getQuestInfo() {
    this.quest_info = queryData.queryFromDatabase("select area_id,quest_id,quest_name,daily_limit,limit_time,limit_team_level,love,stamina,team_exp,unit_exp,wave_group_id_1,wave_group_id_2,wave_group_id_3 from quest_data where quest_id=?", this.id)[0];
  }

  static _getQuestLootList(quest_info) {
    let wave_group_id = new Array();
    let drop_reward_id = new Array();
    let drop_reward_id_final = new Array();
    wave_group_id.push(quest_info.wave_group_id_1, quest_info.wave_group_id_2, quest_info.wave_group_id_3);
    wave_group_id.forEach((item) => {
      let wave_group_data = queryData.queryFromDatabase("select * from wave_group_data where wave_group_id=?", item);
      if (wave_group_data[0].odds != 100) {
        throw new Error('odds is not 100');
      } else {
        drop_reward_id.push(wave_group_data[0].drop_reward_id_1, wave_group_data[0].drop_reward_id_2, wave_group_data[0].drop_reward_id_3, wave_group_data[0].drop_reward_id_4, wave_group_data[0].drop_reward_id_5);
      }
    })
    drop_reward_id.forEach((item) => {
      if (item != 0) {
        drop_reward_id_final.push(item);
      }
    })
    return drop_reward_id_final;
  }

  getQuestEnemyDetail () {
    let enemy_info = {
      wave_1: {},
      wave_2: {},
      wave_3: {}
    }
    let enemy_id = 0, enemy_unitid = 0;
    for (let i = 1; i <= 3; i++) {
      enemy_info[`wave_${i}`] = queryData.queryFromDatabase("select enemy_id_1,enemy_id_2,enemy_id_3,enemy_id_4,enemy_id_5 from wave_group_data where wave_group_id=?", eval(`this.quest_info.wave_group_id_${i}`))[0];
      for (let j = 1; j <= 5; j++) {
        enemy_id = eval(`enemy_info["wave_${i}"]["enemy_id_${j}"]`)
        enemy_unitid = enemy_id ? queryData.queryFromDatabase("select unit_id from enemy_parameter where enemy_id=?", enemy_id)[0].unit_id : null;
        let row = enemy_id && enemy_unitid ? queryData.queryFromDatabase("select * from enemy_parameter inner join unit_enemy_data where enemy_parameter.enemy_id=? and enemy_parameter.unit_id=? and unit_enemy_data.unit_id=?", [enemy_id, enemy_unitid, enemy_unitid])[0] : null;
        if (!row) {
          delete enemy_info[`wave_${i}`][`enemy_id_${j}`];
          continue
        }
        let resists = new Array();
        for (let i = 1; i <= 20; i++) {
          resists.push(queryData.queryFromDatabase(`select ailment_${i} from resist_data where resist_status_id=?`, row.resist_status_id)[0][`ailment_${i}`]);
        }
        enemy_info[`wave_${i}`][`enemy_id_${j}`] = {
          enemy_id: row.enemy_id,
          unit_id: row.unit_id,
          name: row.name,
          level: row.level,
          hp: row.hp,
          atk: row.atk,
          magic_str: row.magic_str,
          def: row.def,
          magic_def: row.magic_def,
          physical_critical: row.physical_critical,
          magic_critical: row.magic_critical,
          dodge: row.dodge,
          physical_penetrate: row.physical_penetrate,
          magic_penetrate: row.magic_penetrate,
          life_steal: row.life_steal,
          hp_recovery_rate: row.hp_recovery_rate,
          energy_recovery_rate: row.energy_recovery_rate,
          energy_reduce_rate: row.energy_reduce_rate,
          resist_status: resists,
          accuracy: row.accuracy,
          move_speed: row.move_speed,
          search_area_width: row.search_area_width,
          normal_atk_cast_time: row.normal_atk_cast_time,
          atk_type: row.atk_type,
          comment: row.comment
        }
      }
    }
    this.enemy_info = enemy_info;
  }

  getQuestLootDetail() {
    this.reward_info = new Array();
    this._getQuestInfo();
    if (Object.keys(this.quest_info).length !== 0) {
      Quest._getQuestLootList(this.quest_info).map(item => {
        this.reward_info.push(queryData.queryFromDatabase("select * from enemy_reward_data where drop_reward_id = ?", item)[0]);
      });
    }
  }

  static getQuestList() {
    const list = {
      normal: new Array(),
      hard: new Array(),
      other: new Array(),
    }
    for (let item of queryData.queryFromDatabase("select quest_id from quest_data where quest_id like '11%'").values()){list.normal.push(item.quest_id);}
    for (let item of queryData.queryFromDatabase("select quest_id from quest_data where quest_id like '12%'").values()){list.hard.push(item.quest_id);}
    for (let item of queryData.queryFromDatabase("select quest_id from quest_data where quest_id not like '11%' and quest_id not like '12%'").values()){list.other.push(item.quest_id);}
    return list;
  }
}

module.exports = Quest;
