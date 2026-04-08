# Railway Deployment - Quick Start

Your site is ready to deploy on Railway! Follow these simple steps:

## Step 1: Add PostgreSQL Database (2 minutes)

1. Go to your Railway project: https://railway.app/project/50bdef4f-9a12-48c0-b4f9-98b5efaedba3
2. Click the **"+"** button to add a service
3. Select **"PostgreSQL"**
4. Railway will automatically set `DATABASE_URL`

## Step 2: Add Environment Variables (1 minute)

In your **samroiyot-lifestyle** service:
1. Click **"Variables"** tab
2. Click **"New Variable"**
3. Add these two variables:
   - `JWT_SECRET` = `+NE0gZMteyEVS0RxQLQQtE8YLJzj/5lOmE06/mJwNuQ=`
   - `NODE_ENV` = `production`

## Step 3: Trigger Redeploy (1 minute)

1. Go to **"Deployments"** tab
2. Click the three dots on the latest deployment
3. Select **"Redeploy"**
4. Wait for build to complete (should take 2-3 minutes)

The `Procfile` will automatically run database migrations on deploy!

## Step 4: Create Admin User (Optional - can do later)

Once deployed, you can create an admin user via the web interface:
1. Visit your Railway app URL
2. Look for admin setup page
3. Create your admin account

## Step 5: Connect Your Domain (5 minutes)

1. In Railway, go to your service → **Settings**
2. Find **"Domains"** section
3. Click **"Add Domain"**
4. Enter: `www.samroiyotinsider.com`
5. Railway will show DNS records
6. Go to Namecheap and update DNS with Railway's values

## That's it! 🎉

Your site will be live on Railway with your custom domain!

Questions? Check Railway docs: https://docs.railway.app
