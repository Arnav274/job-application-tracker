# Setup Guide

Quick guide to get this running locally.

## Prerequisites

- Node.js 18+
- PostgreSQL installed locally or use a cloud database

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Database Setup

If using local PostgreSQL:

```bash
# Start PostgreSQL (varies by OS)
# On Windows with PostgreSQL installed:
# The service should auto-start, or use:
# net start postgresql-x64-14

# Create database
psql -U postgres
CREATE DATABASE jobtracker;
\q
```

Or use a free cloud PostgreSQL:
- Neon.tech (free tier)
- Supabase (free tier)
- Railway (free tier for small projects)

## Step 3: Environment Variables

Copy the example file:
```bash
cp .env.example .env
```

Edit `.env` and update:
- DATABASE_URL with your actual database connection
- NEXTAUTH_SECRET (generate one with `openssl rand -base64 32`)

Example for local PostgreSQL:
```
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/jobtracker"
```

## Step 4: Run Migrations

```bash
npx prisma migrate dev --name init
```

This creates the database tables.

## Step 5: Generate Prisma Client

```bash
npx prisma generate
```

## Step 6: Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

## Common Issues

**Issue: Can't connect to database**
- Check PostgreSQL is running
- Verify DATABASE_URL is correct
- Try `psql -U postgres` to test connection

**Issue: Prisma errors**
- Run `npx prisma generate` again
- Delete node_modules and reinstall

**Issue: NextAuth errors**
- Make sure NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your dev server

## Next Steps

1. Create an account at /register
2. Log in at /login
3. Start adding applications in dashboard

## Deployment

See README.md for deployment instructions.
