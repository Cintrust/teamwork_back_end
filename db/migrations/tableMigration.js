const db = require('../connection');

class TableMigration {
  constructor() {
    this.dropTable = '';
    this.createTable = '';
    this.tableName = '';
  }

  migrate(callback) {
    console.log(`migrating:  creating table ${this.tableName}`);
    return db.query(this.createTable, callback);
  }

  rollback(callback) {
    console.log(`rolling back:  dropping table ${this.tableName} `);
    return db.query(this.dropTable, callback);
  }
}


module.exports = TableMigration;
