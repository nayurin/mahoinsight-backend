const commons = require(`${__dirname}/../../commons.js`);
const { logger4router } = require(`${__dirname}/../../../log4js`);
const queryData = require(__dirname + '/../../../utils/sqliteutil.js');

async function respond (ctx, next) {
  try {
    const data = await commons.parse(ctx);
    const profile = queryData.queryFromDatabase('select distinct * from unit_data left join unit_profile on unit_data.unit_id=unit_profile.unit_id where unit_data.unit_id=?', data.id)[0];
    logger4router.debug('<charaProfile> query result:', profile);
    if (profile) {
      ctx.status = 200;
      ctx.body = {
        result: 'succeed',
        data: JSON.stringify(profile)
      };
      logger4router.debug('<charaProfile> respond:', ctx.status, ctx.body);
    } else {
      ctx.status = 400;
      ctx.body = {
        result: 'failed',
        reason: '无法获取此ID的角色信息'
      };
    }
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      result: 'failed',
      reason: JSON.stringify(e)
    };
    logger4router.error('<charaProfile> caught an error:', e);
  }
}

module.exports = {
  respond
};