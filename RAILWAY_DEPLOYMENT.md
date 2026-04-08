# Sam Roi Yot Lifestyle - Railway Deployment Guide

This is a standalone version of the Sam Roi Yot Lifestyle website configured for deployment on Railway (free hosting platform).

## What Changed from Manus

1. **Database**: Switched from MySQL (Manus) to PostgreSQL (Railway)
2. **Authentication**: Removed Manus OAuth, implemented simple password-based login with JWT
3. **Dependencies**: Updated `mysql2` → `pg`, added `bcryptjs` for password hashing
4. **Server**: Removed OAuth routes, added cookie-based session management

## Quick Start

### 1. Create Railway Account
- Go to https://railway.app
- Sign up with GitHub
- Create a new project

### 2. Add PostgreSQL Database
- In Railway dashboard, click "Add Service"
- Select "PostgreSQL"
- Railway will automatically provision a database and set `DATABASE_URL` environment variable

### 3. Deploy from GitHub
- Push this repository to GitHub
- In Railway, connect your GitHub repository
- Railway will auto-deploy on each push

### 4. Set Environment Variables
In Railway dashboard, add these variables:

```
JWT_SECRET=your-very-long-random-secret-key-change-this
NODE_ENV=production
```

### 5. Run Database Migrations
After first deployment, run migrations:

```bash
npm run db:push
```

### 6. Create Admin User
After migrations complete:

```bash
node scripts/init-admin.mjs admin your-password admin@samroiyot.com
```

Default credentials if you don't specify:
- Username: `admin`
- Password: `admin123456`
- Email: `admin@samroiyot.com`

## Admin Login

1. Visit your Railway app URL
2. Click "Admin" or go to `/admin`
3. Login with credentials from step 6
4. Manage properties, inquiries, and content

## Connecting Your Namecheap Domain

1. In Railway dashboard, go to Settings → Domains
2. Add your custom domain: `www.samroiyotinsider.com`
3. Railway will provide DNS records to add in Namecheap
4. In Namecheap, update your domain's nameservers or add CNAME records as instructed
5. Wait 24-48 hours for DNS propagation

## Database Backup

Railway provides automatic backups. To manually export:

```bash
pg_dump $DATABASE_URL > backup.sql
```

## Troubleshooting

### Database Connection Error
- Check that `DATABASE_URL` is set in Railway environment variables
- Verify PostgreSQL service is running in Railway

### Authentication Issues
- Clear browser cookies
- Ensure `JWT_SECRET` is set in environment variables
- Check that admin user was created successfully

### Build Failures
- Check Railway deployment logs
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility (18+)

## File Structure

```
samroiyot-railway/
├── client/              # React frontend
├── server/              # Express backend
│   ├── _core/
│   │   ├── auth.ts      # Password-based authentication
│   │   ├── context.ts   # tRPC context
│   │   └── index.ts     # Server setup
│   ├── db.ts            # Database queries
│   └── routers.ts       # tRPC endpoints
├── drizzle/
│   └── schema.ts        # PostgreSQL schema
├── scripts/
│   ├── init-admin.mjs   # Create admin user
│   └── export-properties.mjs
├── railway.json         # Railway configuration
└── package.json
```

## Deployment Checklist

- [ ] Railway account created
- [ ] PostgreSQL database provisioned
- [ ] Repository pushed to GitHub
- [ ] Railway connected to GitHub
- [ ] Environment variables set (JWT_SECRET, NODE_ENV)
- [ ] Database migrations run (`npm run db:push`)
- [ ] Admin user created
- [ ] Site accessible at Railway URL
- [ ] Namecheap domain DNS updated
- [ ] Domain resolves to Railway app

## Support

For Railway-specific issues: https://railway.app/docs
For code issues: Check server logs in Railway dashboard

## Next Steps

1. Import property data from Manus database
2. Set up email notifications (optional)
3. Configure custom domain
4. Test admin panel
5. Go live!
