# Vastu Easy - Vastu Consultation Website

## Setup

### 1. PayU Payment Gateway
1) Copy `.env.example` to `.env` and fill your PayU credentials:
   - `PAYU_KEY=...`
   - `PAYU_SALT=...`
2) Install and run the hash server:
   ```bash
   npm install
   npm run dev
   ```
   The server runs on `http://localhost:5055`

### 2. Local Development
3) Open the site:
   ```bash
   python -m http.server 5510 --directory D:\PROJECTS\Vastu
   ```
   Or use any static file server on port 5510.

### 3. Google Sheets Integration (Form Data Collection)
Form submissions are automatically saved to Google Sheets. See `GOOGLE_SHEETS_SETUP.md` for detailed setup instructions.

**Quick Setup:**
1. Create a Google Sheet
2. Go to Extensions → Apps Script
3. Paste code from `google-apps-script.gs`
4. Deploy as Web App
5. Add `GOOGLE_APPS_SCRIPT_URL` to Netlify environment variables

**Forms that collect data:**
- Consultation Form (Modal) - When user proceeds to payment
- Payment Form - When payment is initiated
- Contact Form (Bottom of page) - When submitted

### 4. Netlify Deployment
- Functions are automatically deployed from `netlify/functions/`
- Set environment variables in Netlify dashboard:
  - `PAYU_KEY`
  - `PAYU_SALT`
  - `GOOGLE_APPS_SCRIPT_URL` (for form data collection)

## Features
- ✅ PayU payment gateway integration
- ✅ Google Sheets form data collection
- ✅ Mobile responsive design
- ✅ Multi-step consultation booking form
- ✅ Netlify Functions for serverless backend