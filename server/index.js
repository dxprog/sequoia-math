const express = require('express');
const http = require('http');
const cors = require('cors');

const { submitEntry } = require('./routes/entry');
const { redirectToAuth, authorize } = require('./routes/auth');
const { 'no-redirect': googleCredentials, token } = require('../credentials');
const { setGoogleAuthCredentials } = require('./google/auth');

setGoogleAuthCredentials(googleCredentials, token);

const app = express();
app.use('/static', express.static('static'));
app.use(cors());
app.use(express.json());
const server = http.createServer(app);

const PORT = 8081;

server.listen(PORT, err => {
  if (!err) {
    console.log(`Listening on port ${PORT}`);
    app.post('/submit-entry', submitEntry);
    app.get('/authorize', redirectToAuth);
    app.get('/oauth', authorize);
  } else {
    console.error(`Couldn't bind to port ${PORT}: `, err);
  }
});
