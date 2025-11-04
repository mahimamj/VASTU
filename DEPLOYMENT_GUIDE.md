# Deployment Guide - PayU Payment Integration

## 📋 Pre-Deployment Checklist

✅ PayU credentials configured in `.env` (local only)  
✅ Payment URL updated to production (`secure.payu.in`)  
✅ Git repository initialized  
✅ `.env` file is in `.gitignore` (won't be committed)

---

## 🚀 Step 1: Commit & Push to GitHub

### 1.1 Stage your changes:
```bash
git add landing.html google-apps-script.gs package-lock.json
```

### 1.2 Commit with a message:
```bash
git commit -m "Add PayU payment integration with merchant phone +91 98731 82466"
```

### 1.3 Push to GitHub:
```bash
git push origin main
```

---

## 🔧 Step 2: Configure Netlify

### 2.1 Connect Your Repository to Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and authorize Netlify
4. Select your repository: `Vastu`
5. Configure build settings:
   - **Build command:** Leave empty (or `npm install` if needed)
   - **Publish directory:** `.` (current directory)
   - Click **"Deploy site"**

### 2.2 Set Environment Variables in Netlify

**CRITICAL:** Add your PayU credentials as environment variables:

1. Go to your site dashboard in Netlify
2. Navigate to **Site settings** → **Environment variables**
3. Click **"Add variable"** and add these:

   ```
   PAYU_KEY = hDegW3
   PAYU_SALT = zAMciEKYzivPrM81u3XKQsEq25Ldd74z
   ```

4. Click **"Save"**

### 2.3 Configure Netlify Functions

Your Netlify functions are already configured in `netlify/functions/`:
- ✅ `payu-hash.js` - Generates PayU payment hash
- ✅ `save-to-sheets.js` - Saves form data to Google Sheets

The `netlify.toml` file is already configured correctly.

---

## ✅ Step 3: Test Your Deployment

1. After deployment, Netlify will give you a URL like: `https://your-site-name.netlify.app`
2. Open `https://your-site-name.netlify.app/landing.html`
3. Test the payment flow:
   - Fill out the consultation form
   - Proceed to payment
   - Complete a test transaction
   - Verify it appears in your PayU dashboard

---

## 🔗 Step 4: Custom Domain (Optional)

If you have a custom domain:
1. Go to **Domain settings** → **Add custom domain**
2. Follow Netlify's DNS configuration instructions
3. Your site will be accessible at your custom domain

---

## 📝 Important Notes

1. **Environment Variables:** Never commit `.env` file to GitHub. It's already in `.gitignore`
2. **Production URL:** The payment form uses `https://secure.payu.in/_payment` (production)
3. **Google Sheets:** If you're using Google Sheets integration, also add `GOOGLE_APPS_SCRIPT_URL` to Netlify environment variables
4. **Auto-Deploy:** Every push to `main` branch will automatically deploy to Netlify

---

## 🐛 Troubleshooting

### Payment not working?
- Check Netlify Functions logs: **Functions** tab → View logs
- Verify environment variables are set correctly
- Check browser console for errors

### Functions not found?
- Ensure `netlify/functions/` folder exists
- Check `netlify.toml` configuration
- Redeploy the site

---

## 📞 Support

- PayU Dashboard: Check transactions at [PayU Dashboard](https://dashboard.payu.in)
- Netlify Docs: [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)

