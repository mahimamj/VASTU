# How to Remove "Not Secure" Warning - Enable SSL/HTTPS

## Problem
Your website shows "Not secure" because it's using HTTP instead of HTTPS. This happens when SSL/HTTPS is not enabled.

## Solution: Enable SSL Certificate on Hostinger

### Method 1: Free SSL Certificate (Recommended)

1. **Log in to Hostinger hPanel**
   - Go to: https://hpanel.hostinger.com
   - Log in with your credentials

2. **Navigate to SSL Section**
   - Click on **"Websites"** in the left sidebar
   - Find your website: `vastueasy.in`
   - Click on **"Manage"** or **"Dashboard"**

3. **Enable SSL**
   - Look for **"SSL"** or **"Security"** section
   - Click on **"SSL"** tab
   - You should see options for SSL certificates
   - Click **"Install SSL"** or **"Enable SSL"**
   - Select **"Free SSL"** (usually provided by Let's Encrypt)
   - Click **"Install"** or **"Activate"**

4. **Wait for Installation**
   - SSL installation usually takes 5-15 minutes
   - You'll see a status like "Installing..." or "Pending"
   - Once complete, it will show "Active" or "Installed"

5. **Force HTTPS Redirect**
   - In the SSL section, look for **"Force HTTPS"** or **"HTTPS Redirect"**
   - Enable this option to automatically redirect HTTP to HTTPS
   - This ensures all visitors use the secure connection

6. **Clear Cache**
   - In Hostinger hPanel, clear your website cache
   - Or use "Clear cache" option in the dashboard

### Method 2: Using .htaccess File (If SSL is already installed)

If SSL is already installed but HTTP redirect isn't working, you can add this to your `.htaccess` file:

1. **Access File Manager**
   - In Hostinger hPanel, go to **"Files"** → **"File Manager"**
   - Navigate to `public_html` folder

2. **Edit or Create .htaccess**
   - Look for `.htaccess` file (it might be hidden - enable "Show hidden files")
   - If it doesn't exist, create a new file named `.htaccess`

3. **Add HTTPS Redirect Code**
   Add this code to the `.htaccess` file:

   ```apache
   # Force HTTPS
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   
   # Force HTTPS for www version (if you use www)
   RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
   RewriteRule ^(.*)$ https://%1/$1 [R=301,L]
   ```

4. **Save the File**
   - Save the `.htaccess` file
   - Make sure it's in the `public_html` root directory

### Method 3: Check Domain Settings

1. **Verify Domain Configuration**
   - In Hostinger, go to **"Domains"** section
   - Make sure `vastueasy.in` is properly connected
   - Check that DNS records are correct

2. **Check Nameservers**
   - Ensure your domain is using Hostinger's nameservers
   - Nameservers should be something like:
     - `ns1.dns-parking.com`
     - `ns2.dns-parking.com`
   - Or Hostinger's custom nameservers

## Verification Steps

After enabling SSL:

1. **Test HTTPS Access**
   - Visit: `https://vastueasy.in/landing.html`
   - You should see a lock icon (🔒) in the address bar
   - No "Not secure" warning

2. **Test HTTP Redirect**
   - Visit: `http://vastueasy.in/landing.html`
   - It should automatically redirect to `https://vastueasy.in/landing.html`

3. **Check SSL Certificate**
   - Click the lock icon in the browser
   - You should see "Connection is secure"
   - Certificate details should show "Let's Encrypt" or your SSL provider

## Troubleshooting

### If SSL doesn't work:

1. **Wait Longer**
   - SSL installation can take up to 24 hours in some cases
   - Check back after a few hours

2. **Clear Browser Cache**
   - Press `Ctrl + Shift + Delete`
   - Clear cached images and files
   - Try accessing the site again

3. **Check DNS Propagation**
   - Use a tool like: https://www.whatsmydns.net
   - Check if DNS has propagated globally

4. **Contact Hostinger Support**
   - If SSL installation fails, contact Hostinger support
   - They can manually install SSL for you

### If "Not secure" still appears:

1. **Mixed Content Warning**
   - Some resources (images, scripts) might be loading over HTTP
   - Check browser console (F12) for mixed content errors
   - Update all URLs in your HTML to use `https://` or relative paths

2. **Update BACKEND_URL in landing.html**
   - Make sure your Render backend URL uses `https://`
   - It should be: `https://vastu-e267.onrender.com` (already correct)

## Quick Checklist

- [ ] SSL certificate installed in Hostinger
- [ ] HTTPS redirect enabled
- [ ] `.htaccess` file updated (if needed)
- [ ] Tested HTTPS access
- [ ] Verified lock icon appears
- [ ] Cleared browser cache
- [ ] Updated all HTTP links to HTTPS

## Expected Result

After completing these steps:
- ✅ Website accessible via `https://vastueasy.in`
- ✅ Lock icon (🔒) in browser address bar
- ✅ "Not secure" warning removed
- ✅ Automatic redirect from HTTP to HTTPS

## Additional Notes

- **Free SSL**: Hostinger provides free SSL certificates (Let's Encrypt) for all domains
- **Auto-renewal**: SSL certificates usually auto-renew, but check Hostinger settings
- **Performance**: HTTPS has minimal impact on website speed
- **SEO**: HTTPS is also better for SEO rankings

