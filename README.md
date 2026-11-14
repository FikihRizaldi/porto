# Portfolio & Admin CMS - Muhamad Fikih Rizaldi

Welcome to the personal portfolio and dynamic content management system of **Muhamad Fikih Rizaldi** — Software Engineer, Machine Learning & Modern Web Developer.

---

## 🏗️ Architecture

This repository is organized as a monorepo containing:
- **`frontend/`**: Next.js 16 (App Router), React 19, Tailwind CSS 4, Lucide Icons, and dynamic portfolio presentation with interactive deck cards & bilingual context.
- **`backend/`**: Express.js REST API with SQLite database (`node:sqlite`), JWT Authentication, bcrypt password hashing, rate limiting, and dynamic file upload handling.
- **Admin Control Center (`/admin`)**: Fully integrated admin dashboard for live updating profile, 5 hero deck cards, projects, skills, experiences, certificates, and contacts without redeploying.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Lucide React
- **Backend**: Node.js, Express.js, SQLite (`node:sqlite`), JWT, Bcrypt, Multer
- **Workflow**: Concurrently for running fullstack dev server simultaneously

---

## 💻 Running Locally

### 1. Clone the repository
```bash
git clone https://github.com/FikihRizaldi/porto.git
cd porto
```

### 2. Install Dependencies
```bash
# Install root orchestration dependencies
npm install

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install

# Return to root
cd ..
```

### 3. Setup Environment Variables
Copy the example environment file in `backend`:
```bash
cp backend/.env.example backend/.env
```
Fill in your desired `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `MASTER_RECOVERY_KEY`.

### 4. Start the Application
Run both backend (port 5000) and frontend (port 3000) concurrently:
```bash
npm run dev
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Backend API**: [http://localhost:5000/api/portfolio](http://localhost:5000/api/portfolio)

### 5. Emergency Admin Reset (CLI)
If you forget your admin credentials, reset them locally via CLI:
```bash
npm run reset-password <new_username> <new_password>
```

---

## 📬 Contact
- **Email**: fikihrizaldi31@students.amikom.ac.id
- **GitHub**: [FikihRizaldi](https://github.com/FikihRizaldi)
