const qs = require('qs');
const { logger4router } = require(`${__dirname}/../../../log4js`);
const queryData = require(__dirname + '/../../../utils/sqliteutil.js');

function getUnitLines (baseId) {
  baseId = String(baseId);
  const minId = parseInt(baseId + '00');
  const maxId = parseInt(baseId + '99');
  const lines = {
    homepage: [],
    birthday: [],
    room: []
  };
  queryData.queryFromDatabase('SELECT use_type, description FROM unit_comments WHERE unit_id >= ? AND unit_id <= ?', [minId, maxId]).map(el => {
    const description = el.description.replace(/\\n/g, '\n');
    switch (el.use_type) {
      case 1:
        lines.homepage.push(description);
        break;
      case 2:
        lines.birthday.push(description);
        break;
    }
  });
  lines.room = queryData.queryFromDatabase('SELECT description FROM room_unit_comments WHERE unit_id >= ? AND unit_id <= ?', [minId, maxId]).map(el => el.description.replace(/\\n/g, '\n'));
  return lines;
}

async function respond (ctx, next) {
  try {
    const data = qs.parse(ctx.request.url.split('?')[1])
    if (!Object.keys(data).length) {
      const unitList = queryData.queryFromDatabase('SELECT DISTINCT CAST(SUBSTR(unit_id, 0, 5) AS INTEGER) AS baseid FROM unit_profile').map(el => el.baseid);
      logger4router.debug('<charaProfile> query result:', unitList);
      ctx.status = 200;
      ctx.body = {
        result: 'succeed',
        data: unitList
      };
      logger4router.debug('<charaProfile> respond:', ctx.status, ctx.body);
    } else {
      const unitId = parseInt(`${data.baseid}01`);
      const profile = queryData.queryFromDatabase('SELECT * FROM unit_profile WHERE unit_id = ?', unitId)[0];
      if (!profile) {
        ctx.status = 400;
        ctx.body = {
          result: 'failed',
          reason: '无法获取此ID的角色信息'
        };
        return;
      }
      delete profile.voice_id;
      delete profile.guild_id;
      profile.self_text = ['test', ''].includes(profile.self_text) ? '' : profile.self_text.replace(/\\n/g, '\n');
      const unitDataComments = queryData.queryFromDatabase('SELECT comment FROM unit_data WHERE unit_id = ?', unitId);
      profile.comment = unitDataComments.length > 0 ? unitDataComments[0].comment.replace(/\\n/g, '\n') : '';
      profile.lines = getUnitLines(data.baseid);
      profile.story_sub_titles = queryData.queryFromDatabase('SELECT sub_title FROM story_detail WHERE story_group_id = ?', parseInt(data.baseid)).map(el => el.sub_title);
      logger4router.debug('<charaProfile> query result:', profile);
      ctx.status = 200;
      ctx.body = {
        result: 'succeed',
        data: profile
      };
      logger4router.debug('<charaProfile> respond:', ctx.status, ctx.body);
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