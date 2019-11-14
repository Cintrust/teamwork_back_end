const Model = require('./model');

class UserModel extends Model {
  static initialize() {
    Model.tableName = 'users';
    Model.schema = [
      'first_name',
      'last_name',
      'email',
      'password',
      'gender',
      'job_role',
      'department',
      'address',
    ];
    Model.insertReturns = 'RETURNING *';
  }
}

UserModel.initialize();

module.exports = UserModel;
