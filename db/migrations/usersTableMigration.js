const run = (query, client, callback) => client.query(query, (err, resp) => {
  console.log(err, resp);
  console.log('action done');
  callback(err, resp);
});
const usersTableMigration = {
  rollback: (client, callback) => {
    const dropTable = 'DROP TABLE IF EXISTS users CASCADE;';
    console.log('rolling back dropping table');
    return run(dropTable, client, callback);
  },
  migrate: (client, callback) => {
    const createTable = `CREATE TABLE users (
   id INT NOT NULL PRIMARY KEY,
   firstName VARCHAR (100) NOT NULL,
   lastName VARCHAR (100) NOT NULL,
   email VARCHAR (100)  NOT NULL UNIQUE,
   password VARCHAR (220)  NOT NULL,
   gender VARCHAR (20)  NOT NULL,
   jobRole VARCHAR (60)  NOT NULL,
   department VARCHAR (100)  NOT NULL,
   address VARCHAR (220)  NOT NULL
);`;
    return run(createTable, client, callback);
  },
};

module.exports = usersTableMigration;
