# How to Check Google Analytics Tracking

## Method 1: Real-Time Reports (Quickest Test)

### Step 1: Access Google Analytics
1. Go to: https://analytics.google.com
2. Sign in with your Google account
3. Select your property: **G-BWK3769XRM**

### Step 2: Check Real-Time Activity
1. In the left sidebar, click **"Reports"**
2. Click **"Realtime"** (under "Reports" section)
3. You should see:
   - **"Users in last 30 minutes"** - should show 1 or more if you're on the site
   - **"Page views"** - shows current page views
   - **"Top pages"** - should show `/landing.html` if you're viewing it

### Step 3: Test It
1. **Keep Google Analytics open** in one browser tab
2. **Open your website** in another tab: `https://vastueasy.in/landing.html`
3. **Refresh the page** a few times
4. **Go back to Analytics** - you should see:
   - Your visit appear in real-time
   - Page views increase
   - Your location/city (if available)

## Method 2: Browser Developer Tools (Technical Check)

### Step 1: Open Browser Console
1. Visit your website: `https://vastueasy.in/landing.html`
2. Press **F12** (or right-click → Inspect)
3. Go to **"Console"** tab

### Step 2: Check for Errors
- Look for any **red errors** related to Google Analytics
- If you see errors, tracking might not be working

### Step 3: Check Network Tab
1. Go to **"Network"** tab in Developer Tools
2. Refresh the page
3. Filter by typing: `gtag` or `analytics`
4. You should see requests to:
   - `googletagmanager.com/gtag/js`
   - `google-analytics.com/g/collect`
5. If these requests appear (status 200), tracking is working!

### Step 4: Check for dataLayer
1. In Console tab, type: `dataLayer`
2. Press Enter
3. You should see an array with tracking data
4. If it shows `[]` or `undefined`, tracking might not be initialized

## Method 3: Google Tag Assistant (Chrome Extension)

### Step 1: Install Extension
1. Install **"Google Tag Assistant"** Chrome extension
   - Link: https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk

### Step 2: Use It
1. Visit your website: `https://vastueasy.in/landing.html`
2. Click the **Tag Assistant icon** in Chrome toolbar
3. Click **"Enable"**
4. Refresh the page
5. Click **Tag Assistant icon** again
6. You'll see:
   - ✅ Green = Working correctly
   - ⚠️ Yellow = Warning (usually fine)
   - ❌ Red = Error (needs fixing)

## Method 4: Google Analytics DebugView (Advanced)

### Step 1: Enable Debug Mode
Add this parameter to your GA code in `landing.html`:

```javascript
gtag('config', 'G-BWK3769XRM', {
  'debug_mode': true
});
```

### Step 2: Check DebugView
1. In Google Analytics, go to **"Admin"** (gear icon)
2. Under "Property", click **"DebugView"**
3. Visit your website
4. You'll see real-time debug events

## Method 5: Simple Visual Check

### Check Page Source
1. Visit: `https://vastueasy.in/landing.html`
2. Right-click → **"View Page Source"** (or `Ctrl+U`)
3. Press **Ctrl+F** and search for: `G-BWK3769XRM`
4. If you find it, the code is present!

## Quick Verification Checklist

- [ ] Google Analytics account is set up
- [ ] Tracking ID `G-BWK3769XRM` is correct
- [ ] Code is in `<head>` section of `landing.html`
- [ ] Website is live and accessible
- [ ] Real-time reports show activity
- [ ] No errors in browser console
- [ ] Network requests to Google Analytics are successful

## Common Issues & Solutions

### Issue: "No data in Real-Time"
**Solutions:**
- Wait 24-48 hours for data to appear (first-time setup)
- Make sure you're visiting the actual live site (not localhost)
- Check if ad blockers are blocking Google Analytics
- Verify the tracking ID is correct

### Issue: "Errors in Console"
**Solutions:**
- Check if the Google Analytics script is loading
- Verify internet connection
- Check if HTTPS is properly configured
- Make sure no other scripts are conflicting

### Issue: "Tag Assistant shows errors"
**Solutions:**
- Check the specific error message
- Verify tracking ID format (should start with `G-`)
- Make sure the code is in the `<head>` section
- Check for duplicate tracking codes

## Expected Results

### ✅ Working Correctly:
- Real-time reports show your visit
- Network tab shows requests to `google-analytics.com`
- No errors in console
- Tag Assistant shows green status
- Data appears in Analytics within 24-48 hours

### ❌ Not Working:
- No data in Real-Time after visiting site
- Errors in browser console
- Network requests failing
- Tag Assistant shows red errors

## Test Right Now!

1. **Open Google Analytics**: https://analytics.google.com
2. **Go to Realtime** → Reports → Realtime
3. **Open your website** in another tab: `https://vastueasy.in/landing.html`
4. **Refresh the page** a few times
5. **Check Analytics** - you should see your visit!

## Additional Resources

- **Google Analytics Help**: https://support.google.com/analytics
- **GA4 Documentation**: https://developers.google.com/analytics/devguides/collection/ga4
- **Tag Assistant**: https://tagassistant.google.com

