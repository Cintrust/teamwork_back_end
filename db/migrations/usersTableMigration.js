const Migration = require('./tableMigration');

class UsersTableMigration extends Migration {
  constructor() {
    super();
    this.tableName = 'users';
    this.dropTable = 'DROP TABLE IF EXISTS users CASCADE';
    this.createTable = `CREATE TABLE If NOT EXISTS users  (
   id SERIAL PRIMARY KEY,
   first_name VARCHAR (100) NOT NULL,
   last_name VARCHAR (100) NOT NULL,
   email VARCHAR (100)  NOT NULL UNIQUE,
   password VARCHAR (220)  NOT NULL,
   gender VARCHAR (20)  NOT NULL,
   job_role VARCHAR (60)  NOT NULL,
   department VARCHAR (100)  NOT NULL,
   address VARCHAR (220)  NOT NULL
    );`;
  }
}

module.exports = new UsersTableMigration();
