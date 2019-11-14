const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(
      (hash) => {
        const data = {};
        data.first_name = req.body.firstName;
        data.last_name = req.body.lastName;
        data.email = req.body.email;
        data.gender = req.body.gender;
        data.password = hash;
        data.job_role = req.body.jobRole;
        data.department = req.body.department;
        data.address = req.body.address;

        UserModel.insertOne(data)
          .then(({ rows }) => {
            const token = jwt.sign(
              {
                userId: rows[0].id,
                firstName: rows[0].first_name,
                lastName: rows[0].last_name,
                email: rows[0].email,

              },
              process.env.SECRET,
              { expiresIn: '24h' },
            );
            res.status(200)
              .json({
                status: 'success',
                data: {
                  message: 'User account successfully created',
                  token,
                  userId: rows[0].id,
                },
              });
          });
      },
    )
    .catch(() => {
      res.status(500)
        .json({
          status: 'error',
          error: 'unable to store user password',
        });
    });
};
