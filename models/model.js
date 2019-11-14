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
}

Model.initialize();

module.exports = Model;
