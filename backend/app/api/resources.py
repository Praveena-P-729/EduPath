from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from app.database.database import get_db
from app.services.recommendation import get_recommended_resources

router = APIRouter(tags=["Resources"])


class ResourceRecommendRequest(BaseModel):
    skill: str = "React"
    level: Optional[str] = "beginner"


# 1. POST /resources/recommend
@router.post("/resources/recommend")
@router.post("/api/resources/recommend")
def recommend_resources(request: ResourceRecommendRequest, db: Session = Depends(get_db)):
    resources = get_recommended_resources(skill_name=request.skill, db=db)
    formatted = []
    for r in resources:
        formatted.append({
            "title": r.get("title", f"{request.skill} Mastery"),
            "platform": r.get("author_or_source", "EduPath Knowledge Base"),
            "url": r.get("url", "https://react.dev"),
            "type": r.get("type", "Course"),
            "level": r.get("level", request.level or "Beginner")
        })
    return {"skill": request.skill, "resources": formatted}


# 2. GET /api/resources
@router.get("/api/resources")
@router.get("/resources")
def list_resources(skill: Optional[str] = Query(None), db: Session = Depends(get_db)):
    return get_recommended_resources(skill_name=skill, db=db)
