import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.models import init_db
from app.api.resume import router as resume_router
from app.api.skills import router as skills_router
# Routers
from app.api.auth import router as auth_router
from app.api.profile import router as profile_router
from app.api.skills import router as skills_router
from app.api.resume import router as resume_router
from app.api.learning import router as learning_router
from app.api.resources import router as resources_router
from app.api.practice import router as practice_router
from app.api.progress import router as progress_router
from app.api.reports import router as reports_router
from app.api.chat import router as chat_router
from app.api.roadmap import router as roadmap_router

# Initialize database schema and CSV seeds
init_db()

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield

app = FastAPI(
    title="EduPath AI – Personalized Learning & Skill Gap API",
    description="Backend API services for automated resume analysis, skill gap benchmarking, adaptive learning roadmaps, practice quizzes, and AI mentoring.",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration
origins = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:5173,"
    "http://localhost:3000,"
    "http://127.0.0.1:5173,"
    "http://127.0.0.1:3000,"
    "https://frontend-8am0u8ff3-praveena-p-729s-projects.vercel.app"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(auth_router)
app.include_router(profile_router)
app.include_router(skills_router)
app.include_router(resume_router)
app.include_router(learning_router)
app.include_router(resources_router)
app.include_router(practice_router)
app.include_router(progress_router)
app.include_router(reports_router)
app.include_router(chat_router)
app.include_router(roadmap_router)
@app.get("/")
def root():
    return {
        "status": "online",
        "app": "EduPath AI API",
        "version": "1.0.0",
        "documentation": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}
