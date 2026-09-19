# EduPath AI — Personalized Learning & Skill Gap Agent

EduPath AI is a personalized career readiness platform that uses AI agents to analyze resumes, detect skill gaps against industry target roles, generate step-by-step learning paths with curated resources, deliver adaptive quizzes, track progress, and provide a 24/7 interactive AI Mentor.

---

## 🌟 Key Features

1. **AI Resume & Skill Parsing**: Extract technical skills, projects, and work experience from PDF/DOCX resumes.
2. **Role Benchmark & Gap Detection**: Compare your profile against target roles (Full-Stack, Frontend, Backend, AI/ML, Data Science, DevOps) categorized into 🟢 Strong, 🟡 Developing, and 🔴 Missing.
3. **Personalized Learning Path**: Dynamic modular roadmaps from fundamentals to capstones with milestone tracking.
4. **Weekly Study Plan**: Structured day-by-day task checklist with real-time completion tracking.
5. **Interactive Practice Hub**: Adaptive MCQs, debugging scenarios, and instant AI explanations.
6. **Live Telemetry & Growth Analytics**: Recharts-powered skill growth curves, daily hours, and distribution charts.
7. **Official Career Readiness Audit**: Executive report with hireability benchmark and PDF printable export.
8. **24/7 Conversational AI Mentor**: Context-aware career advice with RAG retrieval.

---

## 🏗️ Project Architecture

```
EduPath/
│
├── frontend/             # React 18, Vite, Tailwind CSS, Recharts, Lucide
│   ├── src/
│   │   ├── components/   # Navbar, Sidebar, SkillCard, ProgressCard, etc.
│   │   ├── pages/        # Landing, Login, Dashboard, Skills, Practice, etc.
│   │   ├── services/     # Axios client layer & API service modules
│   │   ├── context/      # AuthContext
│   │   └── hooks/        # useAuth, useProgress
│
├── backend/              # FastAPI, SQLAlchemy, Pydantic, Bcrypt, PyPDF2
│   ├── app/
│   │   ├── api/          # Routers: auth, profile, skills, resume, learning, etc.
│   │   ├── models/       # SQLAlchemy models
│   │   ├── schemas/      # Pydantic schemas
│   │   ├── services/     # Resume parser, skill gap, adaptive agent, etc.
│   │   ├── ai/           # LLM, embeddings, RAG, prompts
│   │   ├── database/     # DB engine & auto-seeder
│   │   └── utils/        # JWT security & file extractors
│
├── data/                 # Seed datasets: skills.csv, roles.csv, resources.csv
├── uploads/              # Resume upload repository
├── tests/                # Automated pytest suite
└── docker-compose.yml
```

---

## 🚀 Quick Start Guide

### 1. Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
Interactive API Docs available at: `http://localhost:8000/docs`

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Access UI at: `http://localhost:5173`

### 3. Run Automated Tests
```bash
pytest tests/ -v
```
