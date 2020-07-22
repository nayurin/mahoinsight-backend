import * as fs from 'fs'
import * as path from 'path'
import loadDatabase from './loadDatabase'
import loadConfig from './configloader'
import { Utils } from './utils'

function cache2File () {
  const loaded = loadConfig() ?? {}
  const config: Utils.LocalConfig = Object.create(loaded)
  const cacheroot = path.resolve(config.cacheroot)
  const dirPath = path.resolve(__dirname, cacheroot)
  
  // logger4util.debug('<cache> cache root:', dirPath)
  const master = new loadDatabase(config.db)
  const ngMaster = new loadDatabase(config.ngdb)

  const tableMap = (dbLoaded: loadDatabase) => {
    const filePath = `${dirPath}/${dbLoaded.toString()}`
    return {
      clan_battle_map_data: {
        get: dbLoaded.fromClanBattleMapData,
        file: `${filePath}/clan_battle_map_data.json`
      },
      clan_battle_boss_group: {
        get: dbLoaded.fromClanBattleBossGroup,
        file: `${filePath}/clan_battle_boss_group.json`
      },
      clan_battle_period: {
        get: dbLoaded.fromClanBattlePeriod,
        file: `${filePath}/clan_battle_period.json`
      },
      clan_battle_period_rank_reward: {
        get: dbLoaded.fromClanBattlePeriodRankReward,
        file: `${filePath}/clan_battle_period_rank_reward.json`
      },
      wave_group_data: {
        get: dbLoaded.fromWaveGroupData,
        file: `${filePath}/wave_group_data.json`
      },
      enemy_parameter: {
        get: dbLoaded.fromEnemyParameter,
        file: `${filePath}/enemy_parameter.json`
      },
      unit_enemy_data: {
        get: dbLoaded.fromUnitEnemyData,
        file: `${filePath}/unit_enemy_data.json`
      },
      enemy_reward_data: {
        get: dbLoaded.fromEnemyRewardData,
        file: `${filePath}/enemy_reward_data.json`
      },
      resist_data: {
        get: dbLoaded.fromResistData,
        file: `${filePath}/resist_data.json`
      },
      unit_attack_pattern: {
        get: dbLoaded.fromUnitAttackPattern,
        file: `${filePath}/unit_attack_pattern.json`
      },
      unit_skill_data: {
        get: dbLoaded.fromUnitSkillData,
        file: `${filePath}/unit_skill_data.json`
      },
      unit_data: {
        get: dbLoaded.fromUnitData,
        file: `${filePath}/unit_data.json`
      },
      unit_profile: {
        get: dbLoaded.fromUnitProfile,
        file: `${filePath}/unit_profile.json`
      },
      unit_background: {
        get: dbLoaded.fromUnitBackground,
        file: `${filePath}/unit_background.json`
      },
      unit_rarity: {
        get: dbLoaded.fromUnitRarity,
        file: `${filePath}/unit_rarity.json`
      },
      unit_promotion: {
        get: dbLoaded.fromUnitPromotion,
        file: `${filePath}/unit_promotion.json`
      },
      unit_promotion_status: {
        get: dbLoaded.fromUnitPromotionStatus,
        file: `${filePath}/unit_promotion_status.json`
      },
      chara_story_status: {
        get: dbLoaded.fromCharaStoryStatus,
        file: `${filePath}/chara_story_status.json`
      },
      skill_data: {
        get: dbLoaded.fromSkillData,
        file: `${filePath}/skill_data.json`
      },
      skill_action: {
        get: dbLoaded.fromSkillAction,
        file: `${filePath}/skill_action.json`
      },
      item_data: {
        get: dbLoaded.fromItemData,
        file: `${filePath}/item_data.json`
      },
      equipment_data: {
        get: dbLoaded.fromEquipmentData,
        file: `${filePath}/equipment_data.json`
      },
      equipment_craft: {
        get: dbLoaded.fromEquipmentCraft,
        file: `${filePath}/equipment_craft.json`
      },
      unique_equipment_data: {
        get: dbLoaded.fromUniqueEquipmentData,
        file: `${filePath}/unique_equipment_data.json`
      },
      unique_equipment_enhance_rate: {
        get: dbLoaded.fromUniqueEquipmentEnhanceRate,
        file: `${filePath}/unique_equipment_enhance_rate.json`
      },
      quest_data: {
        get: dbLoaded.fromQuestData,
        file: `${filePath}/quest_data.json`
      },
      quest_area_data: {
        get: dbLoaded.fromQuestAreaData,
        file: `${filePath}/quest_area_data.json`
      }
    }
  }

  const makeDir = (dirname: string): true | undefined => {
    if (fs.existsSync(dirname)) {
      return true
    } else {
      if (makeDir(path.dirname(dirname))) {
        fs.mkdirSync(dirname)
        return true
      }
    }
  }

  const write = (db: loadDatabase, table: string, merge: boolean = false): void => {
    let full = {}
    // const content: string
    switch (table) {
      case 'all':
        if (merge) {
          for (const tableProp of Object.keys(tableMap(db))) {
            full = {...full, ...{ [tableProp]: tableMap(db)[tableProp].get.call(db) }}
          }
          makeDir(dirPath)
          fs.writeFile(`${dirPath}/${db.toString()}.json`, JSON.stringify(full), e => {
            // if (e) {
            //   logger4util.error(`<cache> write error on ${type} cache: ${e}`)
            // } else {
            //   logger4util.debug(`<cache> finished writing ${type} cache: ${filename}`)
            // }
          })
        } else {
          for (const tableProp of Object.values(tableMap(db))) {
            const content = JSON.stringify(tableProp.get.call(db))
            makeDir(path.dirname(path.resolve(tableProp.file)))
            fs.writeFile(tableProp.file, content, e => {
              // if (e) {
              //   logger4util.error(`<cache> write error on ${type} cache: ${e}`)
              // } else {
              //   logger4util.debug(`<cache> finished writing ${type} cache: ${filename}`)
              // }
            })
          }
        }
        break
      default:
        const filename = tableMap(db)[table].file
        const content = JSON.stringify(tableMap(db)[table].get.call(db))
        makeDir(path.dirname(path.resolve(filename)))
        fs.writeFile(filename, content, e => {
          // if (e) {
          //   logger4util.error(`<cache> write error on ${type} cache: ${e}`)
          // } else {
          //   logger4util.debug(`<cache> finished writing ${type} cache: ${filename}`)
          // }
        })
    }
  }

  write(master, 'all', false)
  write(master, 'all', true)
  write(ngMaster, 'all', false)
  write(ngMaster, 'all', true)
}

// export default cache2File

cache2File()
