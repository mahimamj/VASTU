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

// Form data saving endpoint - forwards to Google Sheets via Apps Script
app.post('/save-form', async (req, res) => {
  try {
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL || '';
    const data = req.body || {};
    
    if (!GOOGLE_SCRIPT_URL) {
      // If no Google Script URL, just log the data
      console.log('Form submission:', JSON.stringify(data, null, 2));
      return res.json({ 
        success: true, 
        message: 'Data logged (configure GOOGLE_APPS_SCRIPT_URL to save to Sheets)' 
      });
    }

    // Forward to Google Apps Script
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    
    if (response.ok) {
      return res.json(result);
    } else {
      return res.status(500).json({ success: false, error: 'Failed to save to Google Sheets' });
    }
  } catch (error) {
    console.error('Error saving form:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

const port = process.env.PORT || 5055;
app.listen(port, () => {
  console.log(`PayU hash server listening on http://localhost:${port}`);
  console.log(`Form saving endpoint available at http://localhost:${port}/save-form`);
});


