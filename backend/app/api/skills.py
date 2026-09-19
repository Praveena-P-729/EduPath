from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database.database import get_db
from app.models.skill import Skill
from app.models.profile import Profile
from app.models.user import User
from app.schemas.skill import SkillAnalysisResponse
from app.services.skill_gap import calculate_skill_gaps
from app.utils.security import get_current_user_optional

router = APIRouter(prefix="/api/skills", tags=["Skills"])

@router.get("", response_model=List[str])
def list_skills(db: Session = Depends(get_db)):
    skills = db.query(Skill).all()
    if skills:
        return [s.name for s in skills]
    return [
        "React", "JavaScript", "TypeScript", "Node.js", "Express", "HTML & CSS", "Tailwind CSS",
        "Python", "FastAPI", "PostgreSQL", "SQL", "MongoDB", "Redis", "Docker", "Docker Compose",
        "Kubernetes", "Git & GitHub", "CI/CD Pipelines", "AWS Cloud", "REST APIs", "GraphQL",
        "System Design", "Testing (PyTest/Jest)", "Java"
    ]

@router.get("/analysis", response_model=SkillAnalysisResponse)
def get_skill_gap_analysis(
    role: Optional[str] = Query("Full-Stack Developer"),
    current_user: Optional[User] = Depends(get_current_user_optional),
    db: Session = Depends(get_db)
):
    user_skills = []
    if current_user:
        profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
        if profile and profile.skills:
            user_skills = [s.strip() for s in profile.skills.split(",") if s.strip()]

    if not user_skills:
        user_skills = ["Java", "JavaScript", "React", "HTML", "CSS", "Git", "FastAPI", "SQL"]

    analysis = calculate_skill_gaps(user_skills=user_skills, target_role_name=role, db=db)
    return analysis
