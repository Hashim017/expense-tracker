<div align="center">

# 💸 Expense Tracker

**Track income and expenses with a clear dashboard and reports.**

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Neon](https://img.shields.io/badge/Neon-00E599?logoColor=black)

[Live Demo](https://expense-tracker-hash17.vercel.app/)

</div>

## 📑 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Author](#-author)

## 📖 About

Expense Tracker helps you see where your money goes. You can log transactions, group them by category and view charts and reports. It was built as Task 3 of the Auspify internship.

## 🚀 Features

| Feature | Description |
|---|---|
| Authentication | Register and login with secure session cookies |
| Transactions | Add, edit and delete income and expenses |
| Categories | Organize spending your way |
| Dashboard | Totals and charts at a glance |
| Reports | Review your spending over time |
| Dark theme | Easy on the eyes |

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js App Router |
| Runtime | Node.js |
| Database | PostgreSQL on Neon |
| ORM | Prisma 6 |

## 🖼 Screenshots

### Landing Page

#### Landing Page
<img src="docs/screenshots/landing-page.png" alt="Landing Page" width="600">

#### Landing Page - Section 2
<img src="docs/screenshots/landing-page2.PNG" alt="Landing Page 2" width="600">

#### Features
<img src="docs/screenshots/features.PNG" alt="Features" width="600">


### Transactions

#### Transactions Page
<img src="docs/screenshots/transactions-page.PNG" alt="Transactions Page" width="600">

#### Edit Transaction
<img src="docs/screenshots/edit-transaction.JPG" alt="Edit Transaction" width="600">


### Dashboard

#### Dashboard
<img src="docs/screenshots/dashboard.PNG" alt="Dashboard" width="600">


### Reports

#### Reports
<img src="docs/screenshots/reports.PNG" alt="Reports" width="600">

#### Reports - Detailed View
<img src="docs/screenshots/reports2.PNG" alt="Reports 2" width="600">


### Authentication

#### Register / Login
<img src="docs/screenshots/register-login.PNG" alt="Register Login" width="600">


### Footer
<img src="docs/screenshots/footer.PNG" alt="Footer" width="600">


## Responsive Design

The application is fully responsive and optimized for desktop, tablet, and mobile devices.

### Mobile Landing Page

<img src="docs/screenshots/landing-page-mobile.jpg" alt="Landing Page Mobile" width="300">

<img src="docs/screenshots/landing-page2-mobile.jpg" alt="Landing Page Mobile 2" width="300">

<img src="docs/screenshots/landing-page3-mobile.jpg" alt="Landing Page Mobile 3" width="300">

<img src="docs/screenshots/landing-page4-mobile.jpg" alt="Landing Page Mobile 4" width="300">


### Mobile Dashboard

<img src="docs/screenshots/user-dashboard-mobile.jpg" alt="User Dashboard Mobile" width="300">

<img src="docs/screenshots/user-dashboard2-mobile.jpg" alt="User Dashboard Mobile 2" width="300">

<img src="docs/screenshots/user-dashboard3-mobile.jpg" alt="User Dashboard Mobile 3" width="300">

<img src="docs/screenshots/user-dashboard4-mobile.jpg" alt="User Dashboard Mobile 4" width="300">


### Mobile Transactions

<img src="docs/screenshots/transactions-page-mobile.jpg" alt="Transactions Page Mobile" width="300">


### Mobile Reports

<img src="docs/screenshots/reports-page-mobile.jpg" alt="Reports Page Mobile" width="300">

<img src="docs/screenshots/reports-page2-mobile.jpg" alt="Reports Page Mobile 2" width="300">

<img src="docs/screenshots/reports-page3-mobile.jpg" alt="Reports Page Mobile 3" width="300">

## ⚙️ Getting Started

**You need:** Node.js 18 or higher and a PostgreSQL database.

```bash
git clone https://github.com/Hashim017/expense-tracker.git
cd expense-tracker
npm install
```

Create a file named `.env` in the project root and add your database link:

```
DATABASE_URL="your-postgres-connection-string"
```

Run the database setup and start the app:

```bash
npx prisma migrate dev
npm run dev
```

Open http://localhost:3000.

## 👤 Author

**Muhammad Hashim** - [GitHub](https://github.com/Hashim017)
