const fs = require('fs');
const path = require('path');
const commons = require(`${__dirname}/../commons.js`);
const { localconfig, Parser } = require(`${__dirname}/../../utils`);
const { logger4router } = require(`${__dirname}/../../log4js`);

let count = 1;

async function respond (ctx, next) {
  let date = new Date();
  date = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');
  const dirPath = path.resolve(localconfig.issuesroot, date);
  logger4router.debug('<newissue> dir path:', dirPath);
  const succ = { result: 'succeed' }
  const fail = { result: 'failed' }
  try {
    const data = await commons.parse(ctx);
    const bom = '\ufeff';
    const fields = Object.keys(data);
    const parser = new Parser({ fields });
    parser.parseOnce(data);
    const content = bom + parser.parse();
    try {
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        count = 1;
        logger4router.debug('<newissue> mkdir:', dirPath);
      }
      const filename = `${dirPath}/${count}.csv`
      fs.writeFile(filename, content, 'utf8', (e) => {
        if (e) {
          logger4router.error('<newissue> filename:', filename);
          logger4router.error('<newissue> content:', content);
          logger4router.error('<newissue> written error:', e);
        } else {
          logger4router.debug('<newissue> saved:', filename);
          count++;
        }
      });
      ctx.status = 200;
      ctx.body = succ;
      logger4router.debug('<newissue> respond:', ctx.status, ctx.body);
    } catch (e) {
      ctx.status = 400;
      ctx.body = fail;
      logger4router.error('<newissue> caught an error:', e);
    }
  } catch (e) {
    ctx.status = 400;
    ctx.body = fail;
    logger4router.error('<newissue> caught an error:', e);
  }
}

module.exports = {
  respond
}
