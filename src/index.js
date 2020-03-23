const express = require('express');
const http = require('http');

const getWork = require('./routes/get-work');
const { redirectToAuth, authorize } = require('./routes/auth');
const { 'no-redirect': googleCredentials, token } = require('../credentials');
const { setGoogleAuthCredentials } = require('./google-sheets');

setGoogleAuthCredentials(googleCredentials, token);

const app = express();
app.use('/static', express.static('public'));
const server = http.createServer(app);

const PORT = 8081;

server.listen(PORT, err => {
  if (!err) {
    console.log(`Listening on port ${PORT}`);
    app.post('/get-work', getWork);
    app.get('/authorize', redirectToAuth);
    app.get('/oauth', authorize);
  } else {
    console.error(`Couldn't bind to port ${PORT}: `, err);
  }
});
