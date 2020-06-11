const fs = require('fs');

let load = function (path) {
  try {
    let data = fs.readFileSync(path);
    return JSON.parse(data.toString())
  } catch (e) {
    console.log(e)
  }
}

module.exports.load = load;
