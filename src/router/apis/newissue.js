const fs = require('fs');
const path = require('path');
const parsePostData = require(`${__dirname}/../parsePostdata.js`);
const Parser = require(`${__dirname}/../../utils/obj2csv.js`);
const loadconfig = require(`${__dirname}/../../utils/loadconfig.js`);

let count = 1;
let date = new Date();
date = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');
const dirPath = path.join(__dirname, loadconfig.load(`${__dirname}/../../../.local_config.json`).config.issuesrootpath, date);

async function respond (ctx, next) {
  const succ = { result: 'succeed' }
  const fail = { result: 'failed' }
  try {
    const data = await parsePostData.parse(ctx);
    const bom = '\ufeff';
    const fields = Object.keys(data);
    const parser = new Parser({ fields });
    parser.parseOnce(data);
    const content = bom + parser.parse();
    try {
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        count = 1;
      }
      const filename = `${dirPath}/${count}.csv`
      fs.writeFile(filename, content, 'utf8', (e) => {
        if (e) {
          console.log(e);
        } else {
          console.log(`An new issue saved to ${filename}`)
          count++;
        }
      });
      ctx.status = 200;
      ctx.body = succ;
    } catch (e) {
        console.error(e);
        ctx.status = 400;
        ctx.body = fail;
    }
  } catch (e) {
    console.error(e);
    ctx.status = 400;
    ctx.body = fail;
  }
}

module.exports = {
  respond
}
