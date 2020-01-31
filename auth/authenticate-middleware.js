/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config/secrets.js')

module.exports = (req, res, next) => {
  const token = req.headers.token;

  if(token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if(err) {
        res.status(401).json({ err: 'invalid token' })
      } else {
        req.user = { 
          name: decodedToken.username,
          type: decodedToken.type
        };

        next();
      }
    })
  } else {
    res.status(401).json({ err: 'missing token' })
  }
};
