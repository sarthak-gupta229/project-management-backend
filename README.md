# Project Camp Backend

A RESTful API service for collaborative project management, built with **Express.js** and **MongoDB**. Project Camp enables teams to organize projects, manage tasks with subtasks, maintain project notes, and handle user authentication with role-based access control.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Role-Based Access Control](#role-based-access-control)
- [Data Models](#data-models)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Authentication** — Registration, login, JWT-based sessions, and token refresh
- **Email Verification** — Account verification and password reset via email (Mailtrap / SMTP)
- **Project Management** — Create, update, delete, and list projects
- **Team Collaboration** — Invite members via email, assign roles, manage team composition
- **Task Management** — Full CRUD for tasks with assignees, status tracking, and file attachments
- **Subtask System** — Hierarchical task breakdown with independent completion tracking
- **Project Notes** — Maintain project-level notes and documentation
- **Role-Based Access Control** — Three-tier permission system (Admin → Project Admin → Member)
- **Health Check** — Dedicated endpoint for uptime and system status monitoring

---

## Tech Stack

| Layer          | Technology                                                     |
| -------------- | -------------------------------------------------------------- |
| Runtime        | [Node.js](https://nodejs.org/) (ES Modules)                   |
| Framework      | [Express.js v5](https://expressjs.com/)                        |
| Database       | [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/) |
| Authentication | [JWT](https://jwt.io/) (jsonwebtoken) + [bcrypt](https://www.npmjs.com/package/bcrypt) |
| Validation     | [express-validator](https://express-validator.github.io/)      |
| Email          | [Nodemailer](https://nodemailer.com/) + [Mailgen](https://github.com/eladnava/mailgen) |
| Dev Tools      | [Nodemon](https://nodemon.io/), [Prettier](https://prettier.io/) |

---

## Project Structure

```
project-camp-backend/
├── public/
│   └── images/              # Uploaded file attachments
├── src/
│   ├── controllers/         # Route handler logic
│   │   ├── auth.controller.js
│   │   ├── healthcheck.controller.js
│   │   └── project.controller.js
│   ├── db/                  # Database connection setup
│   ├── middlewares/         # Express middleware
│   │   ├── auth.middleware.js
│   │   └── validator.middleware.js
│   ├── models/              # Mongoose schemas
│   │   ├── user.models.js
│   │   ├── project.models.js
│   │   ├── projectmember.models.js
│   │   ├── task.models.js
│   │   ├── subtask.models.js
│   │   └── note.models.js
│   ├── routes/              # Express route definitions
│   │   ├── auth.routes.js
│   │   └── healthcheck.routes.js
│   ├── utils/               # Shared utilities
│   │   ├── api-error.js     # Custom API error class
│   │   ├── api-response.js  # Standardized response wrapper
│   │   ├── async-handler.js # Async error handling wrapper
│   │   ├── constants.js     # App-wide constants & enums
│   │   └── mail.js          # Email service configuration
│   ├── validators/          # Request validation schemas
│   │   └── index.js
│   ├── app.js               # Express app configuration
│   └── index.js             # Server entry point
├── .env                     # Environment variables (not committed)
├── .gitignore
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **MongoDB** instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/project-camp-backend.git
   cd project-camp-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the project root (see [Environment Variables](#environment-variables) below).

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:8000`.

### Available Scripts

| Script          | Command             | Description                     |
| --------------- | -------------------- | ------------------------------- |
| `npm run dev`   | `nodemon src/index.js` | Start dev server with hot reload |
| `npm start`     | `node src/index.js`    | Start production server          |

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Server
PORT=8000
CORS_ORIGIN=*                           # Comma-separated allowed origins

# Database
MONGO_URL=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>

# JWT Tokens
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d

# Email (SMTP)
MAILTRAP_SMTP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_SMTP_PORT=2525
MAILTRAP_SMTP_USER=your_smtp_user
MAILTRAP_SMTP_PASS=your_smtp_pass

# Password Reset
FORGOT_PASSWORD_REDIRECT_URL=http://localhost:3000
```

> **Note:** Never commit your `.env` file. It is already included in `.gitignore`.

---

## API Reference

**Base URL:** `http://localhost:8000/api/v1`

### Health Check

| Method | Endpoint         | Description          | Auth     |
| ------ | ---------------- | -------------------- | -------- |
| `GET`  | `/healthcheck/`  | System health status | Public   |

### Authentication — `/auth`

| Method | Endpoint                              | Description                | Auth     |
| ------ | ------------------------------------- | -------------------------- | -------- |
| `POST` | `/auth/register`                      | Register a new user        | Public   |
| `POST` | `/auth/login`                         | Login & get tokens         | Public   |
| `POST` | `/auth/logout`                        | Logout current user        | Required |
| `GET`  | `/auth/current-user`                  | Get current user profile   | Required |
| `POST` | `/auth/change-password`               | Change password            | Required |
| `POST` | `/auth/refresh-token`                 | Refresh access token       | Public   |
| `GET`  | `/auth/verify-email/:verificationToken` | Verify email address     | Public   |
| `POST` | `/auth/forgot-password`               | Request password reset     | Public   |
| `POST` | `/auth/reset-password/:resetToken`    | Reset forgotten password   | Public   |
| `POST` | `/auth/resend-email-verification`     | Resend verification email  | Required |

### Projects — `/projects`

| Method   | Endpoint                           | Description            | Auth     | Role        |
| -------- | ---------------------------------- | ---------------------- | -------- | ----------- |
| `GET`    | `/projects/`                       | List user's projects   | Required | Any         |
| `POST`   | `/projects/`                       | Create a new project   | Required | Any         |
| `GET`    | `/projects/:projectId`             | Get project details    | Required | Role-based  |
| `PUT`    | `/projects/:projectId`             | Update project         | Required | Admin       |
| `DELETE` | `/projects/:projectId`             | Delete project         | Required | Admin       |
| `GET`    | `/projects/:projectId/members`     | List project members   | Required | Any         |
| `POST`   | `/projects/:projectId/members`     | Add member to project  | Required | Admin       |
| `PUT`    | `/projects/:projectId/members/:userId` | Update member role | Required | Admin       |
| `DELETE` | `/projects/:projectId/members/:userId` | Remove member      | Required | Admin       |

### Tasks — `/tasks`

| Method   | Endpoint                                    | Description        | Auth     | Role               |
| -------- | ------------------------------------------- | ------------------ | -------- | ------------------ |
| `GET`    | `/tasks/:projectId`                         | List project tasks | Required | Role-based         |
| `POST`   | `/tasks/:projectId`                         | Create a task      | Required | Admin/Project Admin |
| `GET`    | `/tasks/:projectId/t/:taskId`               | Get task details   | Required | Role-based         |
| `PUT`    | `/tasks/:projectId/t/:taskId`               | Update a task      | Required | Admin/Project Admin |
| `DELETE` | `/tasks/:projectId/t/:taskId`               | Delete a task      | Required | Admin/Project Admin |
| `POST`   | `/tasks/:projectId/t/:taskId/subtasks`      | Create subtask     | Required | Admin/Project Admin |
| `PUT`    | `/tasks/:projectId/st/:subTaskId`           | Update subtask     | Required | Role-based         |
| `DELETE` | `/tasks/:projectId/st/:subTaskId`           | Delete subtask     | Required | Admin/Project Admin |

### Notes — `/notes`

| Method   | Endpoint                          | Description       | Auth     | Role       |
| -------- | --------------------------------- | ----------------- | -------- | ---------- |
| `GET`    | `/notes/:projectId`               | List project notes| Required | Role-based |
| `POST`   | `/notes/:projectId`               | Create a note     | Required | Admin      |
| `GET`    | `/notes/:projectId/n/:noteId`     | Get note details  | Required | Role-based |
| `PUT`    | `/notes/:projectId/n/:noteId`     | Update a note     | Required | Admin      |
| `DELETE` | `/notes/:projectId/n/:noteId`     | Delete a note     | Required | Admin      |

---

## Role-Based Access Control

The system implements a three-tier permission model:

| Feature                        | Admin | Project Admin | Member |
| ------------------------------ | :---: | :-----------: | :----: |
| Create Project                 |  Yes  |      No       |   No   |
| Update / Delete Project        |  Yes  |      No       |   No   |
| Manage Project Members         |  Yes  |      No       |   No   |
| Create / Update / Delete Tasks |  Yes  |      Yes      |   No   |
| View Tasks                     |  Yes  |      Yes      |   Yes  |
| Update Subtask Status          |  Yes  |      Yes      |   Yes  |
| Create / Delete Subtasks       |  Yes  |      Yes      |   No   |
| Create / Update / Delete Notes |  Yes  |      No       |   No   |
| View Notes                     |  Yes  |      Yes      |   Yes  |

### Role Definitions

- **Admin** — Full system access. Can create projects, manage members, and control all resources.
- **Project Admin** — Project-level administrative access. Can manage tasks and subtasks within assigned projects.
- **Member** — Basic access. Can view projects, tasks, and notes. Can update subtask completion status.

---

## Data Models

### User
- Email, username, password (hashed with bcrypt)
- Email verification token & status
- Refresh token for session management
- Forgot password token with expiry

### Project
- Name, description
- Created by (references User)
- Timestamps

### Project Member
- References User and Project
- Role: `admin` | `project_admin` | `member`

### Task
- Title, description, project reference
- Assigned to (references User)
- Status: `todo` | `in_progress` | `done`
- Attachments (array of file objects with URL, MIME type, size)

### Subtask
- Title, task reference
- Completion status (`isCompleted`)

### Note
- Title, content
- Project reference, created by reference

---

## Security

- **JWT Authentication** — Access and refresh token pair with configurable expiry
- **Password Hashing** — bcrypt with salted hashing
- **Role-Based Authorization** — Middleware-enforced permission checks on every protected route
- **Input Validation** — Request payload validation via express-validator on all endpoints
- **Email Verification** — Mandatory account verification before full access
- **Secure Password Reset** — Time-limited reset tokens delivered via email
- **CORS** — Configurable cross-origin request policy
- **Cookie Parser** — Secure cookie handling for token storage

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the **ISC License**.
