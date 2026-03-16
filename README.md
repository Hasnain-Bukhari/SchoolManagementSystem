# School Management System

Full-stack application with a React (Vite) frontend and NestJS REST API, using PostgreSQL and TypeORM.

## Tech Stack

| Layer     | Technologies                          |
| --------- | ------------------------------------- |
| Frontend  | React, TypeScript, Vite, React Router, Axios, ESLint, Prettier |
| Backend   | Node.js, NestJS, TypeScript, TypeORM, PostgreSQL |
| Dev tools | ESLint, Prettier, Husky (UI)          |
| Optional  | Docker (Postgres, backend, frontend)  |

## Project Structure

```
root
├── apis                    # NestJS backend
│   ├── src
│   │   ├── common          # Interceptors, filters, guards
│   │   │   ├── interceptors
│   │   │   │   └── response.interceptor.ts
│   │   │   ├── filters
│   │   │   │   └── http-exception.filter.ts
│   │   │   └── guards
│   │   ├── config
│   │   │   └── database.config.ts
│   │   ├── modules
│   │   │   └── users
│   │   │       ├── controllers
│   │   │       │   └── users.controller.ts
│   │   │       ├── services
│   │   │       │   └── users.service.ts
│   │   │       ├── repositories
│   │   │       │   └── users.repository.ts
│   │   │       ├── entities
│   │   │       │   └── user.entity.ts
│   │   │       ├── dto
│   │   │       │   ├── create-user.dto.ts
│   │   │       │   └── update-user.dto.ts
│   │   │       └── users.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env
│   ├── .env.example
│   ├── Dockerfile
│   ├── nest-cli.json
│   ├── package.json
│   ├── tsconfig.json
│   └── eslint.config.mjs
│
├── ui                       # React frontend
│   ├── src
│   │   ├── api
│   │   │   └── axiosClient.ts
│   │   ├── components
│   │   │   └── common
│   │   ├── pages
│   │   │   ├── Home
│   │   │   │   └── index.tsx
│   │   │   └── Users
│   │   │       └── index.tsx
│   │   ├── hooks
│   │   ├── context
│   │   ├── routes
│   │   │   └── AppRoutes.tsx
│   │   ├── layouts
│   │   │   └── MainLayout.tsx
│   │   ├── services
│   │   │   └── users.service.ts
│   │   ├── types
│   │   │   └── user.ts
│   │   ├── utils
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── index.css
│   │   └── vite-env.d.ts
│   ├── public
│   ├── .env
│   ├── .env.example
│   ├── .husky
│   │   └── pre-commit
│   ├── Dockerfile
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   ├── eslint.config.js
│   └── .prettierrc
│
├── docker-compose.yml
└── README.md
```

## API Response Format

All APIs return a consistent envelope:

```json
{
  "success": true,
  "data": {},
  "message": ""
}
```

Errors return `success: false`, `data: null`, and `message` with the error description.

## Prerequisites

- **Node.js** 18+ (recommend 20+)
- **npm** 9+
- **PostgreSQL** 14+ (for local run without Docker)

## Setup Commands

### 1. Backend (APIs)

```bash
cd apis
npm install
```

Copy environment and set your database credentials:

```bash
cp .env.example .env
# Edit .env: DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE
```

Create the database (if it doesn’t exist):

```bash
# Using psql or any PostgreSQL client:
# CREATE DATABASE school_management;
```

### 2. Frontend (UI)

```bash
cd ui
npm install
```

Optional: copy and adjust env for API URL:

```bash
cp .env.example .env
# VITE_API_BASE_URL=http://localhost:3000/api
```

### 3. Husky (frontend, optional)

From repo root, after `npm install` in `ui`:

```bash
cd ui && npx husky init
```

The pre-commit hook runs `npm run lint` and `npm run format:check` in `ui`.

## Run Locally

### Terminal 1 – Backend

```bash
cd apis
npm run start:dev
```

API base: **http://localhost:3000/api**  
Example: `GET http://localhost:3000/api/users`

### Terminal 2 – Frontend

```bash
cd ui
npm run dev
```

App: **http://localhost:5173**

- **Home**: `/`  
- **Users**: `/users` (lists users from `GET /api/users`)

Ensure PostgreSQL is running and `.env` in `apis` matches your DB settings. TypeORM will create/update tables on startup when `synchronize` is enabled (development only).

## Docker (Optional)

From the repo root:

```bash
docker compose up -d
```

- **PostgreSQL**: `localhost:5432` (user: `postgres`, password: `postgres`, DB: `school_management`)
- **Backend**: http://localhost:3000/api  
- **Frontend**: http://localhost:5173  

To run only the database and run backend/frontend on the host:

```bash
docker compose up -d postgres
# Then in two terminals: cd apis && npm run start:dev  and  cd ui && npm run dev
```

## Available Scripts

### Backend (`apis`)

| Command           | Description                |
| ----------------- | -------------------------- |
| `npm run start:dev` | Start in watch mode        |
| `npm run build`   | Build for production       |
| `npm run start:prod` | Run built app           |
| `npm run lint`    | Run ESLint                 |
| `npm run format`  | Format with Prettier       |

### Frontend (`ui`)

| Command           | Description                |
| ----------------- | -------------------------- |
| `npm run dev`     | Start Vite dev server      |
| `npm run build`   | Production build           |
| `npm run preview` | Preview production build   |
| `npm run lint`    | Run ESLint                 |
| `npm run lint:fix`| ESLint with auto-fix       |
| `npm run format`  | Format with Prettier       |
| `npm run format:check` | Check formatting      |

## Users API

| Method | Path        | Description        |
| ------ | ----------- | ------------------ |
| GET    | /api/users  | List all users     |
| GET    | /api/users/:id | Get one user   |
| POST   | /api/users  | Create user        |
| PUT    | /api/users/:id | Update user     |
| DELETE | /api/users/:id | Delete user     |

**Create/Update body** (JSON): `firstName`, `lastName`, `email` (all required for create).

## Notes

- Backend uses a global prefix `api`, so all routes are under `/api`.
- CORS is set to allow `http://localhost:5173` by default.
- In development, the UI can proxy `/api` to the backend via `vite.config.ts`; set `VITE_API_BASE_URL` to `/api` when using the proxy.
