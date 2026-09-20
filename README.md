# EduPath AI — Personalized Learning & Skill Gap Agent

EduPath AI is a full-stack, AI-powered adaptive learning platform that analyzes a user's current skills, target career role, resume, learning progress, and performance to dynamically create, track, and adapt a personalized learning path in real time.

---

## 🌟 12 Core Functional Modules

1. **Authentication & Profile Setup**
   - Secure JWT-based registration (`/auth/register`), login (`/auth/login`), profile retrieval (`/auth/me`), and profile updates with target role selection (`/profile`).
2. **AI Resume Parser & Skill Extractor**
   - PDF/DOCX file upload (`/resume/upload`), text parsing, project extraction, and interactive editable skill chips (add/remove custom skills before analysis).
3. **Skill Gap & Competency Analysis**
   - Comprehensive matrix (`/skills/gap-analysis`) comparing current competencies with industry target roles, categorizing skills into 🟢 Strong, 🟡 Developing, and 🔴 Missing with match score calculation.
4. **Personalized Learning Path & Dynamic Roadmap**
   - Curriculum generation (`/learning/learning-path`, `/learning/roadmap`) organized into sequenced milestones with topics, difficulty levels, duration, and interactive topic checkboxes.
5. **Curated Learning Resources Hub**
   - High-yield resources recommendation (`/resources/recommend`, `/api/resources`) backed by database querying and CSV data.
6. **Weekly Study Schedule Board**
   - Day-by-day 7-day study plan (`/learning/weekly-plan`) with real-time interactive task completion tracking and weekly completion rate calculation.
7. **Adaptive Practice & Calibration Hub**
   - Interactive quiz generation (`/practice/generate`, `/practice/submit`) across categories with instant grading, scoring, and AI explanations.
8. **Adaptive Learning Agent**
   - Dynamic re-planning engine (`/adaptive/replan`) that detects weak topics (<60% accuracy) and automatically re-sequences the curriculum to insert foundational revision modules before advanced topics.
9. **Progress Telemetry & Analytics**
   - Real-time performance tracking (`/progress/update`, `/progress/{user_id}`, `/progress/metrics`) with Recharts competency growth lines, daily learning hours, and skill distribution charts.
10. **Executive Dashboard**
    - High-density dashboard (`/dashboard`) with career readiness gauge, active competencies, today's checklist, and adaptive recommendation alerts.
11. **Official Career Readiness Audit Report**
    - Executive audit report (`/reports/{user_id}`, `/reports/career`) with hireability benchmarks, achievements, and printable PDF export.
12. **24/7 Contextual AI Mentor Chat**
    - Real-time conversational AI mentor (`/chat/message`) with domain-aware guidance and fast deterministic fallbacks.

---

## 🏗️ Architecture & Technology Stack

```
EduPath/
│
├── frontend/                     # React 18, Vite, Tailwind CSS, Recharts, Lucide Icons
│   ├── src/
│   │   ├── components/           # Navbar, Sidebar, SkillCard, ProgressCard, Loading, etc.
│   │   ├── pages/                # 12 Modular Views (Landing, Login, Dashboard, Skills, Roadmap, Practice, etc.)
│   │   ├── services/             # Axios API client layer with JWT interceptors
│   │   ├── context/              # AuthContext session management
│   │   └── hooks/                # useAuth, useProgress
│
├── backend/                      # Python 3.10+, FastAPI, SQLAlchemy, Pydantic, Uvicorn
│   ├── app/
│   │   ├── api/                  # Routers: auth, profile, skills, resume, learning, practice, progress, reports, chat
│   │   ├── services/             # Skill gap, roadmap, learning agent, practice generator, adaptive agent
│   │   ├── models/               # SQLAlchemy ORM models (User, Profile, Skill, Roadmap, Progress, etc.)
│   │   ├── database/             # Database session & CSV seed engine
│   │   └── utils/                # JWT security & file parsers
│
├── data/                         # CSV seed datasets (skills.csv, roles.csv, resources.csv)
├── uploads/                      # Uploaded resume storage
└── tests/                        # Pytest suite
```

### Design System & Palette
- **Background**: Slate Tint (`#F8FAFC`)
- **Primary Text & Headings**: Deep Navy (`#0F172A`)
- **Primary Brand / Action**: Deep Teal (`#0F766E` / `#115E59`)
- **Success / Verified**: Forest Green (`#16A34A` / `#DCFCE7`)
- **Warning / In Progress**: Amber (`#D97706` / `#FEF3C7`)
- **Error / Missing Gap**: Crimson Red (`#DC2626` / `#FEE2E2`)

---

## 🚀 Quick Start & Installation

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```
- Interactive Swagger API Documentation: `http://127.0.0.1:8001/docs`
- Health check: `http://127.0.0.1:8001/health`

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
- Access UI in browser: `http://localhost:5173`

---

## 🧭 Complete Hackathon Demo Flow

1. **Landing & Onboarding**:
   - Open `http://localhost:5173/` and click **"Get Started"** to access the login/registration screen (`/login`).
   - Log in using demo credentials or register a new user profile.
2. **Profile & Target Role Setup (`/profile`)**:
   - Set current education, years of experience, and select your target role (e.g. `Full-Stack Developer` or `Frontend Engineer`).
3. **Resume Upload & Editable Skill Parser (`/resume`)**:
   - Upload any sample PDF/DOCX resume (or click analyze on the demo profile).
   - View extracted projects, education, certifications, and detected skills.
   - **Interactive Feature**: Edit the detected skill chips (remove chips with `✕` or add custom skills via the input).
   - Click **"Confirm & View Skill Gap Analysis"**.
4. **Skill Gap & Competency Analysis (`/skills`)**:
   - Inspect role readiness match percentage, breakdown cards (Strong, Developing, Missing), and high-priority skill gaps.
   - Click **"Generate My Learning Roadmap"**.
5. **Personalized Learning Roadmap (`/roadmap` & `/learning-path`)**:
   - Review sequenced learning milestones with duration, difficulty, and curriculum topics.
   - Check off completed topics in real time to see the dynamic progress bar update.
   - Click **"Practice [Skill]"** to jump straight into calibration.
6. **Weekly Study Plan (`/weekly-plan`)**:
   - Explore day-by-day micro-tasks with live completion rate and toggle checkboxes.
7. **Adaptive Practice Hub (`/practice`)**:
   - Select topics (React, FastAPI, REST APIs, Database, Docker).
   - Submit answers with immediate scoring and AI explanations.
   - **Adaptive Showcase**: If score < 60%, the system flags weak areas and displays the **Adaptive Learning Agent Re-planning Alert**, re-sequencing the roadmap to prioritize revision.
8. **Real-Time Growth Analytics (`/progress`)**:
   - Inspect skill competency trajectory line charts, daily study hours bar charts, and skill time allocation donut graphs.
9. **Executive Career Readiness Audit (`/reports`)**:
   - Review the candidate evaluation summary, benchmark scores, unlocked achievement badges, and export to PDF via the **Download Report** button.
10. **24/7 AI Mentor Chat (`/chat`)**:
    - Ask questions such as *"What should I learn next?"* or *"Explain my skill gaps"* to receive real-time, context-aware coaching.

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Login and receive JWT access token |
| `GET` | `/auth/me` | Fetch authenticated user details |
| `POST` | `/resume/upload` | Upload and parse resume |
| `POST` | `/resume/extract-skills` | Extract technical entities & skills |
| `POST` | `/skills/gap-analysis` | Benchmark current skills against target role |
| `POST` | `/roadmap` | Generate prioritized learning roadmap |
| `GET` | `/learning/roadmap` | Retrieve step-by-step modular curriculum |
| `GET` | `/learning/weekly-plan` | Retrieve 7-day scheduled study plan |
| `POST` | `/learning/tasks/{task_id}/toggle` | Toggle weekly task status |
| `POST` | `/practice/generate` | Generate skill assessment questions |
| `POST` | `/practice/submit` | Grade assessment and detect weak topics |
| `POST` | `/adaptive/replan` | Re-sequence roadmap based on performance |
| `POST` | `/progress/update` | Record study hours and module completions |
| `GET` | `/progress/metrics` | Retrieve aggregated analytics & chart data |
| `GET` | `/reports/career` | Generate official career audit report |
| `POST` | `/chat/message` | Context-aware AI Mentor conversation |
