# Deployment Migration Summary

## Overview

Your Vastu project has been configured to deploy:
- **Backend**: Render (Node.js/Express server)
- **Frontend**: Hostinger (Static HTML files)

## What Changed

### 1. Backend Server (`server/payu-server.js`)
- ✅ Updated `/save-form` endpoint to integrate with Google Sheets via Apps Script
- ✅ Maintains compatibility with existing PayU hash generation
- ✅ Ready for Render deployment

### 2. Frontend (`landing.html`)
- ✅ Removed Netlify Functions dependencies
- ✅ Added configurable `BACKEND_URL` variable
- ✅ Updated all API calls to use Render backend
- ✅ Maintains localhost support for development

### 3. New Files Created
- ✅ `render.yaml` - Render deployment configuration
- ✅ `RENDER_DEPLOYMENT.md` - Step-by-step Render deployment guide
- ✅ `HOSTINGER_DEPLOYMENT.md` - Step-by-step Hostinger deployment guide

## Migration Steps

### Step 1: Deploy Backend to Render
1. Follow instructions in `RENDER_DEPLOYMENT.md`
2. Get your Render backend URL (e.g., `https://vastu-backend.onrender.com`)
3. Configure environment variables in Render dashboard:
   - `PAYU_KEY`
   - `PAYU_SALT`
   - `GOOGLE_APPS_SCRIPT_URL` (optional)

### Step 2: Update Frontend Configuration
1. Open `landing.html`
2. Find `BACKEND_URL` configuration (line ~1423)
3. Replace `'https://YOUR-RENDER-APP.onrender.com'` with your actual Render URL

### Step 3: Deploy Frontend to Hostinger
1. Follow instructions in `HOSTINGER_DEPLOYMENT.md`
2. Upload frontend files to Hostinger `public_html`
3. Test the complete flow

## API Endpoints

Your Render backend will expose:

- `GET /health` - Health check endpoint
- `POST /payu/hash` - Generate PayU payment hash
- `POST /save-form` - Save form data to Google Sheets

## Configuration Reference

### Backend URL Configuration (landing.html)

```javascript
const BACKEND_URL = (() => {
    const hostname = location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:5055';
    }
    return 'https://YOUR-RENDER-APP.onrender.com'; // Update this!
})();
```

### Environment Variables (Render)

| Variable | Required | Description |
|----------|----------|-------------|
| `PAYU_KEY` | Yes | PayU merchant key |
| `PAYU_SALT` | Yes | PayU salt value |
| `GOOGLE_APPS_SCRIPT_URL` | No | Google Apps Script URL for Sheets integration |

## Testing Checklist

- [ ] Backend health check works (`/health`)
- [ ] PayU hash generation works (`/payu/hash`)
- [ ] Form submission saves to Google Sheets (`/save-form`)
- [ ] Frontend loads correctly on Hostinger
- [ ] Contact form works
- [ ] Payment flow works end-to-end
- [ ] Success/failure pages redirect correctly

## Important Notes

1. **Render Free Tier**: Services may spin down after inactivity. First request may be slow.
2. **CORS**: Backend has CORS enabled for all origins. Adjust if needed.
3. **SSL**: Enable SSL on both Render and Hostinger for production.
4. **Backend URL**: Remember to update `BACKEND_URL` in `landing.html` before deploying to Hostinger.

## Support

- Render Documentation: https://render.com/docs
- Hostinger Support: https://www.hostinger.com/contact
- PayU Documentation: https://www.payumoney.com/dev-guide/

## Rollback Plan

If you need to rollback to Netlify:
1. Revert changes in `landing.html` (restore Netlify Functions endpoints)
2. Deploy backend functions to Netlify
3. Keep frontend on Netlify or move back

---

**Ready to deploy?** Start with `RENDER_DEPLOYMENT.md` for backend, then `HOSTINGER_DEPLOYMENT.md` for frontend.

