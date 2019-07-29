const crypto = require('crypto');
const timingSafeCompare = require('tsscmp');
const getRawBody = require('raw-body');
const moment = require('moment');

const TIMESTAMP_WINDOW_MS = 1000 * 60 * 5;

const isVerified = async (req) => {
  const signature = req.headers['x-slack-signature'];
  const timestamp = req.headers['x-slack-request-timestamp'];

  if (!signature || !timestamp) return false;

  const hmac = crypto.createHmac('sha256', process.env.SLACK_SIGNING_SECRET);
  const [version, hash] = signature.split('=');

  // Replay attack protection
  if (Math.abs(moment().unix() - Number(timestamp)) > TIMESTAMP_WINDOW_MS) return false;

  const rawBody = await getRawBody(req, {
    length: req.headers['content-length'],
    limit: '1mb',
    encoding: true,
  });
  hmac.update(`${version}:${timestamp}:${rawBody}`);

  // Request signature verification
  return timingSafeCompare(hmac.digest('hex'), hash);
};

module.exports = {
  isVerified,
};
