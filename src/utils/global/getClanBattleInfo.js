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
    const skillset = [
      'main_skill_1',
      'main_skill_2',
      'main_skill_3',
      'main_skill_4',
      'main_skill_5',
      'main_skill_6',
      'main_skill_7',
      'main_skill_8',
      'main_skill_9',
      'main_skill_10',
      'main_skill_evolution_1',
      'main_skill_evolution_2',
      'ex_skill_1',
      'ex_skill_2',
      'ex_skill_3',
      'ex_skill_4',
      'ex_skill_5',
      'ex_skill_evolution_1',
      'ex_skill_evolution_2',
      'ex_skill_evolution_3',
      'ex_skill_evolution_4',
      'ex_skill_evolution_5',
      'sp_skill_1',
      'sp_skill_2',
      'sp_skill_3',
      'sp_skill_4',
      'sp_skill_5',
      'union_burst',
      'union_burst_evolution'
    ]

    for (const phase of this.mapdata) {
      phase.clan_battle_boss_group = queryData.queryFromDatabase(
        "select order_num, wave_group_id, score_coefficient from clan_battle_boss_group where clan_battle_boss_group_id=?",
        phase.clan_battle_boss_group_id
      );
      for (const item of phase.clan_battle_boss_group) {
        item.enemy = new Array();
        const enemies = queryData.queryFromDatabase("select enemy_id_1,enemy_id_2,enemy_id_3,enemy_id_4,enemy_id_5 from wave_group_data where wave_group_id=?", item.wave_group_id)[0];
        for (const enemyid of Object.keys(enemies)) {
          if (!enemies[enemyid]) continue
          const enemy = queryData.queryFromDatabase("select unit_id, resist_status_id from enemy_parameter where enemy_id=?", enemies[enemyid])[0];
          enemy.enemy_id = enemies[enemyid];
          enemy.detail = {};
          if (enemy.enemy_id && enemy.unit_id) {
            enemy.detail.attackpattern = queryData.queryFromDatabase("select * from unit_attack_pattern where unit_id=?", enemy.unit_id);
            enemy.detail.parameter = queryData.queryFromDatabase("\
              SELECT unit_skill_data.*, enemy_parameter.*, unit_enemy_data.* \
              FROM enemy_parameter\
              INNER JOIN unit_skill_data ON enemy_parameter.unit_id=unit_skill_data.unit_id\
              INNER JOIN unit_enemy_data ON enemy_parameter.unit_id=unit_enemy_data.unit_id\
              WHERE enemy_parameter.enemy_id = ? ",
              enemy.enemy_id
            )[0];
            enemy.detail.resistance = queryData.queryFromDatabase("select * from resist_data where resist_status_id=?", enemy.resist_status_id)[0];
          }
          for (const skill of skillset) {
            if (enemy.detail.parameter[skill] !== 0) {
              enemy.detail.parameter[skill] = queryData.queryFromDatabase("select * from skill_data where skill_id=?", enemy.detail.parameter[skill])[0];
              for (let i = 1; i <= 7; i++) {
                if (enemy.detail.parameter[skill][`action_${i}`]) {
                  enemy.detail.parameter[skill][`action_${i}`] = queryData.queryFromDatabase("select * from skill_action where action_id=?", enemy.detail.parameter[skill][`action_${i}`])[0];
                }
                if (enemy.detail.parameter[skill][`depend_action_${i}`]) {
                  enemy.detail.parameter[skill][`depend_action_${i}`] = queryData.queryFromDatabase("select * from skill_action where action_id=?", enemy.detail.parameter[skill][`depend_action_${i}`])[0];
                }
              }
            }
          }
          item.enemy.push(enemy.detail);
        }
      }
      delete phase.clan_battle_boss_group_id
    }
  }

  _getClanBattlePeriodRewards () {
    this.period = new Object();
    this.period.schedule = queryData.queryFromDatabase(
      "select period_detail, start_time, end_time from clan_battle_period where clan_battle_id=?",
      this.id
    )[0];
    this.period.reward = queryData.queryFromDatabase(
      "select rank_from, rank_to, reward_id_1, reward_num_1, reward_id_2, reward_num_2, reward_id_3, reward_num_3 from clan_battle_period_rank_reward where clan_battle_id=?",
      this.id
    );
  }

  static list () {
    const list = queryData.queryFromDatabase("select clan_battle_id from clan_battle_map_data group by clan_battle_id");
    return list.map(x => {return x.clan_battle_id})
  }

  prepare () {
    this._getClanBattleMapInfo();
    this._getClanBattleBossDetail();
    this._getClanBattlePeriodRewards();
  }
}

module.exports = ClanBattle;
