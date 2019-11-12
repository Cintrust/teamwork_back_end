require('dotenv').config();
const db = require('../../db/connection');

describe('Db', () => {
  it('test connection', (done) => {
    db.query('SELECT NOW() ', (err, res) => {
      const { rowCount, rows } = res;
      expect(err)
        .not
        .toBeDefined();
      expect(rowCount)
        .toEqual(1);
      expect(rowCount)
        .toEqual(rows.length);
      done();
      // pool.end();
    });
  });
});
