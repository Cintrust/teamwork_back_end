const TableSeeder = require('./tableSeeder');
const UserModel = require('../../models/userModel');

class UsersTableSeeder extends TableSeeder {
  constructor() {
    super();

    this.data = [
      {
        first_name: 'junior',
        last_name: 'trust',
        email: 'cint@cint.com',
        password: '$2b$10$MAe3WFkw1Ar5cPJdm.e.ZeQrZ3ZrOYPFK8tx/giTJ.qjRCPrWGYg2',
        gender: 'male',
        job_role: 'admin',
        department: 'comp',
        address: 'address',
      },
      {
        first_name: 'junior',
        last_name: 'trust',
        email: 'cint@ci.com',
        password: '$2b$10$MAe3WFkw1Ar5cPJdm.e.ZeQrZ3ZrOYPFK8tx/giTJ.qjRCPrWGYg2',
        gender: 'male',
        job_role: 'admin',
        department: 'comp',
        address: 'address',
      },

    ];
  }

  seed(callback) {
    return UserModel.insertMany(this.data, callback);
  }
}


module.exports = new UsersTableSeeder();
