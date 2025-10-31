# Quick Setup Checklist

## ✅ Step 1: Deploy Google Apps Script
- [ ] Code is pasted in Apps Script editor
- [ ] Clicked "Deploy" → "New Deployment"
- [ ] Selected "Web app"
- [ ] Set "Execute as: Me"
- [ ] Set "Who has access: Anyone"
- [ ] Clicked "Deploy"
- [ ] Authorized the script
- [ ] **Copied the Web App URL**

## ✅ Step 2: Configure Netlify
1. Go to: https://app.netlify.com
2. Select your site
3. Go to: **Site settings** → **Environment variables**
4. Click **Add variable**
5. Add:
   - **Key**: `GOOGLE_APPS_SCRIPT_URL`
   - **Value**: [Paste your Web App URL here]
6. Click **Save**

## ✅ Step 3: Test
1. Visit your website
2. Fill out and submit a form
3. Check your Google Sheet - new row should appear!

## 🧪 Local Testing (Optional)
For local testing without Netlify:
1. Add to your `.env` file:
   ```
   GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ID/exec
   ```
2. Restart your server: `npm run dev`
3. Form data will be saved to Google Sheets!

---

**Note**: Without the `GOOGLE_APPS_SCRIPT_URL` configured, form data will still be logged (in Netlify logs or local console) but won't save to Google Sheets.

