<div align="center">
<img style="width:60px;border-radius:40%" src=".github/FocusFlow.png" alt="FocusFlow Logo" />

# FocusFlow

A full-stack productivity app built for focused work sessions, task management, and meaningful productivity tracking.

<br />

[![Live Demo](https://img.shields.io/badge/Live-Demo-black?style=for-the-badge\&logo=vercel)](https://your-demo-link.com)

![React](https://img.shields.io/badge/React-gray?style=flat-square\&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-gray?style=flat-square\&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-gray?style=flat-square\&logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-gray?style=flat-square\&logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-gray?style=flat-square\&logo=prisma)
![JWT](https://img.shields.io/badge/JWT-gray?style=flat-square\&logo=jsonwebtokens)

<img src=".github/assets/preview.gif" alt="FocusFlow Preview" width="100%" />

</div>

## The Idea Behind FocusFlow

Most productivity apps today feel overloaded with features, visually distracting, or unnecessarily complicated.

FocusFlow was built around a simpler philosophy:

* Clean interface
* Fast workflow
* Minimal distractions
* Meaningful analytics
* Real focus sessions
* Smooth user experience across all devices

Instead of trying to become an all-in-one workspace, FocusFlow focuses on doing a few core things really well:

* Helping users focus
* Tracking productive work
* Organizing tasks
* Building consistency

## Features

### Productivity

* Pomodoro-style focus timer
* Task management system
* Focus session tracking
* Productivity analytics
* Session history
* Responsive dashboard
* Dark/Light theme support
* Mobile-first design

### Authentication & Security

* JWT Authentication
* Google OAuth login
* Secure login/signup
* Forgot password flow
* Reset password system
* Protected API routes
* Password hashing using bcrypt

### Backend & Infrastructure

* PostgreSQL database integration
* Prisma ORM
* REST API architecture
* Zod validation
* Email system integration
* Welcome emails
* Password reset emails
* Contact form email handling
* Structured backend architecture

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React.js | Frontend library |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| React Router | Routing |
| Context API | State management |
| Framer Motion | Animations |
| Vite | Build tool |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Backend framework |
| PostgreSQL | Database |
| Prisma ORM | Database ORM |
| JWT Authentication | Authentication |
| Google OAuth | Social login |
| bcrypt | Password hashing |
| Zod | Validation |
| Gmail SMTP | Email service |

### Deployment

| Technology | Purpose |
|---|---|
| Vercel | Frontend deployment |
| Render | Backend deployment |
| Neon PostgreSQL | Cloud database |

## Backend Route Structure

### Public Routes

```http
POST /api/contact

POST /api/auth/register
POST /api/auth/login
POST /api/auth/google
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

### Protected Routes

```http
GET    /api/user/me
PATCH  /api/user/profile

GET    /api/tasks
POST   /api/tasks
PATCH  /api/tasks/:id
DELETE /api/tasks/:id

GET    /api/sessions
POST   /api/sessions
```

# Architecture

```text
Frontend (React + TypeScript)
            ↓
Backend API (Node.js + Express)
            ↓
Prisma ORM
            ↓
PostgreSQL Database
```

FocusFlow stores raw focus session data and calculates analytics on the frontend for a faster and simpler architecture.

# Email System

FocusFlow includes a transactional email system powered by Gmail SMTP.

Implemented email flows:

* Welcome emails
* Forgot password emails
* Reset password emails
* Contact form emails

This project helped me better understand how modern applications handle programmatic email workflows and authentication-related communication systems.

## Environment Variables

### Frontend

```env
VITE_API_URL=
VITE_GOOGLE_CLIENT_ID=
```

### Backend

```env
DATABASE_URL=
JWT_SECRET=
GOOGLE_CLIENT_ID=
CLIENT_URL=
EMAIL_PASS=
EMAIL_USER=
RESEND_API_KEY=
```

## Getting Started

### Clone Repository

```bash
git clone https://github.com/dipanshu447/Focus-flow.git
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

## What I Learned

Through FocusFlow, I learned:

* Full-stack application architecture
* TypeScript through real project development
* PostgreSQL database management
* Prisma ORM workflows
* JWT authentication systems
* Google OAuth integration
* REST API development
* Backend structuring patterns
* Responsive UI systems
* Theme persistence architecture
* Deployment workflows
* Email systems using Gmail SMTP
* Production-style project organization

This project significantly improved my understanding of how modern SaaS-style applications are built and structured.

## Legacy Version

The original version of FocusFlow is available in the `v1` branch.

It has been preserved to showcase the evolution of the project, architecture improvements, and the transition from the initial prototype to FocusFlow 2.0.

## Developer

Built and designed by **Dipanshu Sahu**

FocusFlow started as a small productivity experiment and gradually evolved into a complete full-stack application focused on real-world architecture, clean UI/UX, and meaningful productivity workflows.