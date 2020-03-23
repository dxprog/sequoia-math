const { google } = require('googleapis');

const { getGoogleAuthClient } = require('../google/auth');

async function recordEntry(spreadsheetId, values) {
  const auth = getGoogleAuthClient();
  return new Promise((resolve, reject) => {
    const sheets = google.sheets({ version: 'v4', auth });
    sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A1:D',
      valueInputOption: 'USER_ENTERED',
      resource: { values: [ values ] }
    }, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
}

module.exports = {
  recordEntry
};
