const { check, validationResult } = require('express-validator');
const db = require('../db/connection');

class Validator {
  constructor(field) {
    this.validatorInstance = check(field);
  }

  isString() {
    this.validatorInstance.isString()
      .withMessage('should be a valid string')
      .bail();
    return this;
  }

  isEmail() {
    this.validatorInstance.isEmail()
      .withMessage('valid email is required')
      .bail();
    return this;
  }

  isLengthGreaterThan(length) {
    this.validatorInstance.isLength({ min: length })
      .withMessage(` value length should be greater than ${length}`)
      .bail();
    return this;
  }

  isLengthLessThan(length) {
    this.validatorInstance.isLength({ max: length })
      .withMessage(` value length should be less than ${length}`)
      .bail();
    return this;
  }

  isIn(values) {
    this.validatorInstance.isIn(values)
      .withMessage(`provided value should one of the following ${values.join(', ')}`);
    return this;
  }

  isUnique(table, column) {
    this.validatorInstance.custom((value) => db.query(`SELECT count(*) FROM ${table} WHERE  ${column} = $1`, [value])
      .then((res) => {
        if (Number(res.rows[0].count)) {
          return Promise.reject(new Error('E-mail already in use'));
        }
        return true;
      }));
    return this;
  }
}


module.exports = {
  Validator,
  runValidation: (validations) => async (req, res, next) => {
    // await Promise.all(validations.map((validation) => validation.run(req)));


    const helper = (list) => {
      const [current, ...remaining] = list;
      if (current) {
        current.validatorInstance.run(req)
          .then(() => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(422)
                .json({ errors: `${errors.array()[0].param}: ${errors.array()[0].msg}` });
            }
            if (remaining.length) {
              // console.log(remaining,remaining.length,'valid');
              return helper(remaining);
            }
            return next();
          })
          .catch(() => res.status(422)
            .json({ errors: 'input: data could not be validated' }));
      }
    };

    // console.log(validations);

    helper(validations);
  },
};
