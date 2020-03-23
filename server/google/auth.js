const fs = require('fs');
const { google } = require('googleapis');
const path = require('path');

const CREDENTIALS_FILE = path.resolve('credentials.json');

let config = {};
let googleClient;

function setGoogleAuthCredentials(credentials, token) {
  config.credentials = credentials;

  if (token) {
    googleClient = getGoogleAuthClient();
    googleClient.setCredentials(token);
  }
}

function getGoogleAuthClient() {
  googleClient = googleClient || new google.auth.OAuth2(
    config.credentials.client_id,
    config.credentials.client_secret,
    config.credentials.redirect_uri
  );

  return googleClient;
}

async function getAuthToken(code) {
  const googleClient = getGoogleAuthClient();

  return new Promise((resolve, reject) => {
    googleClient.getToken(code, (err, token) => {
      if (!err) {
        googleClient.setCredentials(token);
        const credentialsFile = require(CREDENTIALS_FILE);
        credentialsFile.token = token;
        fs.writeFile(
          CREDENTIALS_FILE,
          JSON.stringify(credentialsFile),
          err => {
            if (!err) {
              resolve();
            } else {
              console.error(err);
              reject(err);
            }
          });
      } else {
        console.error(err);
        reject(err);
      }
    });
  });
}

module.exports = {
  setGoogleAuthCredentials,
  getGoogleAuthClient,
  getAuthToken
};
