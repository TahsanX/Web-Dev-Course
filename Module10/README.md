# DevPulse – Internal Tech Issue & Feature Tracker

A RESTful API for software teams to report bugs, suggest features, and coordinate resolutions. Built with Node.js, TypeScript, Express, and PostgreSQL.

**Live URL:** http://devpulse-puce.vercel.app/

---

## Tech Stack

- **Runtime:** Node.js (LTS)
- **Language:** TypeScript (strict mode)
- **Framework:** Express.js
- **Database:** PostgreSQL via native `pg` driver (raw SQL only, no ORM)
- **Auth:** JSON Web Tokens (JWT)
- **Password Hashing:** bcryptjs (10 salt rounds)
- **Deployment:** Vercel + Supabase

---

## Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/devpulse.git
cd devpulse
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up PostgreSQL on Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. **Save the database password** shown during project creation — you will need it
3. Once the project is ready, go to **Project Settings → Database**
4. Click **Connect** at the top of the page
5. Select **Direct connection** tab, then switch to **Session pooler**
6. Copy the connection string — it looks like:
   ```
   postgresql://postgres.xxxxxxxxxxxx:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
   ```
7. From the connection string, extract each part and paste into your `.env` file:
   - `POSTGRE_HOST` → the hostname (e.g. `aws-0-ap-southeast-1.pooler.supabase.com`)
   - `POSTGRE_PORT` → `5432`
   - `POSTGRE_USER` → `postgres.xxxxxxxxxxxx`
   - `POSTGRE_PASSWORD` → the password you saved during project creation
   - `POSTGRE_DATABASE` → `postgres`

### 4. Configure environment variables

```bash
cp .env.example .env
```

Fill in the values from your Supabase connection details.

### 5. Run the development server

```bash
npm run dev
```

The server starts on `http://localhost:3000`.

---

## Environment Variables

See `.env.example` for the full list of required variables.

---

## Database Schema

```sql
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'contributor' CHECK (role IN ('contributor', 'maintainer')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Issues table
CREATE TABLE IF NOT EXISTS issues (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('bug', 'feature_request')),
  status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved')),
  reporter_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## API Endpoints

Base URL: `http://localhost:3000`

All protected routes require the header:
```
Authorization: Bearer <JWT_TOKEN>
```

---

### Auth

#### POST `/api/auth/signup`

Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@devpulse.com",
  "password": "securePassword123",
  "role": "contributor"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@devpulse.com",
    "role": "contributor",
    "created_at": "2026-01-20T09:00:00.000Z",
    "updated_at": "2026-01-20T09:00:00.000Z"
  }
}
```

---

#### POST `/api/auth/login`

Login and receive a JWT token.

**Request Body:**
```json
{
  "email": "john@devpulse.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@devpulse.com",
      "role": "contributor",
      "created_at": "2026-01-20T09:00:00.000Z",
      "updated_at": "2026-01-20T09:00:00.000Z"
    }
  }
}
```

---

### Issues

#### POST `/api/issues`

Create a new issue. Requires authentication.

**Headers:** `Authorization: Bearer <TOKEN>`

**Request Body:**
```json
{
  "title": "Database connection timeout under load",
  "description": "Pool exhausts after 50+ concurrent queries, causing 500 errors",
  "type": "bug"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Issue created successfully",
  "data": {
    "id": 45,
    "title": "Database connection timeout under load",
    "description": "Pool exhausts after 50+ concurrent queries, causing 500 errors",
    "type": "bug",
    "status": "open",
    "reporter_id": 1,
    "created_at": "2026-01-20T10:30:00.000Z",
    "updated_at": "2026-01-20T10:30:00.000Z"
  }
}
```

---

#### GET `/api/issues`

Get all issues. Public route. Supports filtering and sorting.

**Query Parameters:**

| Param | Values | Default |
|-------|--------|---------|
| `sort` | `newest`, `oldest` | `newest` |
| `type` | `bug`, `feature_request` | — |
| `status` | `open`, `in_progress`, `resolved` | — |

**Example:** `GET /api/issues?sort=oldest&type=bug&status=open`

**Response (200):**
```json
{
  "success": true,
  "message": "Issues retrived successfully",
  "data": [
    {
      "id": 45,
      "title": "Database connection timeout under load",
      "description": "Pool exhausts after 50+ concurrent queries, causing 500 errors",
      "type": "bug",
      "status": "open",
      "reporter": {
        "id": 1,
        "name": "John Doe",
        "role": "contributor"
      },
      "created_at": "2026-01-20T10:30:00.000Z",
      "updated_at": "2026-01-20T10:30:00.000Z"
    }
  ]
}
```

---

#### GET `/api/issues/:id`

Get a single issue by ID. Public route.

**Example:** `GET /api/issues/45`

**Response (200):**
```json
{
  "success": true,
  "message": "Issue retrived successfully",
  "data": {
    "id": 45,
    "title": "Database connection timeout under load",
    "description": "Pool exhausts after 50+ concurrent queries, causing 500 errors",
    "type": "bug",
    "status": "open",
    "reporter": {
      "id": 1,
      "name": "John Doe",
      "role": "contributor"
    },
    "created_at": "2026-01-20T10:30:00.000Z",
    "updated_at": "2026-01-20T10:30:00.000Z"
  }
}
```

**Response (404):**
```json
{
  "success": false,
  "message": "Not Found",
  "error": "Issue Not found!"
}
```

---

#### PATCH `/api/issues/:id`

Update an issue. Requires authentication.

- **Maintainers** can update any issue
- **Contributors** can only update their own issues when status is `open`

**Headers:** `Authorization: Bearer <TOKEN>`

**Request Body (all fields optional, at least one required):**
```json
{
  "title": "Updated title",
  "description": "Updated description with more than twenty characters",
  "type": "feature_request"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Issue updated successfully",
  "data": {
    "id": 45,
    "title": "Updated title",
    "description": "Updated description with more than twenty characters",
    "type": "feature_request",
    "status": "open",
    "reporter_id": 1,
    "created_at": "2026-01-20T10:30:00.000Z",
    "updated_at": "2026-01-20T14:45:00.000Z"
  }
}
```

**Response (403 — contributor trying to edit someone else's issue):**
```json
{
  "success": false,
  "message": "Forbidden",
  "error": "Contributors can only update their own issues with 'open' status"
}
```

---

#### DELETE `/api/issues/:id`

Delete an issue. Maintainer only.

**Headers:** `Authorization: Bearer <TOKEN>`

**Response (200):**
```json
{
  "success": true,
  "message": "Issue deleted successfully",
  "data": null
}
```

**Response (403 — contributor attempting delete):**
```json
{
  "success": false,
  "message": "Forbidden",
  "error": "Insufficient permissions"
}
```

---

## Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Compile TypeScript to dist/
npm start        # Run compiled production build
```
