# Fix: Data Not Being Collected in Google Sheets

## Problem
The form is working, but data is not being saved to Google Sheets. This is because the `GOOGLE_APPS_SCRIPT_URL` environment variable is not configured in Render.

## Solution: Configure Google Apps Script URL in Render

### Step 1: Get Your Google Apps Script URL

1. **Open your Google Sheet** (the one you want to save data to)
   - URL: `https://docs.google.com/spreadsheets/d/1WOG_f5VQa2J3ROjQi6PPVPDAHHv3_DzQNhvQFiHDrlo/edit`

2. **Open Apps Script Editor**
   - Go to **Extensions** → **Apps Script**
   - Or visit: `https://script.google.com/home/projects`

3. **Deploy as Web App**
   - Click **Deploy** → **New Deployment**
   - Click the gear icon (⚙️) next to "Select type"
   - Choose **Web app**
   - Fill in:
     - **Description**: "Vastu Form Handler"
     - **Execute as**: Me (your email)
     - **Who has access**: Anyone
   - Click **Deploy**
   - **Copy the Web App URL** (it will look like: `https://script.google.com/macros/s/.../exec`)

### Step 2: Set Environment Variable in Render

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com
   - Find your **VASTU** service

2. **Open Environment Settings**
   - Click on your service
   - Go to **Environment** tab (in the left sidebar)
   - Or click **Environment** under "MANAGE" section

3. **Add Environment Variable**
   - Click **Add Environment Variable**
   - **Key**: `GOOGLE_APPS_SCRIPT_URL`
   - **Value**: Paste your Google Apps Script Web App URL (from Step 1)
   - Click **Save Changes**

4. **Redeploy (if needed)**
   - Render will automatically redeploy when you save environment variables
   - Or click **Manual Deploy** → **Deploy latest commit**

### Step 3: Verify the Setup

1. **Check Render Logs**
   - Go to **Logs** tab in Render
   - Look for: `GOOGLE_APPS_SCRIPT_URL configured: true`

2. **Test the Form**
   - Fill out the form on your website
   - Submit it
   - Check your Google Sheet - data should appear within a few seconds

3. **Check Browser Console**
   - Open browser console (F12)
   - Look for API responses from `/save-form`
   - You should see: `Form data saved successfully`

## Troubleshooting

### If data still doesn't appear:

1. **Check Render Logs**
   - Look for errors in the logs
   - Check if the Google Apps Script URL is being called

2. **Test Google Apps Script Directly**
   - Use a tool like Postman or curl to test:
   ```bash
   curl -X POST "YOUR_GOOGLE_SCRIPT_URL" \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","city":"Test City"}'
   ```

3. **Check Google Apps Script Execution**
   - Go to Apps Script editor
   - Click **Executions** (clock icon) to see if requests are being received
   - Check for any errors

4. **Verify Sheet Permissions**
   - Make sure the Google Sheet is accessible
   - The Apps Script should have permission to edit the sheet

## Quick Checklist

- [ ] Google Apps Script is deployed as Web App
- [ ] Web App URL is copied
- [ ] `GOOGLE_APPS_SCRIPT_URL` is set in Render environment variables
- [ ] Render service has been redeployed
- [ ] Tested form submission
- [ ] Checked Google Sheet for new data
- [ ] Checked Render logs for errors

## Expected Data Format

The data saved to Google Sheets will have these columns:
- Timestamp
- Full Name (from `name` field)
- City (from `city` field)
- Email (from `email` field)
- Phone (from `phone` field)
- Date of Birth (from `dob` field)
- Vastu Questions (from `questions` field)
- Payment Method (from `paymentMethod` field)
- Amount (from `amount` field)
- Status (from `status` field)
- Merchant Phone (hardcoded: 9873182466)

