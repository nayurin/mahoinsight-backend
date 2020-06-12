module.exports = {
  localconfig: require(`${__dirname}/configloader.js`),
  sqliteutil: require(`${__dirname}/sqliteutil.js`),
  Parser: require(`${__dirname}/obj2csv.js`)
}
