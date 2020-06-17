const queryData = require(__dirname + '/../sqliteutil.js');

function calculator ({ from, to, isGrandArena = false }) {
  if (from < to) return;
  const arena = isGrandArena ? 'grand_arena' : 'arena';
  const maxData = queryData.queryFromDatabase(`select rank_from,rank_to,reward_num_1 from ${arena}_max_rank_reward`);
  const seasonData = queryData.queryFromDatabase(`select rank_from,rank_to,reward_num_1 from ${arena}_max_season_rank_reward`);
  const maxFilted = maxData.filter(x => {
    return x.rank_from < from && x.rank_to >= to
  });
  const seasonFilted = seasonData.filter(x => {
    return x.rank_from < from && x.rank_to >= to
  });

  const calc = (arr, val = 0) => {
    if (arr.length === 0) {
      return;
    } else if (arr.length === 1) {
      const ratio = Math.min((from - to) / (arr[0].rank_to - arr[0].rank_from + 1), 1);
      val = ratio * (arr[0].rank_to - arr[0].rank_from + 1) * arr[0].reward_num_1;
    } else {
      const topRatio = Math.min((arr[0].rank_to - to + 1) / (arr[0].rank_to - arr[0].rank_from + 1), 1);
      const bottomRatio = Math.min((from - arr[arr.length - 1].rank_from) / (arr[arr.length - 1].rank_to - arr[arr.length - 1].rank_from + 1), 1);
      val += topRatio * (arr[0].rank_to - arr[0].rank_from + 1) * arr[0].reward_num_1;
      val += bottomRatio * (arr[arr.length - 1].rank_to - arr[arr.length - 1].rank_from + 1) * arr[arr.length - 1].reward_num_1;
      for (let i = 1; i < arr.length - 1; i++) {
        val += (arr[i].rank_to - arr[i].rank_from + 1) * arr[i].reward_num_1;
      }
    }
    return val;
  }

  const maxLeft = calc(maxFilted);
  const seasonLeft = calc(seasonFilted);

  return [maxLeft, seasonLeft];
}

module.exports = calculator;
