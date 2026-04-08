# Sam Roi Yot Lifestyle - Railway Setup Instructions

Follow these steps to get your website live on Railway with your Namecheap domain.

## Step 1: Prepare GitHub Repository

This code is already in a Git repository. You need to push it to your GitHub account.

### Option A: Create New Repository on GitHub

1. Go to https://github.com/new
2. Create a new repository named `samroiyot-lifestyle`
3. Do NOT initialize with README (we already have one)
4. Copy the repository URL (HTTPS or SSH)

### Option B: Use Existing Repository

If you already have a GitHub repo, use its URL.

### Push Code to GitHub

```bash
cd /home/ubuntu/samroiyot-railway

# If you haven't set up git remote yet:
git remote add origin https://github.com/YOUR_USERNAME/samroiyot-lifestyle.git
git branch -M main
git push -u origin main

# If you already have a remote:
git push origin main
```

## Step 2: Create Railway Account & Project

1. Go to https://railway.app
2. Click "Start a New Project"
3. Select "Deploy from GitHub"
4. Authorize Railway to access your GitHub account
5. Select the `samroiyot-lifestyle` repository
6. Railway will automatically start building and deploying

## Step 3: Add PostgreSQL Database

1. In your Railway project dashboard
2. Click "Add Service" button
3. Select "PostgreSQL"
4. Railway will automatically:
   - Create a PostgreSQL database
   - Set the `DATABASE_URL` environment variable
   - Connect it to your app

## Step 4: Configure Environment Variables

In Railway dashboard, go to your app's "Variables" tab and add:

```
JWT_SECRET=your-super-secret-key-at-least-32-characters-long
NODE_ENV=production
PORT=3000
```

**Important**: Change `JWT_SECRET` to a random, long string. Example:
```
JWT_SECRET=aB3$xK9@mL2#pQ7!vW5&nJ8*rT4^yU6(zH1)
```

## Step 5: Run Database Migrations

1. In Railway dashboard, click on your app
2. Go to "Deployments" tab
3. Click the latest deployment
4. Open "Logs" tab
5. Wait for deployment to complete (you'll see "Server running on..." message)

Then run migrations:

```bash
# In your local terminal
cd /home/ubuntu/samroiyot-railway
npm run db:push
```

Or via Railway CLI:

```bash
railway run npm run db:push
```

## Step 6: Create Admin User

After migrations complete, create your admin account:

```bash
# Using Railway CLI
railway run node scripts/init-admin.mjs admin your-password admin@samroiyot.com
```

Or locally (if you have DATABASE_URL set):

```bash
node scripts/init-admin.mjs admin your-password admin@samroiyot.com
```

**Save these credentials:**
- Username: `admin`
- Password: `your-password`
- Email: `admin@samroiyot.com`

## Step 7: Test Your Site

1. In Railway dashboard, find your app's URL (looks like `https://samroiyot-xxx.railway.app`)
2. Visit that URL in your browser
3. You should see the Sam Roi Yot Lifestyle homepage
4. Try logging in with admin credentials

## Step 8: Connect Your Namecheap Domain

### In Railway Dashboard:

1. Go to your app settings
2. Click "Domains" or "Custom Domains"
3. Click "Add Domain"
4. Enter: `www.samroiyotinsider.com`
5. Railway will show you DNS records to add

### In Namecheap:

1. Log in to your Namecheap account
2. Go to "Domain List"
3. Click "Manage" next to `samroiyotinsider.com`
4. Go to "Advanced DNS" tab
5. Add the DNS records provided by Railway:
   - If Railway gives you a CNAME record, add it
   - If Railway gives you nameservers, update your domain's nameservers
6. Save changes

**Note**: DNS changes can take 24-48 hours to propagate. Your site will be live once DNS resolves.

## Step 9: Import Property Data (Optional)

To import your 12 properties from Manus:

1. Export properties from Manus database (we already did this)
2. Create a migration script to import them
3. Run the import

Contact support if you need help with this step.

## Verify Everything Works

✓ Site loads at Railway URL
✓ Site loads at your custom domain (after DNS propagation)
✓ Admin login works
✓ Can view properties
✓ Can add/edit properties (admin only)

## Troubleshooting

### "Database connection error"
- Check that PostgreSQL service is running in Railway
- Verify `DATABASE_URL` is set in environment variables
- Check database logs in Railway dashboard

### "Build failed"
- Check deployment logs in Railway
- Ensure all dependencies are in `package.json`
- Verify Node.js version (18+)

### "Domain not working"
- Wait 24-48 hours for DNS propagation
- Check DNS records in Namecheap match Railway's requirements
- Test with `nslookup www.samroiyotinsider.com`

### "Can't login"
- Verify admin user was created: `railway run node scripts/init-admin.mjs`
- Check JWT_SECRET is set in environment variables
- Clear browser cookies and try again

## Next Steps

1. ✓ Site is live on Railway
2. ✓ Custom domain is connected
3. Import property data from Manus
4. Set up email notifications (optional)
5. Configure backup strategy
6. Monitor site performance

## Support Resources

- Railway Docs: https://railway.app/docs
- Railway Support: https://railway.app/support
- PostgreSQL Docs: https://www.postgresql.org/docs/

## Important Notes

- **Backups**: Railway provides automatic daily backups
- **Scaling**: Free tier includes 500 hours/month of compute
- **Cost**: Free tier is sufficient for your site
- **Uptime**: 99.9% uptime SLA on Railway

You're now completely independent from Manus! 🎉
