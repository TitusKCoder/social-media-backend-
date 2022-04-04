const { connect, connection } = require('mongoose');

connect('mongodb://localhost/social-media-backend', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
