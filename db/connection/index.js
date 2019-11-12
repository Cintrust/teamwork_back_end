const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  // host: 'localhost',
  database: 'teamwork',
  // password: 'cintrust',
  // port: 3211,
});

module.exports = {
  query: (text, params, callback) => {
    const start = Date.now();
    return pool.query(text, params, (err, res) => {
      const duration = Date.now() - start;
      console.error('executed query', {
        text,
        duration,
        rows: res,
      });
      callback(err, res);
    });
  },
  getClient: (callback) => {
    pool.connect((err, client, done) => {
      callback(err, client, done);
    });
  },
};
