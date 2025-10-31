# Google Sheets Integration Setup

This guide will help you set up automatic form data collection to Google Sheets.

## Method 1: Google Apps Script (Recommended - Free & Easy)

### Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Vastu Easy Form Submissions" (or any name you prefer)

### Step 2: Create Apps Script
1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete any existing code
3. Copy and paste the code from `google-apps-script.gs`
4. Save the script (Ctrl+S or Cmd+S)
5. Give it a name like "Form Handler"

### Step 3: Deploy as Web App
1. Click **Deploy** → **New Deployment**
2. Click the gear icon (⚙️) next to "Select type" → Choose **Web app**
3. Configure:
   - **Description**: "Vastu Easy Form Handler" (optional)
   - **Execute as**: **Me** (your Google account)
   - **Who has access**: **Anyone** (required for public form submissions)
4. Click **Deploy**
5. Authorize the script (if prompted):
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to [Your Project Name] (unsafe)**
   - Click **Allow**
6. **Copy the Web App URL** - it will look like:
   ```
   https://script.google.com/macros/s/AKfycbxxxxx/exec
   ```

### Step 4: Configure Netlify (For Production)
1. Go to your Netlify dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add a new variable:
   - **Key**: `GOOGLE_APPS_SCRIPT_URL`
   - **Value**: Paste the Web App URL from Step 3
4. Save

### Step 5: Test
1. Submit a form on your website
2. Check your Google Sheet - a new row should appear with the form data
3. The first row will automatically have headers:
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

## Method 2: Local Development

For local testing, form data will be logged to your server console.

1. Start your local server:
   ```bash
   cd server
   node payu-server.js
   ```

2. When forms are submitted, check the console for logged data.

3. To use Google Sheets in local development:
   - Add `GOOGLE_APPS_SCRIPT_URL` to your `.env` file
   - The server will forward data to Google Sheets

## Troubleshooting

### No data appearing in Google Sheets
- ✅ Check that the Apps Script is deployed as "Web app" (not API executable)
- ✅ Ensure "Who has access" is set to **Anyone**
- ✅ Verify the `GOOGLE_APPS_SCRIPT_URL` environment variable is set correctly
- ✅ Check Netlify function logs: **Site overview** → **Functions** → **View logs**

### CORS Errors
- The Netlify function handles CORS automatically
- Google Apps Script also handles CORS for web apps deployed with "Anyone" access

### Forms not submitting
- Check browser console (F12) for errors
- Verify your Netlify function is deployed
- Check that endpoints are correctly configured in `landing.html`

## Security Notes

- The Google Apps Script URL is public, but only accepts POST requests with form data
- Consider adding basic authentication if handling sensitive data
- Regularly review form submissions for spam

## Data Collection

Forms will collect data from:
1. **Consultation Form Modal** (Step 1) - When user clicks "Next → Payment"
2. **Payment Form** (Step 2) - When user initiates payment
3. **Contact Form** (Bottom of page) - When user submits contact form

All submissions include:
- Timestamp (automatically added)
- User-provided information
- Status (Form Submitted, Payment Initiated, etc.)

