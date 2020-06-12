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

// const Princess = require(__dirname + '/getPrincessInfo.js');
// const { Parser } = require('json2csv');
// const fs = require('fs');

// function exportSkillData (id) {
//   const prin = new Princess(id);
//   const fields = [
//     'action_id',
//     'class_id',
//     'action_type',
//     'action_detail_1',
//     'action_detail_2',
//     'action_detail_3',
//     'action_value_1',
//     'action_value_2',
//     'action_value_3',
//     'action_value_4',
//     'action_value_5',
//     'action_value_6',
//     'action_value_7',
//     'target_assignment',
//     'target_area',
//     'target_range',
//     'target_type',
//     'target_number',
//     'target_count',
//     'description',
//     'level_up_disp'
//   ];
//   prin._getPrincessSkillData();
//   for (const skill of Object.values(prin.skill)) {
//     if (!skill) continue
//     const filename = `${__dirname}/csv/${id}_${skill.name}.csv`;
//     const parser1 = new Parser({ fields });
//     const parser2 = new Parser({ fields });
//     skill.actions.action_list.forEach(x => {
//       parser1.parseOnce(x);
//     });
//     skill.actions.depend_action_list.forEach(x => {
//       parser2.parseOnce(x);
//     });
//     const newline = '\r\n';
//     const bom = '\ufeff';
//     const data = bom + parser1.parse() + newline + parser2.parse();
//     try {
//         fs.writeFile(filename, data, 'utf8', (e) => {
//           console.log(e ? `failed ${e}` : 'succeed')
//         });
//     } catch (e) {
//         console.error(e);
//     }
//   }
// }

// const charalist = Princess.list();
// charalist.forEach(x => {
//   exportSkillData(x);
// });

// exportSkillData(100101);

// var prin = new Princess(100101);
// prin._getPrincessSkillData();
// var d = prin.skill.union_burst.actions.depend_action_list

// var a = new Parser({fields});
// console.log(a.parse(d[1]))
