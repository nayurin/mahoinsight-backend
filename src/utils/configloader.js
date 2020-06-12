const fs = require('fs');
// const { logger4util } = require(`${__dirname}/../log4js`);

function load (path) {
  try {
    let data = fs.readFileSync(path);
    data = JSON.parse(data.toString());
    // logger4util.debug('<loadconfig> loaded:', data);
    return data;
  } catch (e) {
    // logger4util.error('<loadconfig> error:', e);
    console.error(e);
  }
}

const config = load(`${__dirname}/../../.local_config.json`);
// logger4util.debug('<loadconfig> loaded:', data);

module.exports = config;
