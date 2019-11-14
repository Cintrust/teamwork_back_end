const db = require('../db/connection');
const { promisify } = require('../helpers/');

class Model {
  static initialize() {
    Model.tableName = '';
    Model.schema = [];
    Model.insertReturns = '';
  }

  static getInsertQry() {
    if (!(Model.tableName && Model.schema.length)) {
      throw new Error('missing parameter');
    }

    let $values = ' VALUES(';
    let $query = `INSERT INTO ${this.tableName} (`;
    let i = 0;
    for (; i < Model.schema.length - 1; i += 1) {
      $query += `${Model.schema[i]}, `;
      $values += `$${i + 1}, `;
    }
    $query += `${Model.schema[i]} `;
    $values += `$${i + 1} `;
    $query += `) ${$values} ) ${Model.insertReturns}`;
    return $query;
  }

  static insertOne(entry, callback) {
    return Model.insertMany([entry], callback);
  }

  static insertMany(entries, callback) {
    const values = [];
    for (let j = 0; j < entries.length; j += 1) {
      values.push([]);
      const entry = entries[j];
      if (typeof entry !== 'object') {
        throw new Error(`an object containing entry key-values is needed for entry no ${j}`);
      }

      for (let i = 0; i < Model.schema.length; i += 1) {
        if (typeof entry[Model.schema[i]] === 'undefined') {
          throw new Error(`key value for ${Model.schema[i]} is missing for entry no ${j}`);
        }
        values[j].push(entry[Model.schema[i]]);
      }
    }

    const qry = Model.getInsertQry();
    const insertHelper = (list, cb) => {
      const [item, ...items] = list;
      db.query(qry, item, (err, res) => {
        if (items.length) {
          insertHelper(items, cb);
        } else {
          cb(err, res);
        }
      });
    };
    const response = promisify(callback);
    insertHelper(values, response.callback);
    return response.result;
  }

  /*  static findOne(conditions, select, callback) {
    return Model.findCount(conditions, 1, select, callback);
  }

  static findCount(conditions, count = 500, select = ['*'], callback) {
    if (typeof conditions !== 'object') {
      throw new Error('an object containing condition key-values is needed for entry ');
    }

    let str = ' (';
    let t = 1;
    const values = [];

    for (const condition of Object.keys(conditions)) {
      str += ` ${t === 1 ? '' : 'AND'} ${condition}= $${t} `;
      values.push(conditions[condition]);
      t += 1;
    }


    str += ')';
    const qry = `SELECT ${select.join(',')} FROM ${Model.tableName} WHERE ${str} LIMIT ${count}`;

    return db.query(qry, values, callback);
  } */

  static query(qry, params, callback) {
    return db.query(qry, params, callback);
  }
}

Model.initialize();

module.exports = Model;
