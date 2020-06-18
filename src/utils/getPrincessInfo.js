const queryData = require(__dirname + '/sqliteutil.js');
const Item = require(__dirname + '/getItemInfo.js');

class Princess {
  constructor(id) {
    this.id = parseInt(id);
  }

  _getPrincessStatus() {
    this.status = queryData.queryFromDatabase("select unit_name,rarity,atk_type,search_area_width,normal_atk_cast_time,comment from unit_data where unit_id=?", this.id)[0];
  }

  _getPrincessProfile() {
    this.profile = queryData.queryFromDatabase("select age,guild,race,height,weight,birth_month,birth_day,blood_type,favorite,voice,catch_copy,self_text,guild_id from unit_profile where unit_id=?", this.id)[0];
    this.profile.fullname = queryData.queryFromDatabase("select unit_name from unit_background where unit_id=?", this.id)[0].unit_name;
  }

  _getPrincessGrowth(){
    this.growth = new Object();
    this.growth.rarity = new Object();
    this.growth.promotion = new Object();
    queryData.queryFromDatabase("select * from unit_rarity where unit_id=?", this.id).map(x=>{
      delete x.unit_id;
      let _rarity = x.rarity;
      delete x.rarity;
      this.growth.rarity[_rarity] = x;
    });
    queryData.queryFromDatabase("select * from unit_promotion_status where unit_id=?", this.id).map(x=>{
      delete x.unit_id;
      let _rank = x.promotion_level;
      delete x.promotion_level;
      this.growth.promotion[_rank] = x;
    });
  }

  _getPrincessAttackPattern() {
    this.attack_pattern = queryData.queryFromDatabase("select * from unit_attack_pattern where unit_id=?", this.id)[0];
  }

  _getPrincessPromotion() {
    this.promotion_info = new Object();
    let row = queryData.queryFromDatabase("select * from unit_promotion where unit_id=?", this.id);
    row.forEach((level) => {
      delete level.unit_id;
      let level_ = level.promotion_level;
      delete level.promotion_level;
      this.promotion_info[level_] = level;
    });
  }

  static _getPrincessSkillAction(action_id) {
    return action_id === 0 ? 0 : queryData.queryFromDatabase("select * from skill_action where action_id=?", action_id)[0];
  }

  _getPrincessSkillData() {
    this.skill = new Object();
    let skill_info = queryData.queryFromDatabase("select * from unit_skill_data where unit_id=?", this.id)[0];
    this.skill = {
      union_burst: this._getPrincessSkillDetail(skill_info.union_burst),
      skill_1: this._getPrincessSkillDetail(skill_info.main_skill_1),
      skill_2: this._getPrincessSkillDetail(skill_info.main_skill_2),
      ex_skill: this._getPrincessSkillDetail(skill_info.ex_skill_1),
      union_burst_evo: this._getPrincessSkillDetail(skill_info.union_burst_evolution),
      skill_1_evo: this._getPrincessSkillDetail(skill_info.main_skill_evolution_1),
      ex_skill_evo: this._getPrincessSkillDetail(skill_info.ex_skill_evolution_1)
    }
  }

  _getPrincessSkillDetail(skill_id) {
    if (skill_id == 0) { return 0; }
    let detail = new Object();
    let row = queryData.queryFromDatabase("select * from skill_data where skill_id=?", skill_id)[0];
    detail = {
      name: row.name,
      description: row.description,
      actions: {
        action_list: Array(row.action_1, row.action_2, row.action_3, row.action_4, row.action_5, row.action_6, row.action_7).map(Princess._getPrincessSkillAction),
        depend_action_list: Array(row.depend_action_1, row.depend_action_2, row.depend_action_3, row.depend_action_4, row.depend_action_5, row.depend_action_6, row.depend_action_7).map(Princess._getPrincessSkillAction)
      },
      icon: row.icon_type
    }
    return detail;
  }

  _getPrincessUniqueEquipment() {
    let id_short = this.id.toString().split('').splice(2, 2).join('');
    let equip_id = `130${id_short}1`;
    let uniq_equip_data = queryData.queryFromDatabase("select * from unique_equipment_data where equipment_id=?", equip_id);
    let uniq_equip_enh_rate = queryData.queryFromDatabase("select * from unique_equipment_enhance_rate where equipment_id=?", equip_id);
    if (uniq_equip_data.length && uniq_equip_enh_rate.length) {
      this.unique_equipment = new Object();
      this.unique_equipment['data'] = uniq_equip_data[0];
      this.unique_equipment['enhance_rate'] = uniq_equip_enh_rate[0];
    }
  }
  
  _getPrincessStoryBonus() {
    this.storybonus = new Object();
    const baseid = (this.id - this.id % 100) / 100;
    const bonus = queryData.queryFromDatabase("select unlock_story_name, status_type_1,status_rate_1,status_type_2,status_rate_2,status_type_3,status_rate_3,status_type_4,status_rate_4,status_type_5,status_rate_5 from chara_story_status where chara_id_1=? or chara_id_2=? or chara_id_3=? or chara_id_4=? or chara_id_5=? or chara_id_6=? or chara_id_7=? or chara_id_8=? or chara_id_9=? or chara_id_10=?", [baseid, baseid, baseid, baseid, baseid, baseid, baseid, baseid, baseid, baseid]);
    const statusmap = {
      1: "生命值",
      2: "物理攻击力",
      3: "物理防御力",
      4: "魔法攻击力",
      5: "魔法防御力",
      6: "物理暴击",
      7: "魔法暴击",
      8: "回避",
      9: "生命值吸收",
      10: "生命值自动回复",
      11: "技能值自动回复",
      14: "技能值上升",
      15: "回复量上升"
    }
    bonus.map(x => {
      this.storybonus[x.unlock_story_name] = new Object();
      for (let i = 0; i <= 5; i++) {
        if (x[`status_type_${i}`]) {
          this.storybonus[x.unlock_story_name][statusmap[x[`status_type_${i}`]]] = x[`status_rate_${i}`]
        }
      }
    })
  }

  static _add2Crafts(obj, equip_id, amount = 1) {
    if (obj.hasOwnProperty(equip_id)) {
      obj[equip_id] = obj[equip_id] + parseInt(amount);
    } else {
      obj[equip_id] = parseInt(amount);
    }
  }

  static list() {
    let list = new Array();
    for (let item of queryData.queryFromDatabase("select unit_id from unit_data where unit_id like '10%'").values()){
      list.push(item.unit_id);
    }
    return list;
  }

  connect() {
    this._getPrincessStatus();
    this._getPrincessProfile();
    this._getPrincessAttackPattern();
    this._getPrincessPromotion();
    this._getPrincessSkillData();
    this._getPrincessGrowth();
    this._getPrincessUniqueEquipment();
    this._getPrincessStoryBonus();
  }

  async promote(to, from = 1) {
    if (!this.hasOwnProperty('promotion_info')) {
      return -1;
    }
    let promote = JSON.parse(JSON.stringify(this.promotion_info.slice(from - 1, to)));
    let total_item = new Object;
    for (let i = 0; i < promote.length; i++) {
      delete promote[i].promotion_level;
      for (let equip_id of Object.values(promote[i])) {
        if (equip_id == 999999) {
          continue;
        }
        let item = new Item(equip_id);
        await item.craft().then(value => {
          if (value == -1) {
            Princess._add2Crafts(total_item, equip_id, 1);
          } else {
            value.forEach((equipment) => {
              Princess._add2Crafts(total_item, equipment[0], equipment[1]);
            });
          }
        });
      }
    }
    return total_item;
  }
}

module.exports = Princess;
