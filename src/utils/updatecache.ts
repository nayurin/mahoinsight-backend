import * as fs from 'fs'
import * as path from 'path'
import loadDatabase from './loadDatabase'
import loadConfig from './configloader'
import { Utils } from './utils'

function cache2File(){
  const loaded = loadConfig() ?? {}
  const config: Utils.LocalConfig = Object.create(loaded)
  const cacheroot = path.resolve(config.cacheroot)
  const dirPath = path.resolve(__dirname, cacheroot)
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath)
  // logger4util.debug('<cache> cache root:', dirPath)
  const load = new loadDatabase()

  const tableMap = {
    clan_battle_map_data: {
      get: load.fromClanBattleMapData,
      file: `${dirPath}/clan_battle_map_data.json`
    },
    clan_battle_boss_group: {
      get: load.fromClanBattleBossGroup,
      file: `${dirPath}/clan_battle_boss_group.json`
    },
    clan_battle_period: {
      get: load.fromClanBattlePeriod,
      file: `${dirPath}/clan_battle_period.json`
    },
    clan_battle_period_rank_reward: {
      get: load.fromClanBattlePeriodRankReward,
      file: `${dirPath}/clan_battle_period_rank_reward.json`
    },
    wave_group_data: {
      get: load.fromWaveGroupData,
      file: `${dirPath}/wave_group_data.json`
    },
    enemy_parameter: {
      get: load.fromEnemyParameter,
      file: `${dirPath}/enemy_parameter.json`
    },
    unit_enemy_data: {
      get: load.fromUnitEnemyData,
      file: `${dirPath}/unit_enemy_data.json`
    },
    enemy_reward_data: {
      get: load.fromEnemyRewardData,
      file: `${dirPath}/enemy_reward_data.json`
    },
    resist_data: {
      get: load.fromResistData,
      file: `${dirPath}/resist_data.json`
    },
    unit_attack_pattern: {
      get: load.fromUnitAttackPattern,
      file: `${dirPath}/unit_attack_pattern.json`
    },
    unit_skill_data: {
      get: load.fromUnitSkillData,
      file: `${dirPath}/unit_skill_data.json`
    },
    unit_data: {
      get: load.fromUnitData,
      file: `${dirPath}/unit_data.json`
    },
    unit_profile: {
      get: load.fromUnitProfile,
      file: `${dirPath}/unit_profile.json`
    },
    unit_background: {
      get: load.fromUnitBackground,
      file: `${dirPath}/unit_background.json`
    },
    unit_rarity: {
      get: load.fromUnitRarity,
      file: `${dirPath}/unit_rarity.json`
    },
    unit_promotion: {
      get: load.fromUnitPromotion,
      file: `${dirPath}/unit_promotion.json`
    },
    unit_promotion_status: {
      get: load.fromUnitPromotionStatus,
      file: `${dirPath}/unit_promotion_status.json`
    },
    chara_story_status: {
      get: load.fromCharaStoryStatus,
      file: `${dirPath}/chara_story_status.json`
    },
    skill_data: {
      get: load.fromSkillData,
      file: `${dirPath}/skill_data.json`
    },
    skill_action: {
      get: load.fromSkillAction,
      file: `${dirPath}/skill_action.json`
    },
    item_data: {
      get: load.fromItemData,
      file: `${dirPath}/item_data.json`
    },
    equipment_data: {
      get: load.fromEquipmentData,
      file: `${dirPath}/equipment_data.json`
    },
    equipment_craft: {
      get: load.fromEquipmentCraft,
      file: `${dirPath}/equipment_craft.json`
    },
    unique_equipment_data: {
      get: load.fromUniqueEquipmentData,
      file: `${dirPath}/unique_equipment_data.json`
    },
    unique_equipment_enhance_rate: {
      get: load.fromUniqueEquipmentEnhanceRate,
      file: `${dirPath}/unique_equipment_enhance_rate.json`
    },
    quest_data: {
      get: load.fromQuestData,
      file: `${dirPath}/quest_data.json`
    },
    quest_area_data: {
      get: load.fromQuestAreaData,
      file: `${dirPath}/quest_area_data.json`
    },
  }

  const write = (type: string): void => {
    switch (type) {
      case 'all':
        for (const tableProp of Object.values(tableMap)) {
          const content = JSON.stringify(tableProp.get.call(load))
          fs.writeFile(tableProp.file, content, e => {
            // if (e) {
            //   logger4util.error(`<cache> write error on ${type} cache: ${e}`)
            // } else {
            //   logger4util.debug(`<cache> finished writing ${type} cache: ${filename}`)
            // }
          })
        }
        break
      default:
        const filename = tableMap[type].file
        const content = JSON.stringify(tableMap[type].get.call(load))
        fs.writeFile(filename, content, e => {
          // if (e) {
          //   logger4util.error(`<cache> write error on ${type} cache: ${e}`)
          // } else {
          //   logger4util.debug(`<cache> finished writing ${type} cache: ${filename}`)
          // }
        })
    }
  }

  write('all')
}

export default cache2File

cache2File()
