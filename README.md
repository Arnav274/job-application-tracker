# Job Application Tracker

A full-stack web app for tracking job applications. Built with Next.js, TypeScript, PostgreSQL, and deployed on AWS.

## Features

- User authentication with secure password hashing
- Create, read, update, delete job applications
- Dashboard with application statistics
- Filter by status (Applied, Interview, Offer, Rejected)
- Notes and links for each application
- Responsive design

## Tech Stack

**Frontend:**
- Next.js 14 with App Router
- TypeScript
- TailwindCSS
- NextAuth.js for authentication

**Backend:**
- Next.js API Routes
- Prisma ORM
- bcryptjs for password hashing

**Database:**
- PostgreSQL

**Deployment:**
- Vercel (frontend)
- AWS RDS (database)

## Key Implementation Details

- JWT-based session management
- Server-side authentication checks
- RESTful API design
- Relational database schema with foreign keys
- Protected API routes
- Type-safe database queries with Prisma

## Setup

1. Clone the repo
```bash
git clone https://github.com/Arnav274/job-application-tracker.git
cd job-application-tracker
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

## Future Enhancements

- OpenAI integration for job description analysis
- Email reminders for follow-ups
- Export to CSV
- Calendar view for interviews
- Application analytics and insights

## Why I Built This

As a third-year computer science student applying for internships and graduate roles, I needed a better way to organize my job search. This project solves a real problem while demonstrating my full-stack development skills.

## License

MIT
