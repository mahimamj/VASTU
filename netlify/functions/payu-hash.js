// Netlify Function: PayU hash generator
// Requires environment variables: PAYU_KEY, PAYU_SALT

const crypto = require('crypto');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const PAYU_KEY = process.env.PAYU_KEY || '';
    const PAYU_SALT = process.env.PAYU_SALT || '';
    if (!PAYU_KEY || !PAYU_SALT) {
      return { statusCode: 500, body: JSON.stringify({ error: 'PAYU credentials not configured' }) };
    }

    const body = JSON.parse(event.body || '{}');
    const {
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      phone = '',
      surl,
      furl,
      udf1 = '',
      udf2 = '',
      udf3 = '',
      udf4 = '',
      udf5 = ''
    } = body;

    if (!txnid || !amount || !productinfo || !firstname || !email || !surl || !furl) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
    }

    const fields = [
      PAYU_KEY,
      txnid,
      String(Number(amount).toFixed(2)),
      productinfo,
      firstname,
      email,
      udf1,
      udf2,
      udf3,
      udf4,
      udf5,
      '', '', '', '', '',
      PAYU_SALT
    ];
    const raw = fields.join('|');
    const hash = crypto.createHash('sha512').update(raw).digest('hex');

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: PAYU_KEY, hash })
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Hash generation failed' }) };
  }
};


