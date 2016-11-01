const jwt = require('jsonwebtoken');
const secret = require('./config.js').secret;

module.exports = (req, res, next) => {
  console.log('req.headers', req.headers);
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secret, (err) => {
      if (err) {
        res.status(404).end('Failed to authenticate token');
      } else {
        next();
      }
    });
  } else {
    res.status(403).end('No token provided');
  }
};
