const { recordEntry } = require('../google/sheets');

const { spreadsheetId } = require('../../credentials');

async function submitEntry(req, res) {
  try {
    const result = await recordEntry(spreadsheetId, [
      '12345', 'Matt Hackmann', 'https://i.redd.it/ibfekrpn6ao41.jpg', Date.now()
    ]);

    if (result.status !== 200) {
      console.error('API error [submitRecord]: ', result);
      res.status(500).send();
    } else {
      res.json({ success: true });
    }
  } catch (err) {
    console.error('Uncaught error [submitRecord]: ', err);
    res.status(500).send();
  }
};

module.exports = {
  submitEntry
};