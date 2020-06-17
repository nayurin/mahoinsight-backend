const commons = require(`${__dirname}/../../commons.js`);
const { logger4router } = require(`${__dirname}/../../../log4js`);
const { calculator } = require(`${__dirname}/../../../utils/arena/GemsCalculator.js`);

async function respond (ctx, next) {
  try {
    const data = await commons.parse(ctx);
    const result = calculator(data);
    if (result && result.length) {
      logger4router.debug(`<gemCalc> calculated max reward: ${result[0]} season reward: ${result[1]}`);
      ctx.status = 200;
      ctx.body = {
        result: 'succeed',
        max: result[0],
        season: result[1]
      };
      logger4router.debug('<gemCalc> respond:', ctx.status, ctx.body);
    } else {
      ctx.status = 400;
      ctx.body = {
        result: 'failed'
      };
      logger4router.error('<gemCalc> parameter mismatch', data);
    }
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      result: 'failed'
    };
    logger4router.error('<gemCalc> caught an error:', e);
  }
}

module.exports = {
  respond
};