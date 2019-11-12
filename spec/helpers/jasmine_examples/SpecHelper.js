require('dotenv').config();
const userMigration = require('../../../db/migrations/usersTableMigration');
const pool = require('../../../db/connection');
afterAll(function (done) {

  userMigration.rollback(pool, () => {
    done();
  });

});
beforeAll(function (done) {

  userMigration.migrate(pool, () => {
    done();
  });
});

beforeEach(function () {
  jasmine.addMatchers({
    toBePlaying: function () {
      return {
        compare: function (actual, expected) {
          var player = actual;

          return {
            pass: player.currentlyPlayingSong === expected && player.isPlaying
          };
        }
      };
    }
  });
});
