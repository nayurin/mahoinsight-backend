const { logger4util } = require(`${__dirname}/../log4js`);

class Parser {
  constructor (opts) {
    this.fields = Object.prototype.toString.call(opts.fields) === '[object Array]' ? opts.fields : null;
    this.newline = opts.newline || '\r\n';
    this.count = 1;
    this.result = new Array();
    logger4util.debug('<obj2csv> options:', opts);
  }

  parseOnce (data) {
    if (!this.fields || typeof(data) === 'undefined') return null;
    let line = '';
    let _result = new Array();
    if (['number', 'string'].includes(typeof(data))) {
      line = `${this.count},${JSON.stringify(data)}`;
      this.result.push(`${line}${this.newline}`);
      this.count++;
      logger4util.trace('<obj2csv> parsing single line:', line);
      return line;
    }
    for (const key of Object.keys(data)) {
      if (this.fields.includes(key)) _result.push(data[key]);
    }
    _result = JSON.stringify(_result);
    _result = _result.substring(1, _result.length - 1);
    line = `${this.count},${_result}`;
    this.result.push(`${line}${this.newline}`);
    this.count++
    logger4util.trace('<obj2csv> parsing single line:', line);
    return line;
  }

  parseHeader () {
    let fields = this.fields;
    if (!fields) return null;
    if (fields[0] !== '#seq') fields.unshift('#seq');
    fields = JSON.stringify(fields);
    fields = fields.substring(1, fields.length - 1);
    if (!/^#seq/.test(this.result)) this.result.unshift(`${fields}${this.newline}`);
    logger4util.trace('<obj2csv> parsing header:', fields);
    return fields;
  }

  parse () {
    this.parseHeader();
    const result = this.result.join('');
    logger4util.debug('<obj2csv> parse result:', result);
    return result;
  }
}

module.exports = Parser;
