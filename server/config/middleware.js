const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

module.exports = (app, express) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan('dev'));
  app.use(express.static(path.join(__dirname, '/../../client')));
};
