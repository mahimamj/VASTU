import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Env vars: PAYU_KEY, PAYU_SALT, PAYU_BASE (test: https://test.payu.in, prod: https://secure.payu.in)
const PAYU_KEY = process.env.PAYU_KEY || '';
const PAYU_SALT = process.env.PAYU_SALT || '';

// Simple health check
app.get('/health', (_req, res) => {
  res.json({ ok: true, keyConfigured: Boolean(PAYU_KEY), saltConfigured: Boolean(PAYU_SALT) });
});

/*
Expected JSON body from frontend:
{
  txnid, amount, productinfo, firstname, email, phone, surl, furl, udf1..udf5
}
*/
app.post('/payu/hash', (req, res) => {
  try {
    const {
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      phone,
      surl,
      furl,
      udf1 = '',
      udf2 = '',
      udf3 = '',
      udf4 = '',
      udf5 = ''
    } = req.body || {};

    if (!PAYU_KEY || !PAYU_SALT) {
      return res.status(500).json({ error: 'PAYU credentials not configured' });
    }

    // Mandatory validations
    if (!txnid || !amount || !productinfo || !firstname || !email || !surl || !furl) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Hash sequence for PayU Money: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||salt
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

    return res.json({ key: PAYU_KEY, hash });
  } catch (e) {
    return res.status(500).json({ error: 'Hash generation failed' });
  }
});

const port = process.env.PORT || 5055;
app.listen(port, () => {
  console.log(`PayU hash server listening on http://localhost:${port}`);
});


