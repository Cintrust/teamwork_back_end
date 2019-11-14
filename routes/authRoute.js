const express = require('express');
const authCtrl = require('../controllers/authController');
const authWare = require('../middleware/authMiddleware.js');
const { Validator, runValidation } = require('../middleware/inputValidation');

const router = express.Router();


const create_user_input_validation = [
  new Validator('firstName').isString()
    .isLengthGreaterThan(3)
    .isLengthLessThan(100),
  new Validator('lastName').isString()
    .isLengthGreaterThan(3)
    .isLengthLessThan(100),
  new Validator('email').isEmail()
    .isLengthGreaterThan(3)
    .isLengthLessThan(100)
    .isUnique('users', 'email'),
  new Validator('password').isString()
    .isLengthGreaterThan(5)
    .isLengthLessThan(30),
  new Validator('gender').isString()
    .isIn(['male', 'female']),
  new Validator('jobRole').isString()
    .isIn(['admin', 'user']),
  new Validator('department').isString()
    .isLengthGreaterThan(3)
    .isLengthLessThan(200),
  new Validator('address').isString()
    .isLengthGreaterThan(3)
    .isLengthLessThan(200),
];

const login_input_validation = [
  new Validator('password').isString()
    .isLengthGreaterThan(5)
    .isLengthLessThan(30),
  new Validator('email').isEmail()
    .isLengthGreaterThan(3)
    .isLengthLessThan(100)
    .isExisting('users', 'email'),
];
router.post('/create-user', authWare.adminAuth, runValidation(create_user_input_validation), authCtrl.createUser);
router.post('/signin', runValidation(login_input_validation), authCtrl.signInUser);
module.exports = router;
