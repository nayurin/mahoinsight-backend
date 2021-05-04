import SQLiteDatabase from './sqliteutil'
import { Utils } from './utils'
import * as path from 'path'

class loadDatabase {
  db: SQLiteDatabase
  dbfile: string
  constructor (dbfile: string) {
    this.dbfile = dbfile
    this.db = new SQLiteDatabase(dbfile)
  }
  
  /* DEPRECATED 

  fromClanBattleMapData (): Utils.TableData<Utils.ClanBattleMapData> {
    let data = {}
    const querytext = `
      SELECT id, clan_battle_id, difficulty, lap_num_from, lap_num_to, clan_battle_boss_group_id, aura_effect, rsl_unlock_lap, phase
      FROM clan_battle_map_data
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.ClanBattleMapData
      const itemdata = {
        [item.id]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  fromClanBattleBossGroup (): Utils.TableData<Utils.ClanBattleBossGroup> {
    let data = {}
    const querytext = `
      SELECT clan_battle_boss_group_id, order_num, wave_group_id, score_coefficient
      FROM clan_battle_boss_group
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.ClanBattleBossGroup
      const itemdata = {
        [`${item.clan_battle_boss_group_id}#${item.order_num}`]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  */

  fromClanBattle2MapData (): Utils.TableData<Utils.ClanBattle2MapData> {
    let data = {}
    const querytext = `
      SELECT 
        id, clan_battle_id, difficulty, lap_num_from, lap_num_to,
        wave_group_id_1, wave_group_id_2, wave_group_id_3, wave_group_id_4, wave_group_id_5,
        score_coefficient_1, score_coefficient_2, score_coefficient_3, score_coefficient_4, score_coefficient_5,
        aura_effect, rsl_unlock_lap, phase
      FROM clan_battle_2_map_data
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.ClanBattle2MapData
      const itemdata = {
        [item.id]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  fromClanBattlePeriod (): Utils.TableData<Utils.ClanBattlePeriod> {
    let data = {}
    const querytext = `
      SELECT clan_battle_id, period, period_detail, start_time, end_time
      FROM clan_battle_period
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.ClanBattlePeriod
      const itemdata = {
        [`${item.clan_battle_id}#${item.period}`]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  fromClanBattlePeriodRankReward (): Utils.TableData<Utils.ClanBattlePeriodRankReward> {
    let data = {}
    const querytext = `
      SELECT id, clan_battle_id, rank_from, rank_to, reward_id_1, reward_num_1, reward_id_2, reward_num_2, reward_id_3, reward_num_3
      FROM clan_battle_period_rank_reward
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.ClanBattlePeriodRankReward
      const itemdata = {
        [item.id]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  fromWaveGroupData (): Utils.TableData<Utils.WaveGroupData> {
    let data = {}
    const querytext = `
      SELECT
        id, wave_group_id, odds,
        enemy_id_1, drop_gold_1, drop_reward_id_1,
        enemy_id_2, drop_gold_2, drop_reward_id_2,
        enemy_id_3, drop_gold_3, drop_reward_id_3,
        enemy_id_4, drop_gold_4, drop_reward_id_4,
        enemy_id_5, drop_gold_5, drop_reward_id_5
      FROM wave_group_data
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.WaveGroupData
      const itemdata = {
        [item.id]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  fromEnemyParameter (): Utils.TableData<Utils.EnemyParameter> {
    let data = {}
    const querytext = `
      SELECT
        enemy_id, unit_id, name, level, rarity,
        hp, atk, magic_str, def, magic_def,
        physical_critical, magic_critical, wave_hp_recovery,
        wave_energy_recovery, dodge, physical_penetrate,
        magic_penetrate, life_steal, hp_recovery_rate,
        energy_recovery_rate, energy_reduce_rate, union_burst_level,
        main_skill_lv_1, main_skill_lv_2, main_skill_lv_3, 
        main_skill_lv_4, main_skill_lv_5, main_skill_lv_6, 
        main_skill_lv_7, main_skill_lv_8, main_skill_lv_9, main_skill_lv_10,
        ex_skill_lv_1, ex_skill_lv_2, ex_skill_lv_3, ex_skill_lv_4, ex_skill_lv_5,
        resist_status_id, accuracy
      FROM enemy_parameter
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.EnemyParameter
      const itemdata = {
        [item.enemy_id]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  fromUnitEnemyData (): Utils.TableData<Utils.UnitEnemyData> {
    let data = {}
    const querytext = `
      SELECT unit_id, unit_name, move_speed, search_area_width, atk_type, normal_atk_cast_time, comment
      FROM unit_enemy_data
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.UnitEnemyData
      const itemdata = {
        [item.unit_id]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  fromEnemyRewardData (): Utils.TableData<Utils.EnemyRewardData> {
    let data = {}
    const querytext = `
      SELECT
        drop_reward_id, drop_count,
        reward_type_1, reward_id_1, reward_num_1, odds_1,
        reward_type_2, reward_id_2, reward_num_2, odds_2,
        reward_type_3, reward_id_3, reward_num_3, odds_3,
        reward_type_4, reward_id_4, reward_num_4, odds_4,
        reward_type_5, reward_id_5, reward_num_5, odds_5
      FROM enemy_reward_data
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.EnemyRewardData
      const itemdata = {
        [item.drop_reward_id]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  fromResistData (): Utils.TableData<Utils.ResistData> {
    let data = {}
    const querytext = `
      SELECT
        resist_status_id, ailment_1, ailment_2, ailment_3, ailment_4,
        ailment_5, ailment_6, ailment_7, ailment_8, ailment_9,
        ailment_10, ailment_11, ailment_12, ailment_13, ailment_14,
        ailment_15, ailment_16, ailment_17, ailment_18, ailment_19, ailment_20
      FROM resist_data
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.ResistData
      const itemdata = {
        [item.resist_status_id]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  fromUnitAttackPattern (): Utils.TableData<Utils.UnitAttackPattern> {
    let data = {}
    const querytext = `
      SELECT
        pattern_id, unit_id, loop_start, loop_end,
        atk_pattern_1, atk_pattern_2, atk_pattern_3, atk_pattern_4,
        atk_pattern_5, atk_pattern_6, atk_pattern_7, atk_pattern_8,
        atk_pattern_9, atk_pattern_10, atk_pattern_11, atk_pattern_12,
        atk_pattern_13, atk_pattern_14, atk_pattern_15, atk_pattern_16,
        atk_pattern_17, atk_pattern_18, atk_pattern_19, atk_pattern_20
      FROM unit_attack_pattern
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.UnitAttackPattern
      const itemdata = {
        [item.pattern_id]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  fromUnitSkillData (): Utils.TableData<Utils.UnitSkillData> {
    let data = {}
    const querytext = `
      SELECT
        unit_id,
        union_burst, union_burst_evolution,
        main_skill_1, main_skill_2, main_skill_3, main_skill_4, main_skill_5,
        main_skill_6, main_skill_7, main_skill_8, main_skill_9, main_skill_10,
        main_skill_evolution_1, main_skill_evolution_2,
        sp_skill_1, sp_skill_2, sp_skill_3, sp_skill_4, sp_skill_5,
        ex_skill_1, ex_skill_2, ex_skill_3, ex_skill_4, ex_skill_5,
        ex_skill_evolution_1, ex_skill_evolution_2, ex_skill_evolution_3, ex_skill_evolution_4, ex_skill_evolution_5
      FROM unit_skill_data
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.UnitSkillData
      const itemdata = {
        [item.unit_id]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  fromUnitData (): Utils.TableData<Utils.UnitData> {
    let data = {}
    const querytext = `
      SELECT
        unit_id, unit_name, kana, prefab_id, rarity,
        move_speed, search_area_width, atk_type, normal_atk_cast_time,
        guild_id, exskill_display, comment, only_disp_owned,
        start_time, end_time
      FROM unit_data
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.UnitData
      const itemdata = {
        [item.unit_id]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  fromUnitProfile (): Utils.TableData<Utils.UnitProfile> {
    let data = {}
    const querytext = `
      SELECT
        unit_id, unit_name, age, guild, race,
        height, weight, birth_month, birth_day,
        blood_type, favorite, voice, voice_id,
        catch_copy, self_text, guild_id
      FROM unit_profile
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.UnitProfile
      const itemdata = {
        [item.unit_id]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  fromUnitBackground (): Utils.TableData<Utils.UnitBackground> {
    let data = {}
    const querytext = `
      SELECT unit_id, unit_name
      FROM unit_background
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.UnitBackground
      const itemdata = {
        [item.unit_id]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  fromUnitRarity (): Utils.TableData<Utils.UnitRarity> {
    let data = {}
    const querytext = `
      SELECT
        unit_id, rarity, hp, atk,
        magic_str, def, magic_def, physical_critical,
        magic_critical, wave_hp_recovery, wave_energy_recovery,
        dodge, physical_penetrate, magic_penetrate,
        life_steal, hp_recovery_rate, energy_recovery_rate,
        energy_reduce_rate, accuracy,
        hp_growth, atk_growth, magic_str_growth, def_growth, magic_def_growth,
        physical_critical_growth, magic_critical_growth, wave_hp_recovery_growth,
        wave_energy_recovery_growth, dodge_growth, physical_penetrate_growth,
        magic_penetrate_growth, life_steal_growth, hp_recovery_rate_growth,
        energy_recovery_rate_growth, energy_reduce_rate_growth, accuracy_growth
      FROM unit_rarity
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.UnitRarity
      const itemdata = {
        [`${item.unit_id}#${item.rarity}`]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  fromUnitPromotion (): Utils.TableData<Utils.UnitPromotion> {
    let data = {}
    const querytext = `
      SELECT
        unit_id, promotion_level,
        equip_slot_1, equip_slot_2, equip_slot_3,
        equip_slot_4, equip_slot_5, equip_slot_6
      FROM unit_promotion
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.UnitPromotion
      const itemdata = {
        [`${item.unit_id}#${item.promotion_level}`]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  fromUnitPromotionStatus (): Utils.TableData<Utils.UnitPromotionStatus> {
    let data = {}
    const querytext = `
      SELECT
        unit_id, promotion_level, hp, atk,
        magic_str, def, magic_def, physical_critical,
        magic_critical, wave_hp_recovery, wave_energy_recovery,
        dodge, physical_penetrate, magic_penetrate,
        life_steal, hp_recovery_rate, energy_recovery_rate,
        energy_reduce_rate, accuracy
      FROM unit_promotion_status
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.UnitPromotionStatus
      const itemdata = {
        [`${item.unit_id}#${item.promotion_level}`]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  fromCharaStoryStatus (): Utils.TableData<Utils.CharaStoryStatus> {
    let data = {}
    const querytext = `
      SELECT
        story_id, unlock_story_name,
        status_type_1, status_type_2, status_type_3, status_type_4, status_type_5,
        status_rate_1, status_rate_2, status_rate_3, status_rate_4, status_rate_5,
        chara_id_1, chara_id_2, chara_id_3, chara_id_4, chara_id_5,
        chara_id_6, chara_id_7, chara_id_8, chara_id_9, chara_id_10
      FROM chara_story_status
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.CharaStoryStatus
      const itemdata = {
        [item.story_id]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  fromSkillData (): Utils.TableData<Utils.SkillData> {
    let data = {}
    const querytext = `
      SELECT
        skill_id, name, skill_type, skill_area_width, skill_cast_time,
        action_1, action_2, action_3, action_4, action_5,
        action_6, action_7, depend_action_1, depend_action_2,
        depend_action_3, depend_action_4, depend_action_5,
        depend_action_6, depend_action_7, description, icon_type
      FROM skill_data
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.SkillData
      const itemdata = {
        [item.skill_id]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  fromSkillAction (): Utils.TableData<Utils.SkillAction> {
    let data = {}
    const querytext = `
      SELECT
        action_id, class_id, action_type,
        action_detail_1, action_detail_2, action_detail_3,
        action_value_1, action_value_2, action_value_3,
        action_value_4, action_value_5, action_value_6, action_value_7,
        target_assignment, target_area, target_range, target_type,
        target_number, target_count, description, level_up_disp
      FROM skill_action
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.SkillAction
      const itemdata = {
        [item.action_id]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  fromItemData (): Utils.TableData<Utils.ItemData> {
    let data = {}
    const querytext = `
      SELECT
        item_id, item_name, description, promotion_level,
        item_type, value, price, limit_num, start_time, end_time
      FROM item_data
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.ItemData
      const itemdata = {
        [item.item_id]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  fromEquipmentData (): Utils.TableData<Utils.EquipmentData> {
    let data = {}
    const querytext = `
      SELECT
        equipment_id, equipment_name, description, promotion_level,
        craft_flg, equipment_enhance_point, require_level,
        hp, atk, magic_str, def, magic_def,
        physical_critical, magic_critical, wave_hp_recovery,
        wave_energy_recovery, dodge, physical_penetrate,
        magic_penetrate, life_steal, hp_recovery_rate,
        energy_recovery_rate, energy_reduce_rate,
        enable_donation, accuracy
      FROM equipment_data
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.EquipmentData
      const itemdata = {
        [item.equipment_id]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  fromEquipmentCraft (): Utils.TableData<Utils.EquipmentCraft> {
    let data = {}
    const querytext = `
      SELECT
        equipment_id, crafted_cost,
        condition_equipment_id_1, condition_equipment_id_2, condition_equipment_id_3, condition_equipment_id_4, condition_equipment_id_5,
        condition_equipment_id_6, condition_equipment_id_7, condition_equipment_id_8, condition_equipment_id_9, condition_equipment_id_10,
        consume_num_1, consume_num_2, consume_num_3, consume_num_4, consume_num_5,
        consume_num_6, consume_num_7, consume_num_8, consume_num_9, consume_num_10
      FROM equipment_craft
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.EquipmentCraft
      const itemdata = {
        [item.equipment_id]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  fromUniqueEquipmentData (): Utils.TableData<Utils.UniqueEquipmentData> {
    let data = {}
    const querytext = `
      SELECT
        equipment_id, equipment_name, description, promotion_level,
        craft_flg, equipment_enhance_point, require_level,
        hp, atk, magic_str, def, magic_def,
        physical_critical, magic_critical, wave_hp_recovery,
        wave_energy_recovery, dodge, physical_penetrate,
        magic_penetrate, life_steal, hp_recovery_rate,
        energy_recovery_rate, energy_reduce_rate,
        enable_donation, accuracy
      FROM unique_equipment_data
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.UniqueEquipmentData
      const itemdata = {
        [item.equipment_id]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  fromUniqueEquipmentEnhanceRate (): Utils.TableData<Utils.UniqueEquipmentEnhanceRate> {
    let data = {}
    const querytext = `
      SELECT
        equipment_id, equipment_name, description, promotion_level,
        hp, atk, magic_str, def, magic_def,
        physical_critical, magic_critical, wave_hp_recovery,
        wave_energy_recovery, dodge, physical_penetrate,
        magic_penetrate, life_steal, hp_recovery_rate,
        energy_recovery_rate, energy_reduce_rate, accuracy
      FROM unique_equipment_enhance_rate
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.UniqueEquipmentEnhanceRate
      const itemdata = {
        [item.equipment_id]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  fromUniqueEquipmentCraft (): Utils.TableData<Utils.UniqueEquipmentCraft> {
    let data = {}
    const querytext = `
      SELECT
        equip_id, crafted_cost,
        reward_type_1, item_id_1, consume_num_1,
        reward_type_2, item_id_2, consume_num_2
      FROM unique_equipment_craft
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.UniqueEquipmentCraft
      const itemdata = {
        [item.equip_id]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  fromUniqueEquipmentRankup (): Utils.TableData<Utils.UniqueEquipmentRankup> {
    let data = {}
    const querytext = `
      SELECT
        equip_id, unique_equip_rank, unit_level, crafted_cost,
        reward_type_1, item_id_1, consume_num_1,
        reward_type_2, item_id_2, consume_num_2
      FROM unique_equipment_rankup
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.UniqueEquipmentRankup
      const itemdata = {
        [`${item.equip_id}#${item.unique_equip_rank}`]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  fromUniqueEquipmentEnhanceData (): Utils.TableData<Utils.UniqueEquipmentEnhanceData> {
    let data = {}
    const querytext = `
      SELECT
        enhance_level, needed_point, total_point, needed_mana, rank
      FROM unique_equipment_enhance_data
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.UniqueEquipmentEnhanceData
      const itemdata = {
        [item.enhance_level]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  fromQuestData (): Utils.TableData<Utils.QuestData> {
    let data = {}
    const querytext = `
      SELECT
        quest_id, area_id, quest_name, limit_team_level,
        stamina, team_exp, unit_exp, love, limit_time,
        daily_limit, wave_group_id_1, wave_group_id_2,
        wave_group_id_3, start_time, end_time
      FROM quest_data
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.QuestData
      const itemdata = {
        [item.quest_id]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  fromQuestAreaData (): Utils.TableData<Utils.QuestAreaData> {
    let data = {}
    const querytext = `
      SELECT area_id, area_name, map_type, start_time, end_time
      FROM quest_area_data
    `
    const queryresult = this.db.query(querytext) ?? []
    for (const _item of queryresult) {
      const item = _item as Utils.QuestAreaData
      const itemdata = {
        [item.area_id]: item
      }
      data = {...data, ...itemdata}
    }
    return data
  }

  toString (): string {
    const filename = path.basename(path.resolve(this.dbfile))
    const extname = path.extname(path.resolve(this.dbfile))
    return filename.substring(0, filename.length - extname.length)
  }
}

export default loadDatabase
