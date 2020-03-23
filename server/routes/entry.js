const seedrandom = require('seedrandom');

const { recordEntry } = require('../google/sheets');

const REQUIRED_FIELDS = [
  'id',
  'images',
  'studentName',
  'studentId',
  'teacherName'
];

function isNumeric(val) {
  return val - 0 == val;
}

function validateRequest(params) {
  // required field validation
  const hasRequiredFields = REQUIRED_FIELDS.reduce((prev, curr) => {
    return prev && !!params[curr];
  }, true);
  if (!hasRequiredFields) {
    return false;
  }

  // data type validation
  return (
    Array.isArray(params.images) &&
    isNumeric(params.studentId) &&
    params.studentId.length === 6
  );
}

async function submitEntry(req, res) {
  if (!validateRequest(req.body)) {
    console.error('[submitRecord] Invalid request body', req.body);
    res.status(200).json({
      success: false,
      reason: 'validation'
    });
    return;
  }

  const json = req.body;
  const studentId = parseInt(json.studentId);
  const rng = seedrandom(studentId);
  const imageIndex = Math.floor(rng() * json.images.length);
  const date = new Date();

  try {
    const result = await recordEntry(json.id, [
      `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
      studentId,
      json.studentName,
      json.teacherName,
      imageIndex + 1,
      json.images[imageIndex]
    ]);

    if (!result.status === 200) {
      console.error('[submitRecord] API append failure', result);
      res.status(200).json({
        success: false,
        reason: 'API'
      });
      return;
    }
  } catch (err) {
    console.error('[submitRecord] Uncaught promise exception', result);
    res.status(200).json({
      success: false,
      reason: 'exception'
    });
    return;
  }

  res.json({
    success: true,
    image: json.images[imageIndex]
  });
};

module.exports = {
  submitEntry
};
