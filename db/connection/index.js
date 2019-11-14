const { Pool } = require('pg');
const { promisify } = require('../../helpers');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  // port: 3211,
});


module.exports = {
  query: (text, params, callback) => {
    let cb = callback;
    let values = params;

    // allow plain text query without values
    if (typeof values === 'function') {
      cb = values;
      values = undefined;
    }
    const response = promisify(cb);
    cb = response.callback;
    const start = Date.now();


    // let mid = null;
    // if (callback) {
    //   mid = [params, helper];
    // } else {
    //   mid = [helper];
    // }
    pool.query(text, values, (err, res) => {
      const duration = Date.now() - start;

      if (err) {
        console.error('executed query', {
          text,
          duration,
          error: err,
        });
      } else {
        console.log('executed query', {
          text,
          duration,
          rows: res.rowCount,
        });
      }

      cb(err, res);
    });
    return response.result;
  },
  getClient: (callback) => {
    pool.connect((err, client, done) => {
      callback(err, client, done);
    });
  },
};
