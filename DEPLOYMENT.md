# Deployment Guide

How to deploy this app to production.

## Option 1: Vercel + Neon (Recommended for Students)

Both have free tiers. No credit card needed.

### Database: Neon

1. Go to neon.tech
2. Sign up with GitHub
3. Create new project
4. Copy the connection string
5. Save it for later

### Frontend: Vercel

1. Push code to GitHub
2. Go to vercel.com
3. Sign in with GitHub
4. Click "Add New Project"
5. Import your repo
6. Add environment variables:
   - DATABASE_URL (from Neon)
   - NEXTAUTH_URL (will be your vercel URL)
   - NEXTAUTH_SECRET (generate with `openssl rand -base64 32`)
7. Deploy

After first deploy:
- Go to project settings
- Update NEXTAUTH_URL to your actual vercel URL (e.g., https://yourapp.vercel.app)
- Redeploy

## Option 2: AWS RDS + Vercel

More expensive but shows AWS skills on CV.

### Database: AWS RDS

1. Go to AWS Console
2. Navigate to RDS
3. Create database
4. Choose PostgreSQL
5. Select Free tier template
6. Set master password
7. Make it publicly accessible (for development)
8. Create database
9. Wait 5-10 minutes
10. Copy endpoint URL
11. Build connection string:
    ```
    postgresql://postgres:yourpassword@your-endpoint.rds.amazonaws.com:5432/postgres
    ```

### Frontend: Vercel

Same as Option 1 but use AWS RDS connection string.

## Running Migrations in Production

After deploying, run migrations:

```bash
# If using Vercel CLI
vercel env pull .env.production
npx prisma migrate deploy

# Or use Prisma Data Platform
# Or run migrations manually via SQL client
```

## Post-Deployment Checklist

- [ ] Can create account
- [ ] Can log in
- [ ] Can add application
- [ ] Can update status
- [ ] Can delete application
- [ ] Stats show correctly

## Costs

### Free Option (Neon + Vercel)
- Neon: Free tier (3GB storage)
- Vercel: Free tier (hobby projects)
- Total: £0/month

### AWS Option
- RDS t3.micro: ~£15-20/month (free tier first year)
- Vercel: Free
- Total: £0 first year, then £15-20/month

## Custom Domain (Optional)

1. Buy domain (Namecheap, ~£10/year)
2. In Vercel project settings, add domain
3. Update DNS records as instructed
4. Update NEXTAUTH_URL to new domain

## Monitoring

Vercel gives you:
- Automatic deployments on git push
- Logs and analytics
- Error tracking

Check regularly to make sure app is working.

## Security Notes

- Never commit .env file
- Use strong NEXTAUTH_SECRET
- Keep dependencies updated
- Enable 2FA on hosting accounts
