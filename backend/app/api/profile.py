from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.user import User
from app.models.profile import Profile
from app.schemas.profile import ProfileUpdate, ProfileResponse
from app.utils.security import get_current_user

router = APIRouter(prefix="/api/profile", tags=["Profile"])

@router.get("", response_model=ProfileResponse)
def get_user_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    if not profile:
        profile = Profile(
            user_id=current_user.id,
            target_role="Full-Stack Developer",
            skills="Java,JavaScript,React,HTML,CSS,Git,FastAPI,SQL"
        )
        db.add(profile)
        db.commit()
        db.refresh(profile)

    return {
        "id": profile.id,
        "full_name": current_user.full_name,
        "email": current_user.email,
        "college": profile.college,
        "degree": profile.degree,
        "experience": profile.experience,
        "current_role": profile.current_role,
        "target_role": profile.target_role,
        "career_goal": profile.career_goal,
        "weekly_hours": profile.weekly_hours,
        "skills": [s.strip() for s in profile.skills.split(",") if s.strip()],
        "career_readiness": profile.career_readiness,
        "streak": profile.streak
    }

@router.put("", response_model=ProfileResponse)
def update_user_profile(
    data: ProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    if not profile:
        profile = Profile(user_id=current_user.id)
        db.add(profile)

    if data.full_name:
        current_user.full_name = data.full_name
    if data.email:
        current_user.email = data.email
    if data.college is not None:
        profile.college = data.college
    if data.degree is not None:
        profile.degree = data.degree
    if data.experience is not None:
        profile.experience = data.experience
    if data.current_role is not None:
        profile.current_role = data.current_role
    if data.target_role is not None:
        profile.target_role = data.target_role
    if data.career_goal is not None:
        profile.career_goal = data.career_goal
    if data.weekly_hours is not None:
        profile.weekly_hours = data.weekly_hours
    if data.skills is not None:
        profile.skills = ",".join(data.skills)

    db.commit()
    db.refresh(profile)
    db.refresh(current_user)

    return {
        "id": profile.id,
        "full_name": current_user.full_name,
        "email": current_user.email,
        "college": profile.college,
        "degree": profile.degree,
        "experience": profile.experience,
        "current_role": profile.current_role,
        "target_role": profile.target_role,
        "career_goal": profile.career_goal,
        "weekly_hours": profile.weekly_hours,
        "skills": [s.strip() for s in profile.skills.split(",") if s.strip()],
        "career_readiness": profile.career_readiness,
        "streak": profile.streak
    }
