# Job Application Tracker

A web app for tracking job applications. Built during my third year at uni while job hunting.

## What it does

- Track applications with company, position, status
- See stats on your applications
- Update status as you progress through interviews
- Keep notes for each application

## Tech Stack

- Next.js 14 (TypeScript)
- PostgreSQL with Prisma
- NextAuth for login
- TailwindCSS
- Deployed on Vercel + AWS RDS

## Setup

1. Clone the repo
```bash
git clone https://github.com/yourusername/job-tracker.git
cd job-tracker
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Edit `.env` with your database URL and secret key.

4. Set up database
```bash
npx prisma migrate dev
```

5. Run locally
```bash
npm run dev
```

Open http://localhost:3000

## Database Schema

Two main tables:
- Users (email, password, name)
- Applications (company, position, status, notes)

Status options: Applied, Interview, Offer, Rejected

## Deployment

Frontend: Vercel (auto deploys from main branch)
Database: AWS RDS PostgreSQL

To deploy:
1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel
4. Deploy

## Future ideas

- Email reminders for follow-ups
- CV analysis with AI
- Export to CSV
- Calendar view for interviews

## License

MIT
