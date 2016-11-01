const express = require('express');

const app = express();

require('./config/connection.js');
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
