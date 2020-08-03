const queryData = require(__dirname + '/../sqliteutil.js');

function calculator ({ id, rarity, rank, level, storyBonus=false }) {
  [id, rarity, rank, level] = [id, rarity, rank, level].map(x => Number(x));
  if (!id || !rarity || !rank || !level) return;
  const totalStats = {};
  const rarityStats = queryData.queryFromDatabase('select * from unit_rarity where unit_id=? and rarity=?', [id, rarity])[0];
  const promotionStats = rank === 1 ? 0 : queryData.queryFromDatabase('select * from unit_promotion_status where unit_id=? and promotion_level=?', [id, rank])[0];

  const statsMap = {
    hp: {
      text: '生命值',
      index: 1
    },
    atk: {
      text: '物理攻击力',
      index: 2
    },
    def: {
      text: '物理防御力',
      index: 3
    },
    magic_str: {
      text: '魔法攻击力',
      index: 4
    },
    magic_def: {
      text: '魔法防御力',
      index: 5
    },
    physical_critical: {
      text: '物理暴击',
      index: 6
    },
    magic_critical: {
      text: '魔法暴击',
      index: 7
    },
    dodge: {
      text: '回避',
      index: 8
    },
    life_steal: {
      text: '生命值吸收',
      index: 9
    },
    wave_hp_recovery: {
      text: '生命值自动回复',
      index: 10
    },
    wave_energy_recovery: {
      text: '技能值自动回复',
      index: 11
    },
    physical_penetrate: {
      text: '物理穿透',
      index: 12
    },
    magic_penetrate: {
      text: '魔法穿透',
      index: 13
    },
    energy_recovery_rate: {
      text: '技能值上升',
      index: 14
    },
    hp_recovery_rate: {
      text: '回复量上升',
      index: 15
    },
    energy_reduce_rate: {
      text: '技能值消耗降低',
      index: 16
    },
    accuracy: {
      text: '命中',
      index: 17
    }
  };

  for (const statsType of Object.keys(statsMap)) {
    if (rarityStats[statsType] || promotionStats[statsType]) {
      totalStats[statsMap[statsType].text] = Math.ceil(rarityStats[statsType] + promotionStats[statsType] + rarityStats[`${statsType}_growth`] * (level + rank));
    };
  };

  if (storyBonus) {
    const baseid = (id - id % 100) / 100;
    let storyBonus = [];
    for (let i = 1; i <= 10; i++) {
      const storyBonusData = queryData.queryFromDatabase(`select * from chara_story_status where chara_id_${i}=?`, baseid);
      if (storyBonusData.length) {
        storyBonus = [...storyBonus, ...storyBonusData];
      } else {
        break;
      };
    }
    if (storyBonus.length) {
      for (const story of storyBonus) {
        for (let i = 1; i <= 5; i++) {
          const _statsType = Object.keys(statsMap)[story[`status_type_${i}`] - 1]
          if (_statsType && statsMap[_statsType].index === story[`status_type_${i}`]) {
            totalStats[statsMap[_statsType].text] += story[`status_rate_${i}`]
          };
        };
      };
    };
  };
  
  return totalStats;
};

module.exports = {
  calculator
};
