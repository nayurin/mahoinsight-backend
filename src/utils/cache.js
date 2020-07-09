const fs = require('fs');
const path = require('path');
const Getter = require(__dirname + '/getter.js');
const localconfig = require(`${__dirname}/configloader.js`);
const { logger4util } = require(`${__dirname}/../log4js`);

function cache2File(){
  const dirPath = path.resolve(__dirname, localconfig.cacheroot);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
  logger4util.debug('<cache> cache root:', dirPath);
  const getter = new Getter({});

  const mapping = {
    chara: {
      get: getter._getCharaAll,
      file: `${dirPath}/cache_princess.json`
    },
    item: {
      get: getter._getItemAll,
      file: `${dirPath}/cache_item.json`
    },
    quest: {
      get: getter._getQuestAll,
      file: `${dirPath}/cache_quest.json`
    },
    clanbattle: {
      get: getter._getClanBattleAll,
      file: `${dirPath}/cache_clanbattle.json`
    }
  }

  const write = (type) => {
    const filename = mapping[type].file;
    const content = JSON.stringify(mapping[type].get.call(getter));
    fs.writeFile(filename, content, e => {
      if (e) {
        logger4util.error(`<cache> write error on ${type} cache: ${e}`);
      } else {
        logger4util.debug(`<cache> finished writing ${type} cache: ${filename}`);
      }
    })
  }

  write('chara');
  write('item');
  write('quest');
  write('clanbattle');
}

module.exports = cache2File;

cache2File();
