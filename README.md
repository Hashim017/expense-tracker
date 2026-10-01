# ExpenseTracker

A full-stack expense tracker. Track income and expenses, see charts and monthly reports. Each user sees only their own data.

## Live demo

**Live site:** https://expense-tracker-hash17.vercel.app/

**Demo login:** `demo@example.com` / `password123`

You can also click **Try demo** on the landing page. It logs you in with one click.

## Features

- Landing page with one-click demo
- Register, login and logout with secure cookie sessions
- Each user has a private account and private data
- Add, edit, delete, search and filter transactions
- Dashboard with balance, income, expenses and savings rate
- Area chart and donut chart for income and spending
- Reports for 3, 6 and 12 months with a month-by-month table
- Dark theme, works on phone and desktop

## Tech stack

- Next.js (App Router) and TypeScript
- Tailwind CSS
- Prisma ORM and PostgreSQL
- Recharts for charts
- jose (JWT sessions) and bcryptjs (password hashing)
- Deployed on Vercel

## Run locally

1. Clone the repo:
```bash
   git clone https://github.com/Hashim017/expense-tracker.git
   cd expense-tracker
```
2. Install packages:
```bash
   npm install
```
3. Copy `.env.example` to `.env` and fill in the values.
4. Create the tables and demo data:
```bash
   npx prisma migrate deploy
   npx prisma db seed
```
5. Start the app:
```bash
   npm run dev
```
6. Open http://localhost:3000

## Environment variables

| Name | What it is |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | Long random text used to sign sessions |

## Author

Muhammad Hashim - [GitHub](https://github.com/Hashim017)
