const jwt = require('jsonwebtoken');
const db = require('../db/connection');

exports.adminAuth = (req, res, next) => {
  try {
    const { token } = req.headers;


    const decodedToken = jwt.verify(token, process.env.SECRET);
    const { userId } = decodedToken;
    db.query('SELECT * FROM users WHERE id =$1 ', [userId], (err, result) => {
      if (err) {
        return res.status(403)
          .json({
            status: 'error',
            error: 'action is forbidden',
          });
      }
      if (result.rowCount === 1 && result.rows[0].job_role === 'admin') {
        return next();
      }

      return res.status(403)
        .json({
          status: 'error',
          error: 'action is forbidden!',
        });
    });
  } catch (e) {
    return res.status(400)
      .json({
        status: 'error',
        error: 'Invalid token!',
      });
  }
  return res;
};
