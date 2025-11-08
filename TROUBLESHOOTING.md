# Troubleshooting Guide

## "Cannot GET" Error

### If you see this error on Render (Backend)

✅ **Fixed!** The backend now has:
- Root route (`/`) that returns API information
- Proper 404 handling for undefined routes
- Health check endpoint at `/health`

**Test your backend:**
1. Visit: `https://vastu-e267.onrender.com/` - Should show API info
2. Visit: `https://vastu-e267.onrender.com/health` - Should show health status

### If you see this error on Hostinger (Frontend)

**Common causes and solutions:**

#### 1. Files not in correct directory
- ✅ Upload all HTML files to `public_html` folder (or your domain's root folder)
- ✅ Make sure `index.html` is in the root of `public_html`
- ✅ Upload all image files (logo.jpg, PNG files) to the same directory

#### 2. Wrong file structure
Your Hostinger `public_html` should look like:
```
public_html/
  ├── index.html
  ├── landing.html
  ├── payu-success.html
  ├── payu-failure.html
  ├── logo.jpg
  ├── ASHISH.png
  ├── BHASKAR DAS.png
  ├── CHETNA JI.png
  └── PARUL .png
```

#### 3. index.html redirect issue
- The `index.html` redirects to `landing.html`
- Make sure both files are in the same directory
- Check that `landing.html` exists

#### 4. File permissions
- In Hostinger File Manager, ensure files have read permissions (644)
- Folders should have execute permissions (755)

#### 5. Cache issues
- Clear browser cache
- Use Hostinger's "Clear cache" feature in hPanel
- Try "No cache preview" in Hostinger dashboard

#### 6. Backend URL not updated
- ✅ **Fixed!** The `BACKEND_URL` in `landing.html` is now set to `https://vastu-e267.onrender.com`
- If you redeploy, make sure to upload the updated `landing.html`

### Quick Checklist

**For Hostinger Frontend:**
- [ ] All HTML files uploaded to `public_html`
- [ ] All image files uploaded to `public_html`
- [ ] `index.html` is in the root of `public_html`
- [ ] `landing.html` exists in the same directory
- [ ] Backend URL is correct in `landing.html` (should be `https://vastu-e267.onrender.com`)
- [ ] Cleared browser cache
- [ ] Cleared Hostinger cache

**For Render Backend:**
- [ ] Service is deployed and running
- [ ] Environment variables are set (PAYU_KEY, PAYU_SALT, GOOGLE_APPS_SCRIPT_URL)
- [ ] Can access `https://vastu-e267.onrender.com/health`
- [ ] Root URL shows API information

### Testing Steps

1. **Test Backend:**
   ```bash
   curl https://vastu-e267.onrender.com/health
   ```
   Should return: `{"ok":true,"keyConfigured":true,"saltConfigured":true}`

2. **Test Frontend:**
   - Visit your Hostinger domain
   - Should redirect to `landing.html`
   - Open browser console (F12) and check for errors
   - Verify API calls are going to Render backend

### Still having issues?

1. Check browser console (F12) for JavaScript errors
2. Check Render logs for backend errors
3. Verify CORS is enabled (already configured in server)
4. Check that all file paths are relative (not absolute)

