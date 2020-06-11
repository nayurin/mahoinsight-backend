class Parser {
  constructor (opts) {
    this.fields = Object.prototype.toString.call(opts.fields) === '[object Array]' ? opts.fields : null;
    this.newline = opts.newline || '\r\n';
    this.count = 1;
    this.result = new Array();
  }

  parseOnce (data) {
    if (!this.fields || typeof(data) === 'undefined') return null;
    const _result = new Array();
    if (['number', 'string'].includes(typeof(data))) {
      this.result.push(`${this.count},${data}${this.newline}`);
      this.count++;
      return `${this.count}${data}${this.newline}`
    }
    for (const key of Object.keys(data)) {
      if (this.fields.includes(key)) _result.push(data[key]);
    }
    const result = `${this.count},${_result.join(',')}${this.newline}`;
    this.result.push(result);
    this.count++
    return result;
  }

  parseHeader () {
    const fields = this.fields;
    if (!fields) return null;
    if (fields[0] !== '#seq') fields.unshift('#seq');
    if (!/^#seq/.test(this.result)) this.result.unshift(`${fields.join(',')}${this.newline}`)
    return `${fields.join(',')}${this.newline}`
  }

  parse () {
    this.parseHeader();
    return this.result.join('');
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
