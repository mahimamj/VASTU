# ✅ Google Sheets Integration - Setup Complete!

## Your Configuration

**Google Apps Script URL:**
```
https://script.google.com/macros/s/AKfycbyOAIEBkMTku5Y03OZ8Vbw-2g789i_NTTQ5ZWb8Px0iR5TZxsk6PnQR59inund1ChfGYA/exec
```

**Netlify Environment Variable:**
- Key: `GOOGLE_APPS_SCRIPT_URL`
- Value: [Your Apps Script URL above]

## ✅ Setup Checklist

- [x] Google Apps Script code created
- [x] Google Apps Script deployed as Web App
- [x] Web App URL obtained
- [ ] **Netlify environment variable configured** ← You're here!
- [ ] Test form submission
- [ ] Verify data appears in Google Sheet

## Next Steps

1. **Add the URL to Netlify** (see instructions below)
2. **Wait for Netlify to redeploy** (happens automatically)
3. **Test by submitting a form** on your website
4. **Check your Google Sheet** - you should see a new row with the form data!

## Testing

Once configured, every form submission will:
1. Send data to Netlify Function (`/.netlify/functions/save-to-sheets`)
2. Forward to Google Apps Script
3. Save to your Google Sheet with:
   - Timestamp
   - Full Name
   - City
   - Email
   - Phone
   - Date of Birth
   - Vastu Questions
   - Payment Method
   - Amount
   - Status

## Forms That Collect Data

- ✅ Consultation Form (Modal) - When user clicks "Next → Payment"
- ✅ Payment Form - When payment is initiated
- ✅ Contact Form (Bottom of page) - When submitted

## Troubleshooting

**If data isn't appearing:**
- Check Netlify Function logs: Site → Functions → View logs
- Verify environment variable is set in Netlify
- Ensure Google Sheet exists and script has access
- Check browser console for errors

