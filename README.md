# 🧠 Modelia 2.0 – AI Image Generation Studio

A full-stack web application simulating an AI fashion studio.  
Users can sign up, log in, upload images, write prompts, and generate simulated AI images with retry and abort features.

---

## 🚀 Tech Stack

### Frontend
- React + TypeScript + TailwindCSS  
- React Router  
- Axios  
- React Hot Toast  
- Vitest + React Testing Library  

### Backend
- Node.js + Express + TypeScript  
- Prisma ORM + PostgreSQL  
- JWT Authentication with cookie
- Zod validation  
- Jest + Supertest  

---
### Pull Requests
PR-1: `https://github.com/OMzaiswal/modelia-ai-studio-2.0/pull/1`;
PR-2: `https://github.com/OMzaiswal/modelia-ai-studio-2.0/pull/2`;
PR-3  `https://github.com/OMzaiswal/modelia-ai-studio-2.0/pull/3`;
PR-4  `https://github.com/OMzaiswal/modelia-ai-studio-2.0/pull/4`;
PR-5  `https://github.com/OMzaiswal/modelia-ai-studio-2.0/pull/5`;

## 📦 Project Structure

modelia-2.0/
│
├──── backend/ # Express + TS backend
| |────  prisma/
│ ├──── src/
│ │ ├──── routes/
│ │ ├── ──controllers/
│ │ ├── services/
│ │ ├── middleware/
│ │
│ ├── tests/
│ └── package.json
│
├── frontend/ # React + TS frontend
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── hooks/
│ │ ├── pages/
│ │ └── utils/
│ ├── tests/
│ └── package.json
│
├── .github/workflows/ci.yml # CI for automated testing
├── OPENAPI.yaml # API specification
├── EVAL.md # Required evaluation checklist
├── AI_USAGE.md # Notes on AI assistance
└── README.md


## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/OMzaiswal/modelia-ai-studio-2.0.git
cd modelia-2.0

Install dependencies:
- npm install

Environment setup:
-Create a .env file in backend as well as frontend:
- copy variables from .env.example to .env and add real or local environment values

Run the app
- cd frontend and run "npm run dev"
- cd backend and run "npm run dev"

This runs both backend and frontend concurrently.
- Frontend → http://localhost:5173
- Backend → http://localhost:3000

🧪 Testing
Run all tests (backend, frontend, e2e):
npm run test:all

Individual commands:
npm run test:backend
npm run test:frontend

Deployment:
Frontend (Vercel) url: https://ai-studio.om108.work
Backend (Railway) url: https://api.ai-studio.om108.work

