# Render Backend Deployment Guide

This guide will help you deploy the Vastu backend to Render.

## Prerequisites

1. A Render account (sign up at https://render.com)
2. Your PayU credentials (PAYU_KEY and PAYU_SALT)
3. Your Google Apps Script URL (if using Google Sheets integration)

## Step 1: Prepare Your Repository

1. Make sure your code is pushed to a Git repository (GitHub, GitLab, or Bitbucket)
2. Ensure `render.yaml` is in the root of your repository

## Step 2: Deploy to Render

### Option A: Using Render Dashboard (Recommended)

1. Log in to your Render dashboard
2. Click **"New +"** → **"Web Service"**
3. Connect your Git repository
4. Render will auto-detect the `render.yaml` file, or configure manually:
   - **Name**: `vastu-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server/payu-server.js`
   - **Plan**: Free (or choose a paid plan)

### Option B: Using Render CLI

```bash
# Install Render CLI
npm install -g render-cli

# Login to Render
render login

# Deploy using render.yaml
render deploy
```

## Step 3: Configure Environment Variables

In your Render dashboard, go to your service → **Environment** tab and add:

1. **PAYU_KEY**: Your PayU merchant key
2. **PAYU_SALT**: Your PayU salt value
3. **GOOGLE_APPS_SCRIPT_URL**: Your Google Apps Script web app URL (optional, for Google Sheets integration)

## Step 4: Get Your Backend URL

After deployment, Render will provide you with a URL like:
- `https://vastu-backend.onrender.com` (or your custom domain)

## Step 5: Update Frontend Configuration

1. Open `landing.html`
2. Find the `BACKEND_URL` configuration (around line 1417)
3. Replace `'https://YOUR-RENDER-APP.onrender.com'` with your actual Render backend URL:

```javascript
const BACKEND_URL = (() => {
    const hostname = location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:5055';
    }
    return 'https://vastu-backend.onrender.com'; // Your Render URL
})();
```

## Step 6: Test Your Backend

Test the health endpoint:
```bash
curl https://your-backend-url.onrender.com/health
```

You should see:
```json
{
  "ok": true,
  "keyConfigured": true,
  "saltConfigured": true
}
```

## Troubleshooting

### Backend not starting
- Check the **Logs** tab in Render dashboard
- Ensure all environment variables are set correctly
- Verify `package.json` has all required dependencies

### CORS errors
- The backend already has CORS enabled for all origins
- If you need to restrict, modify `server/payu-server.js`

### Environment variables not working
- Make sure variables are set in Render dashboard (not just in `render.yaml`)
- Restart the service after adding new environment variables

## API Endpoints

Your backend will have the following endpoints:

- `GET /health` - Health check
- `POST /payu/hash` - Generate PayU payment hash
- `POST /save-form` - Save form data to Google Sheets

## Free Tier Limitations

- Services may spin down after 15 minutes of inactivity
- First request after spin-down may take 30-50 seconds
- Consider upgrading to a paid plan for production use

## Next Steps

After deploying the backend:
1. Update the frontend with your Render backend URL
2. Deploy frontend to Hostinger (see HOSTINGER_DEPLOYMENT.md)
3. Test the complete flow end-to-end

