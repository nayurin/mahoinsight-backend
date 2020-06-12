const fs = require('fs');
const path = require('path');
const Getter = require(__dirname + '/getter.js');
const localconfig = require(`${__dirname}/configloader.js`);
const { logger4util } = require(`${__dirname}/../log4js`);

function cache2File(){
  const dirPath = path.resolve(__dirname, localconfig.cacheroot);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
  logger4util.debug('<cache> cache root:', dirPath);

  const chara = JSON.stringify(Getter._getCharaAll()), charaFile = `${dirPath}/cache_princess.json`;
  fs.writeFile(charaFile, chara, (e) => {
    if (e) {
      logger4util.error('<cache> write error on princess cache:', e);
    } else {
      logger4util.debug('<cache> finished writing princess cache:', charaFile);
    }
  });

  const item = JSON.stringify(Getter._getItemAll()), itemFile = `${dirPath}/cache_item.json`;
  fs.writeFile(itemFile, item, (e) => {
    if (e) {
      logger4util.error('<cache> write error on item cache:', e);
    } else {
      logger4util.debug('<cache> finished writing item cache:', itemFile);
    }
  });
  
  const quest = JSON.stringify(Getter._getQuestAll()), questFile = `${dirPath}/cache_quest.json`;
  fs.writeFile(questFile, quest, (e) => {
    if (e) {
      logger4util.error('<cache> write error on quest cache:', e);
    } else {
      logger4util.debug('<cache> finished writing quest cache:', questFile);
    }
  });
}

module.exports = cache2File;

cache2File();
