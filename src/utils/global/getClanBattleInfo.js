const queryData = require(__dirname + '/../sqliteutil.js');

class ClanBattle {
  constructor (id) {
    this.id = parseInt(id);
  }

  _getClanBattleMapInfo () {
    this.mapdata = queryData.queryFromDatabase(
      "select difficulty, lap_num_from, lap_num_to, clan_battle_boss_group_id, aura_effect, rsl_unlock_lap, phase from clan_battle_map_data where clan_battle_id=?",
      this.id
    );
  }

  _getClanBattleBossDetail () {
    for (const phase of this.mapdata) {
      phase.clan_battle_boss_group = queryData.queryFromDatabase(
        "select clan_battle_boss_group_id, order_num, wave_group_id, score_coefficient from clan_battle_boss_group where clan_battle_boss_group_id=?",
        phase.clan_battle_boss_group_id
      );
      for (const item of phase.clan_battle_boss_group) {
        item.enemy = new Array();
        const enemies = queryData.queryFromDatabase("select enemy_id_1,enemy_id_2,enemy_id_3,enemy_id_4,enemy_id_5 from wave_group_data where wave_group_id=?", item.wave_group_id)[0];
        for (const enemyid of Object.keys(enemies)) {
          const enemy_unitid = enemies[enemyid] ? queryData.queryFromDatabase("select unit_id from enemy_parameter where enemy_id=?", enemies[enemyid])[0].unit_id : null;
          const row = enemies[enemyid] && enemy_unitid ? queryData.queryFromDatabase("select * from enemy_parameter inner join unit_enemy_data where enemy_parameter.enemy_id=? and enemy_parameter.unit_id=? and unit_enemy_data.unit_id=?", [enemies[enemyid], enemy_unitid, enemy_unitid])[0] : null;
          if (row) item.enemy.push(row)
        }
      }
    }
  }

  static list () {
    const list = queryData.queryFromDatabase("select clan_battle_id from clan_battle_map_data group by clan_battle_id");
    return list.map(x => {return x.clan_battle_id})
  }

  prepare () {
    this._getClanBattleMapInfo();
    this._getClanBattleBossDetail();
  }
}

module.exports = ClanBattle;
