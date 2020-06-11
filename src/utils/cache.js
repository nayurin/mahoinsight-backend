const fs = require('fs');
const path = require('path');
const Getter = require(__dirname + '/getter.js');

const dirPath = path.join(__dirname, '/../../frontend/public/cached');
if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);

function cache2File(){
  let chara = JSON.stringify(Getter._getCharaAll()), charaFile = `${dirPath}/cache_princess.json`;
  let item = JSON.stringify(Getter._getItemAll()), itemFile = `${dirPath}/cache_item.json`;
  let quest = JSON.stringify(Getter._getQuestAll()), questFile = `${dirPath}/cache_quest.json`;
  fs.writeFileSync(charaFile, chara);
  fs.writeFileSync(itemFile, item);
  fs.writeFileSync(questFile, quest);
}

module.exports.cache2File = cache2File;

cache2File();
