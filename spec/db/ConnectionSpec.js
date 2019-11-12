const db = require('../../db/connection');

describe('Db', () => {
  console.log(process.env.DB_NAME,'milk');

  it('contains spec with an expectation', (done) => {
    db.query('SELECT NOW() ', (err, res) => {
      console.log(err,'ww');
      const {rowCount,rows} = res;
      expect(err).not.toBeDefined();
      expect(rowCount).toEqual(1);
      expect(rowCount).toEqual(rows.length);
      done();
      // pool.end();
    });
  });
});
