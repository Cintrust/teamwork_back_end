const db = require('../../db/connection');

describe('Db', () => {
  it('contains spec with an expectation', (done) => {
    db.query('SELECT NOW() ', (err, { rowCount, rows }) => {
      // console.log('game');
      expect(err).not.toBeDefined();
      expect(rowCount).toEqual(1);
      expect(rowCount).toEqual(rows.length);
      done();
      // pool.end();
    });
  });
});
