require('dotenv')
  .config();
const userMigration = require('../../../db/migrations/usersTableMigration');
const userSeeder = require('../../../db/seeders/usersTableSeeder');

let server = null;
beforeAll(() => {
  server = require('../../../bin/www');
});
afterAll(() => {
  server.close();
});
afterAll((done) => {
  userMigration.rollback(() => {
    done();
  });
});
beforeAll((done) => {
  userMigration.migrate(() => {
    userSeeder.seed()
      .then(() => {
        done();
      });
  });
});

beforeEach(() => {
  jasmine.addMatchers({
    toBePlaying() {
      return {
        compare(actual, expected) {
          const player = actual;

          return {
            pass: player.currentlyPlayingSong === expected && player.isPlaying,
          };
        },
      };
    },
  });
});
