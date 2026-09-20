from fastapi import APIRouter, Depends, HTTPException, Query, Path
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.progress import ProgressLog, QuizResult
from app.services.progress_analyzer import get_progress_analytics
from app.services.adaptive_agent import analyze_learning_performance, recalibrate_learning_pace

router = APIRouter(tags=["Progress"])


class ProgressUpdateRequest(BaseModel):
    skill: str
    topic: str
    completed: bool = True
    score: Optional[float] = 80.0
    user_id: Optional[int] = 1


class AdaptiveReplanRequest(BaseModel):
    skill_scores: Optional[Dict[str, float]] = None
    completed_topics: Optional[List[str]] = None
    failed_topics: Optional[List[str]] = None
    target_role: Optional[str] = "Full-Stack Developer"


# In-memory progress tracking for quick demo state reactivity
_USER_PROGRESS_STORE = {
    1: {
        "completed_topics": [
            "HTML Semantic Elements",
            "CSS Flexbox & Grid",
            "JavaScript Async/Await",
            "React Components & Props",
            "FastAPI Routing"
        ],
        "total_topics": 24,
        "percentage": 68.0,
        "scores": {
            "JavaScript": 85.0,
            "React": 42.0,
            "Node.js": 45.0,
            "FastAPI": 65.0,
            "SQL": 78.0
        },
        "weak_skills": ["React", "Node.js"],
        "strong_skills": ["JavaScript", "HTML & CSS", "Git"],
        "learning_streak": 6
    }
}


# 1. POST /progress/update
@router.post("/progress/update")
@router.post("/api/progress/update")
def update_progress(request: ProgressUpdateRequest, db: Session = Depends(get_db)):
    # Persist log in PostgreSQL if available
    try:
        log = ProgressLog(
            user_id=request.user_id or 1,
            study_hours=1.5,
            topic=f"{request.skill}: {request.topic}"
        )
        db.add(log)
        db.commit()
    except Exception as e:
        db.rollback()

    # Update in-memory reactive store
    uid = request.user_id or 1
    if uid not in _USER_PROGRESS_STORE:
        _USER_PROGRESS_STORE[uid] = {
            "completed_topics": [],
            "total_topics": 24,
            "percentage": 0.0,
            "scores": {},
            "weak_skills": [],
            "strong_skills": [],
            "learning_streak": 1
        }

    user_data = _USER_PROGRESS_STORE[uid]
    topic_str = f"{request.skill}: {request.topic}"
    if request.completed and topic_str not in user_data["completed_topics"]:
        user_data["completed_topics"].append(topic_str)

    if request.score is not None:
        user_data["scores"][request.skill] = float(request.score)
        if request.score < 60 and request.skill not in user_data["weak_skills"]:
            user_data["weak_skills"].append(request.skill)
        elif request.score >= 80:
            if request.skill in user_data["weak_skills"]:
                user_data["weak_skills"].remove(request.skill)
            if request.skill not in user_data["strong_skills"]:
                user_data["strong_skills"].append(request.skill)

    user_data["percentage"] = round((len(user_data["completed_topics"]) / max(1, user_data["total_topics"])) * 100, 1)

    return {
        "status": "success",
        "message": "Progress recorded successfully",
        "progress": user_data
    }


# 2. GET /progress/metrics (for dashboard chart widgets)
@router.get("/api/progress/metrics")
@router.get("/progress/metrics")
def get_metrics():
    return get_progress_analytics()


# 3. GET /progress/{user_id}
@router.get("/progress/{user_id}")
@router.get("/api/progress/{user_id}")
def get_user_progress(user_id: int):
    data = _USER_PROGRESS_STORE.get(user_id, _USER_PROGRESS_STORE[1])
    return {
        "user_id": user_id,
        "completed_topics": data["completed_topics"],
        "total_topics": data["total_topics"],
        "percentage": data["percentage"],
        "scores": data["scores"],
        "weak_skills": data["weak_skills"],
        "strong_skills": data["strong_skills"],
        "learning_streak": data["learning_streak"]
    }


# 4. POST /adaptive/replan
@router.post("/adaptive/replan")
@router.post("/api/adaptive/replan")
def trigger_adaptive_replan(request: AdaptiveReplanRequest):
    uid_data = _USER_PROGRESS_STORE[1]
    scores = request.skill_scores if request.skill_scores else uid_data["scores"]
    result = analyze_learning_performance(
        skill_scores=scores,
        completed_topics=request.completed_topics or uid_data["completed_topics"],
        failed_topics=request.failed_topics,
        target_role=request.target_role or "Full-Stack Developer"
    )
    return result

