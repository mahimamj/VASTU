# Hostinger Frontend Deployment Guide

This guide will help you deploy the Vastu frontend to Hostinger.

## Prerequisites

1. A Hostinger hosting account
2. Access to your Hostinger control panel (hPanel)
3. Your Render backend URL (from RENDER_DEPLOYMENT.md)
4. FTP/File Manager access to your hosting

## Step 1: Prepare Frontend Files

### Files to Upload

Upload the following files to your Hostinger `public_html` directory (or your domain's root folder):

- `index.html`
- `landing.html`
- `payu-success.html`
- `payu-failure.html`
- `logo.jpg`
- All PNG image files (ASHISH.png, BHASKAR DAS.png, CHETNA JI.png, PARUL .png)
- `_redirects` (if needed for routing)

### Files NOT to Upload

- `server/` folder (backend only)
- `netlify/` folder (Netlify-specific)
- `netlify.toml` (Netlify-specific)
- `package.json`, `package-lock.json` (not needed for static hosting)
- `node_modules/` (not needed)
- Documentation files (`.md` files)

## Step 2: Update Backend URL

Before uploading, make sure to update the backend URL in `landing.html`:

1. Open `landing.html` in a text editor
2. Find the `BACKEND_URL` configuration (around line 1417)
3. Replace the placeholder with your Render backend URL:

```javascript
const BACKEND_URL = (() => {
    const hostname = location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:5055';
    }
    return 'https://vastu-backend.onrender.com'; // Your actual Render URL
})();
```

## Step 3: Upload Files via File Manager

1. Log in to your Hostinger hPanel
2. Navigate to **File Manager**
3. Go to `public_html` (or your domain's root directory)
4. Upload all frontend files:
   - You can drag and drop files
   - Or use the **Upload** button
   - Or use FTP client (FileZilla, WinSCP, etc.)

## Step 4: Upload Files via FTP (Alternative)

If you prefer using FTP:

1. Get your FTP credentials from Hostinger hPanel:
   - Go to **FTP Accounts**
   - Note your FTP host, username, and password
2. Connect using an FTP client:
   - **Host**: Your FTP host (e.g., `ftp.yourdomain.com`)
   - **Username**: Your FTP username
   - **Password**: Your FTP password
   - **Port**: 21 (or 22 for SFTP)
3. Navigate to `public_html` directory
4. Upload all frontend files

## Step 5: Set Default Page

1. In Hostinger hPanel, go to **File Manager**
2. Navigate to `public_html`
3. Ensure `index.html` is in the root directory
4. The `index.html` file should redirect to `landing.html` (already configured)

## Step 6: Configure Domain (if using custom domain)

1. In Hostinger hPanel, go to **Domains**
2. Point your domain to the `public_html` directory
3. Wait for DNS propagation (can take up to 48 hours)

## Step 7: Test Your Deployment

1. Visit your website URL
2. Test the contact form
3. Test the payment flow (use PayU test credentials)
4. Check browser console for any errors (F12 → Console)

## Step 8: Configure SSL Certificate

1. In Hostinger hPanel, go to **SSL**
2. Enable **Free SSL** (Let's Encrypt)
3. Wait for SSL activation (usually instant)
4. Your site will be accessible via HTTPS

## Troubleshooting

### Files not loading
- Check file permissions (should be 644 for files, 755 for directories)
- Verify files are in the correct directory (`public_html`)
- Clear browser cache

### Backend API errors
- Verify the `BACKEND_URL` in `landing.html` is correct
- Check browser console for CORS errors
- Ensure your Render backend is running and accessible

### Images not displaying
- Check image file paths are correct
- Verify image files are uploaded
- Check file names match exactly (case-sensitive)

### Form submissions not working
- Open browser console (F12) and check for errors
- Verify backend URL is correct
- Test backend endpoints directly using curl or Postman

## File Structure on Hostinger

Your `public_html` directory should look like:

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
├── PARUL .png
└── _redirects (optional)
```

## Security Considerations

1. **Don't upload sensitive files**: Never upload `.env` files, credentials, or backend code
2. **Keep files updated**: Regularly update your frontend files
3. **Use HTTPS**: Always enable SSL certificate
4. **Backup regularly**: Use Hostinger's backup feature

## Performance Optimization

1. **Enable caching**: In Hostinger hPanel, enable caching if available
2. **Compress images**: Optimize image files before uploading
3. **Use CDN**: Consider using a CDN for static assets (optional)

## Next Steps

After deploying:
1. Test all functionality thoroughly
2. Monitor your Render backend logs
3. Set up monitoring/analytics if needed
4. Configure backups

## Support

- Hostinger Support: https://www.hostinger.com/contact
- Render Support: https://render.com/docs

