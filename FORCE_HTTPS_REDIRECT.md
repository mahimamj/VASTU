# Force HTTPS Redirect - Remove "Not Secure" Warning

## Status: SSL is Already Installed ✅

Your dashboard shows "SSL installed" for `vastueasy.in`. Now we need to force HTTPS redirect.

## Step 1: Enable HTTPS Redirect in Hostinger

1. **Go to Security Section**
   - Click "Security" in the left sidebar
   - Or click "Website" → Look for SSL/HTTPS options

2. **Enable HTTPS Redirect**
   - Look for "Force HTTPS" or "HTTPS Redirect" toggle
   - Enable it
   - Save changes

## Step 2: Add .htaccess Redirect (Alternative Method)

If you can't find the toggle, add this to your `.htaccess` file:

1. **Go to File Manager**
   - Click "Files" in left sidebar
   - Navigate to `public_html` folder

2. **Edit .htaccess**
   - Look for `.htaccess` file (enable "Show hidden files" if needed)
   - If it doesn't exist, create a new file named `.htaccess`

3. **Add This Code:**
   ```apache
   # Force HTTPS Redirect
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

4. **Save the File**

## Step 3: Clear Cache

1. **In Hostinger Dashboard**
   - Click "Clear cache" button
   - Or use "No cache preview"

2. **Clear Browser Cache**
   - Press `Ctrl + Shift + Delete`
   - Clear cached images and files
   - Or use Incognito/Private mode

## Step 4: Test HTTPS

1. **Visit HTTPS URL:**
   - Go to: `https://vastueasy.in/landing.html`
   - You should see a lock icon 🔒 instead of "Not secure"

2. **Test HTTP Redirect:**
   - Visit: `http://vastueasy.in/landing.html`
   - It should automatically redirect to `https://vastueasy.in/landing.html`

## Step 5: Update Your Links

Make sure all your links use HTTPS:
- Update any bookmarks to use `https://`
- Update any hardcoded links in your HTML files

## Troubleshooting

### If "Not secure" still appears:

1. **Check for Mixed Content**
   - Open browser console (F12)
   - Look for "Mixed Content" warnings
   - Update any HTTP resources to HTTPS

2. **Verify SSL Certificate**
   - Click the lock icon in browser
   - Check certificate details
   - Should show "Valid" and "Let's Encrypt" or your provider

3. **Wait a Few Minutes**
   - DNS/SSL changes can take time to propagate
   - Try again after 10-15 minutes

## Expected Result

After completing these steps:
- ✅ Website accessible via `https://vastueasy.in`
- ✅ HTTP automatically redirects to HTTPS
- ✅ Lock icon (🔒) in browser address bar
- ✅ "Not secure" warning removed
- ✅ "Connection is secure" message

