export namespace Utils {
  export interface LocalConfig {
    readonly port: string
    readonly address: string
    readonly issuesroot: string
    readonly cacheroot: string
    readonly logroot: string
    readonly db: string
    readonly ngdb: string
  }

  export interface TableData<T> {
    [primaryKey: number]: T
  }

  // Clan Battle
  export interface ClanBattleMapData {
    readonly id: number
    readonly clan_battle_id: number
    readonly difficulty: number
    readonly lap_num_from: number
    readonly lap_num_to: number
    readonly clan_battle_boss_group_id: number
    readonly aura_effect: number
    readonly rsl_unlock_lap: number
    readonly phase: number
  }

  export interface ClanBattleBossGroup {
    readonly clan_battle_boss_group_id: number
    readonly order_num: number
    readonly wave_group_id: number
    readonly score_coefficient: number
  }

  export interface ClanBattlePeriod {
    readonly clan_battle_id: number
    readonly period: number
    readonly period_detail: number
    readonly start_time: number
    readonly end_time: number
  }

  export interface ClanBattlePeriodRankReward {
    readonly id: number
    readonly clan_battle_id: number
    readonly rank_from: number
    readonly rank_to: number
    readonly reward_id_1: number
    readonly reward_num_1: number
    readonly reward_id_2: number
    readonly reward_num_2: number
    readonly reward_id_3: number
    readonly reward_num_3: number
  }

  // Wave Group
  export interface WaveGroupData {
    readonly id: number
    readonly wave_group_id: number
    readonly odds: number
    readonly enemy_id_1: number
    readonly drop_gold_1: number
    readonly drop_reward_id_1: number
    readonly enemy_id_2: number
    readonly drop_gold_2: number
    readonly drop_reward_id_2: number
    readonly enemy_id_3: number
    readonly drop_gold_3: number
    readonly drop_reward_id_3: number
    readonly enemy_id_4: number
    readonly drop_gold_4: number
    readonly drop_reward_id_4: number
    readonly enemy_id_5: number
    readonly drop_gold_5: number
    readonly drop_reward_id_5: number
  }

  // Enemy Parameter
  export interface EnemyParameter {
    readonly enemy_id: number
    readonly unit_id: number
    readonly name: string
    readonly level: number
    readonly rarity: number
    readonly hp: number
    readonly atk: number
    readonly magic_str: number
    readonly def: number
    readonly magic_def: number
    readonly physical_critical: number
    readonly magic_critical: number
    readonly wave_hp_recovery: number
    readonly wave_energy_recovery: number
    readonly dodge: number
    readonly physical_penetrate: number
    readonly magic_penetrate: number
    readonly life_steal: number
    readonly hp_recovery_rate: number
    readonly energy_recovery_rate: number
    readonly energy_reduce_rate: number
    readonly union_burst_level: number
    readonly main_skill_lv_1 : number
    readonly main_skill_lv_2: number
    readonly main_skill_lv_3: number
    readonly main_skill_lv_4: number
    readonly main_skill_lv_5: number
    readonly main_skill_lv_6: number
    readonly main_skill_lv_7: number
    readonly main_skill_lv_8: number
    readonly main_skill_lv_9: number
    readonly main_skill_lv_10: number
    readonly ex_skill_lv_1: number
    readonly ex_skill_lv_2: number
    readonly ex_skill_lv_3: number
    readonly ex_skill_lv_4: number
    readonly ex_skill_lv_5: number
    readonly resist_status_id: number
    readonly accuracy: number
  }

  export interface UnitEnemyData {
    readonly unit_id: number
    readonly unit_name: string
    readonly move_speed: number
    readonly search_area_width: number
    readonly atk_type: number
    readonly normal_atk_cast_time: number
    readonly comment: string
  }

  export interface EnemyRewardData {
    readonly drop_reward_id: number
    readonly drop_count: number
    readonly reward_type_1: number
    readonly reward_id_1: number
    readonly reward_num_1: number
    readonly odds_1: number
    readonly reward_type_2: number
    readonly reward_id_2: number
    readonly reward_num_2: number
    readonly odds_2: number
    readonly reward_type_3: number
    readonly reward_id_3: number
    readonly reward_num_3: number
    readonly odds_3: number
    readonly reward_type_4: number
    readonly reward_id_4: number
    readonly reward_num_4: number
    readonly odds_4: number
    readonly reward_type_5: number
    readonly reward_id_5: number
    readonly reward_num_5: number
    readonly odds_5: number 
  }

  // Resist Data
  export interface ResistData {
    readonly resist_status_id: number
    readonly ailment_1: number
    readonly ailment_2: number
    readonly ailment_3: number
    readonly ailment_4: number
    readonly ailment_5: number
    readonly ailment_6: number
    readonly ailment_7: number
    readonly ailment_8: number
    readonly ailment_9: number
    readonly ailment_10: number
    readonly ailment_11: number
    readonly ailment_12: number
    readonly ailment_13: number
    readonly ailment_14: number
    readonly ailment_15: number
    readonly ailment_16: number
    readonly ailment_17: number
    readonly ailment_18: number
    readonly ailment_19: number
    readonly ailment_20: number
  }
  
  // Unit
  export interface UnitAttackPattern {
    readonly pattern_id: number
    readonly unit_id: number
    readonly loop_start: number
    readonly loop_end: number
    readonly atk_pattern_1: number
    readonly atk_pattern_2: number
    readonly atk_pattern_3: number
    readonly atk_pattern_4: number
    readonly atk_pattern_5: number
    readonly atk_pattern_6: number
    readonly atk_pattern_7: number
    readonly atk_pattern_8: number
    readonly atk_pattern_9: number
    readonly atk_pattern_10: number
    readonly atk_pattern_11: number
    readonly atk_pattern_12: number
    readonly atk_pattern_13: number
    readonly atk_pattern_14: number
    readonly atk_pattern_15: number
    readonly atk_pattern_16: number
    readonly atk_pattern_17: number
    readonly atk_pattern_18: number
    readonly atk_pattern_19: number
    readonly atk_pattern_20: number
  }

  export interface UnitSkillData {
    readonly unit_id: number
    readonly union_burst: number
    readonly union_burst_evolution: number
    readonly main_skill_1: number
    readonly main_skill_2: number
    readonly main_skill_3: number
    readonly main_skill_4: number
    readonly main_skill_5: number
    readonly main_skill_6: number
    readonly main_skill_7: number
    readonly main_skill_8: number
    readonly main_skill_9: number
    readonly main_skill_10: number
    readonly main_skill_evolution_1: number
    readonly main_skill_evolution_2: number
    readonly sp_skill_1: number
    readonly sp_skill_2: number
    readonly sp_skill_3: number
    readonly sp_skill_4: number
    readonly sp_skill_5: number
    readonly ex_skill_1: number
    readonly ex_skill_2: number
    readonly ex_skill_3: number
    readonly ex_skill_4: number
    readonly ex_skill_5: number
    readonly ex_skill_evolution_1: number
    readonly ex_skill_evolution_2: number
    readonly ex_skill_evolution_3: number
    readonly ex_skill_evolution_4: number
    readonly ex_skill_evolution_5: number
  }

  export interface UnitData {
    readonly unit_id: number
    readonly unit_name: string
    readonly kana: string
    readonly prefab_id: number
    readonly rarity: number
    readonly move_speed: number
    readonly search_area_width: number
    readonly atk_type: number
    readonly normal_atk_cast_time: number
    readonly guild_id: number
    readonly exskill_display: number
    readonly comment: string
    readonly only_disp_owned: number
    readonly start_time: string
    readonly end_time: string
  }

  export interface UnitProfile {
    readonly unit_id: number
    readonly unit_name: string
    readonly age: string
    readonly guild: string
    readonly race: string
    readonly height: string
    readonly weight: string
    readonly birth_month: string
    readonly birth_day: string
    readonly blood_type: string
    readonly favorite: string
    readonly voice: string
    readonly voice_id: number
    readonly catch_copy: string
    readonly self_text: string
    readonly guild_id: string
  }

  export interface UnitBackground {
    readonly unit_id: number
    readonly unit_name: string
  }

  export interface UnitRarity {
    readonly unit_id: number
    readonly rarity: number
    readonly hp: number
    readonly atk: number
    readonly magic_str: number
    readonly def: number
    readonly magic_def: number
    readonly physical_critical: number
    readonly magic_critical: number
    readonly wave_hp_recovery: number
    readonly wave_energy_recovery: number
    readonly dodge: number
    readonly physical_penetrate: number
    readonly magic_penetrate: number
    readonly life_steal: number
    readonly hp_recovery_rate: number
    readonly energy_recovery_rate: number
    readonly energy_reduce_rate: number
    readonly accuracy: number
    readonly hp_growth: number
    readonly atk_growth: number
    readonly magic_str_growth: number
    readonly def_growth: number
    readonly magic_def_growth: number
    readonly physical_critical_growth: number
    readonly magic_critical_growth: number
    readonly wave_hp_recovery_growth: number
    readonly wave_energy_recovery_growth: number
    readonly dodge_growth: number
    readonly physical_penetrate_growth: number
    readonly magic_penetrate_growth: number
    readonly life_steal_growth: number
    readonly hp_recovery_rate_growth: number
    readonly energy_recovery_rate_growth: number
    readonly energy_reduce_rate_growth: number
    readonly accuracy_growth: number
  }

  export interface UnitPromotion {
    readonly unit_id: number
    readonly promotion_level: number
    readonly equip_slot_1: number
    readonly equip_slot_2: number
    readonly equip_slot_3: number
    readonly equip_slot_4: number
    readonly equip_slot_5: number
    readonly equip_slot_6: number
  }

  export interface UnitPromotionStatus {
    readonly unit_id: number
    readonly promotion_level: number
    readonly hp: number
    readonly atk: number
    readonly magic_str: number
    readonly def: number
    readonly magic_def: number
    readonly physical_critical: number
    readonly magic_critical: number
    readonly wave_hp_recovery: number
    readonly wave_energy_recovery: number
    readonly dodge: number
    readonly physical_penetrate: number
    readonly magic_penetrate: number
    readonly life_steal: number
    readonly hp_recovery_rate: number
    readonly energy_recovery_rate: number
    readonly energy_reduce_rate: number
    readonly accuracy: number
  }

  export interface CharaStoryStatus {
    readonly story_id: number
    readonly unlock_story_name: string
    readonly status_type_1: number
    readonly status_type_2: number
    readonly status_type_3: number
    readonly status_type_4: number
    readonly status_type_5: number
    readonly status_rate_1: number
    readonly status_rate_2: number
    readonly status_rate_3: number
    readonly status_rate_4: number
    readonly status_rate_5: number
    readonly chara_id_1: number
    readonly chara_id_2: number
    readonly chara_id_3: number
    readonly chara_id_4: number
    readonly chara_id_5: number
    readonly chara_id_6: number
    readonly chara_id_7: number
    readonly chara_id_8: number
    readonly chara_id_9: number
    readonly chara_id_10: number
  }

  // Skill
  export interface SkillData {
    readonly skill_id: number
    readonly name: string | undefined
    readonly skill_type: number
    readonly skill_area_width: number
    readonly skill_cast_time: number
    readonly action_1: number
    readonly action_2: number
    readonly action_3: number
    readonly action_4: number
    readonly action_5: number
    readonly action_6: number
    readonly action_7: number
    readonly depend_action_1: number
    readonly depend_action_2: number
    readonly depend_action_3: number
    readonly depend_action_4: number
    readonly depend_action_5: number
    readonly depend_action_6: number
    readonly depend_action_7: number
    readonly description: string
    readonly icon_type: number
  }

  export interface SkillAction {
    readonly action_id: number
    readonly class_id: number
    readonly action_type: number
    readonly action_detail_1: number
    readonly action_detail_2: number
    readonly action_detail_3: number
    readonly action_value_1: number
    readonly action_value_2: number
    readonly action_value_3: number
    readonly action_value_4: number
    readonly action_value_5: number
    readonly action_value_6: number
    readonly action_value_7: number
    readonly target_assignment: number
    readonly target_area: number
    readonly target_range: number
    readonly target_type: number
    readonly target_number: number
    readonly target_count: number
    readonly description: string
    readonly level_up_disp: string
  }

  // Item and Equipment
  export interface ItemData {
    readonly item_id: number
    readonly item_name: string
    readonly description: string
    readonly promotion_level: number
    readonly item_type: number
    readonly value: number
    readonly price: number
    readonly limit_num: number
    readonly start_time: string
    readonly end_time: string
  }

  export interface EquipmentData {
    readonly equipment_id: number
    readonly equipment_name: string
    readonly description: string
    readonly promotion_level: number
    readonly craft_flg: number
    readonly equipment_enhance_point: number
    readonly require_level: number
    readonly hp: number
    readonly atk: number
    readonly magic_str: number
    readonly def: number
    readonly magic_def: number
    readonly physical_critical: number
    readonly magic_critical: number
    readonly wave_hp_recovery: number
    readonly wave_energy_recovery: number
    readonly dodge: number
    readonly physical_penetrate: number
    readonly magic_penetrate: number
    readonly life_steal: number
    readonly hp_recovery_rate: number
    readonly energy_recovery_rate: number
    readonly energy_reduce_rate: number
    readonly enable_donation: number
    readonly accuracy: number
  }

  export interface EquipmentCraft {
    readonly equipment_id: number
    readonly crafted_cost: number
    readonly condition_equipment_id_1: number
    readonly condition_equipment_id_2: number
    readonly condition_equipment_id_3: number
    readonly condition_equipment_id_4: number
    readonly condition_equipment_id_5: number
    readonly condition_equipment_id_6: number
    readonly condition_equipment_id_7: number
    readonly condition_equipment_id_8: number
    readonly condition_equipment_id_9: number
    readonly condition_equipment_id_10: number
    readonly consume_num_1: number
    readonly consume_num_2: number
    readonly consume_num_3: number
    readonly consume_num_4: number
    readonly consume_num_5: number
    readonly consume_num_6: number
    readonly consume_num_7: number
    readonly consume_num_8: number
    readonly consume_num_9: number
    readonly consume_num_10: number
  }
  
  export interface UniqueEquipmentData {
    readonly equipment_id: number
    readonly equipment_name: string
    readonly description: string
    readonly promotion_level: number
    readonly craft_flg: number
    readonly equipment_enhance_point: number
    readonly require_level: number
    readonly hp: number
    readonly atk: number
    readonly magic_str: number
    readonly def: number
    readonly magic_def: number
    readonly physical_critical: number
    readonly magic_critical: number
    readonly wave_hp_recovery: number
    readonly wave_energy_recovery: number
    readonly dodge: number
    readonly physical_penetrate: number
    readonly magic_penetrate: number
    readonly life_steal: number
    readonly hp_recovery_rate: number
    readonly energy_recovery_rate: number
    readonly energy_reduce_rate: number
    readonly enable_donation: number
    readonly accuracy: number
  }

  export interface UniqueEquipmentEnhanceRate {
    readonly equipment_id: number
    readonly equipment_name: string
    readonly description: string
    readonly promotion_level: number
    readonly hp: number
    readonly atk: number
    readonly magic_str: number
    readonly def: number
    readonly magic_def: number
    readonly physical_critical: number
    readonly magic_critical: number
    readonly wave_hp_recovery: number
    readonly wave_energy_recovery: number
    readonly dodge: number
    readonly physical_penetrate: number
    readonly magic_penetrate: number
    readonly life_steal: number
    readonly hp_recovery_rate: number
    readonly energy_recovery_rate: number
    readonly energy_reduce_rate: number
    readonly accuracy: number
  }

  export interface UniqueEquipmentCraft {
    readonly equip_id: number
    readonly crafted_cost: number
    readonly reward_type_1: number
    readonly item_id_1: number
    readonly consume_num_1: number
    readonly reward_type_2: number
    readonly item_id_2: number
    readonly consume_num_2: number
  }

  export interface UniqueEquipmentRankup {
    readonly equip_id: number
    readonly unique_equip_rank: number
    readonly unit_level: number
    readonly crafted_cost: number
    readonly reward_type_1: number
    readonly item_id_1: number
    readonly consume_num_1: number
    readonly reward_type_2: number
    readonly item_id_2: number
    readonly consume_num_2: number
  }

  export interface UniqueEquipmentEnhanceData {
    readonly enhance_level: number
    readonly needed_point: number
    readonly total_point: number
    readonly needed_mana: number
    readonly rank: number
  }

  // Quest
  export interface QuestData {
    readonly quest_id: number
    readonly area_id: number
    readonly quest_name: string
    readonly limit_team_level: number
    readonly stamina: number
    readonly team_exp: number
    readonly unit_exp: number
    readonly love: number
    readonly limit_time: number
    readonly daily_limit: number
    readonly wave_group_id_1: number
    readonly wave_group_id_2: number
    readonly wave_group_id_3: number
    readonly start_time: string
    readonly end_time: string
  }

  export interface QuestAreaData {
    readonly area_id: number
    readonly area_name: string
    readonly map_type: number
    readonly start_time: string
    readonly end_time: string
  }
}