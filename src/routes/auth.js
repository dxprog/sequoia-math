const {
  getGoogleAuthClient,
  getAuthToken
} = require('../google-sheets');

function redirectToAuth(req, res) {
  const client = getGoogleAuthClient();
  const authUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/spreadsheets.readonly'
    ]
  });
  res.location(authUrl).status(302).end();
}

async function authorize(req, res) {
  try {
    await getAuthToken(req.query.code);
    res.send('OK');
  } catch (err) {
    console.error('Error fetching auth token', err);
    res.status(500).end();
  }
}

module.exports = {
  redirectToAuth,
  authorize
};