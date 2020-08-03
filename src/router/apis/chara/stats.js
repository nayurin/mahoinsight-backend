const commons = require(`${__dirname}/../../commons.js`);
const { logger4router } = require(`${__dirname}/../../../log4js`);
const { calculator } = require(`${__dirname}/../../../utils/chara/StatsCalculator.js`);

async function respond (ctx, next) {
  try {
    const data = await commons.parse(ctx);
    const stats = calculator(data);
    if (stats) {
      logger4router.debug('<charaStats> calculated:', stats);
      ctx.status = 200;
      ctx.body = {
        result: 'succeed',
        stats: JSON.stringify(stats)
      };
      logger4router.debug('<charaStats> respond:', ctx.status, ctx.body);
    } else {
      ctx.status = 400;
      ctx.body = {
        result: 'failed'
      };
      logger4router.error('<charaStats> parameter mismatch', data);
    }
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      result: 'failed'
    };
    logger4router.error('<charaStats> caught an error:', e);
  }
}

module.exports = {
  respond
};