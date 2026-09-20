from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from app.schemas.learning import LearningModuleSchema, WeeklyTaskSchema
from app.services.learning_agent import (
    generate_personalized_roadmap,
    generate_weekly_plan,
    generate_learning_path
)

router = APIRouter(tags=["Learning"])


# Pydantic schemas for /learning/learning-path
class LearningPathRequest(BaseModel):
    missing_skills: List[str]


class SkillTopicItem(BaseModel):
    skill: str
    topics: List[str]


class LearningPathResponse(BaseModel):
    learning_path: List[SkillTopicItem]


class WeeklyPlanRequest(BaseModel):
    target_role: Optional[str] = "Full-Stack Developer"
    missing_skills: Optional[List[str]] = None
    available_hours_per_week: Optional[int] = 15
    current_progress: Optional[float] = 0.0


# 1. POST /learning/learning-path
@router.post("/learning/learning-path")
@router.post("/api/learning/learning-path")
def get_learning_path(request: LearningPathRequest):
    path = generate_learning_path(request.missing_skills)
    return {"learning_path": path}


# 2. POST /learning/weekly-plan
@router.post("/learning/weekly-plan")
@router.post("/api/learning/weekly-plan")
def create_weekly_plan(request: WeeklyPlanRequest):
    missing = request.missing_skills if request.missing_skills else ["JavaScript", "React", "REST API", "PostgreSQL"]
    primary_skill = missing[0] if len(missing) > 0 else "React"
    secondary_skill = missing[1] if len(missing) > 1 else "REST API"
    tertiary_skill = missing[2] if len(missing) > 2 else "PostgreSQL"

    hours_daily = round((request.available_hours_per_week or 15) / 7, 1)

    plan = [
        {
            "id": "d1",
            "day": "Monday",
            "skill": primary_skill,
            "topic": f"{primary_skill} Core Fundamentals & Syntax",
            "duration": f"{hours_daily} hours",
            "activity_type": "Video / Reading",
            "completed": True
        },
        {
            "id": "d2",
            "day": "Tuesday",
            "skill": primary_skill,
            "topic": f"{primary_skill} Deep Dive & Code Implementation",
            "duration": f"{hours_daily} hours",
            "activity_type": "Coding Lab",
            "completed": True
        },
        {
            "id": "d3",
            "day": "Wednesday",
            "skill": secondary_skill,
            "topic": f"{secondary_skill} Architecture & Design Patterns",
            "duration": f"{hours_daily} hours",
            "activity_type": "Interactive Tutorial",
            "completed": False
        },
        {
            "id": "d4",
            "day": "Thursday",
            "skill": secondary_skill,
            "topic": f"{secondary_skill} Hands-on API Integration & Debugging",
            "duration": f"{hours_daily} hours",
            "activity_type": "Hands-on Project",
            "completed": False
        },
        {
            "id": "d5",
            "day": "Friday",
            "skill": tertiary_skill,
            "topic": f"{tertiary_skill} Schema Optimization & Queries",
            "duration": f"{hours_daily} hours",
            "activity_type": "Database Lab",
            "completed": False
        },
        {
            "id": "d6",
            "day": "Saturday",
            "skill": "Full-Stack",
            "topic": "Capstone Integration: Connect React UI with FastAPI & PostgreSQL",
            "duration": f"{round(hours_daily * 1.5, 1)} hours",
            "activity_type": "Mini Project",
            "completed": False
        },
        {
            "id": "d7",
            "day": "Sunday",
            "skill": "Assessment",
            "topic": "Weekly Knowledge Check-In & Adaptive Quiz Evaluation",
            "duration": "1 hour",
            "activity_type": "Practice Quiz",
            "completed": False
        }
    ]
    return {"target_role": request.target_role, "weekly_plan": plan}


# 3. GET /learning/roadmap
@router.get("/learning/roadmap")
@router.get("/api/learning/roadmap", response_model=List[LearningModuleSchema])
def get_roadmap(role: Optional[str] = Query("Full-Stack Developer")):
    return generate_personalized_roadmap(target_role=role)


# 4. GET /learning/weekly-plan
_LOCAL_WEEKLY_PLAN = generate_weekly_plan()

@router.get("/learning/weekly-plan")
@router.get("/api/learning/weekly-plan", response_model=List[WeeklyTaskSchema])
def get_weekly_plan_default():
    global _LOCAL_WEEKLY_PLAN
    return _LOCAL_WEEKLY_PLAN


# 5. POST /learning/tasks/{task_id}/toggle
@router.post("/learning/tasks/{task_id}/toggle")
@router.post("/api/learning/tasks/{task_id}/toggle", response_model=List[WeeklyTaskSchema])
def toggle_task(task_id: str):
    global _LOCAL_WEEKLY_PLAN
    for item in _LOCAL_WEEKLY_PLAN:
        if item["id"] == task_id:
            item["completed"] = not item["completed"]
            break
    return _LOCAL_WEEKLY_PLAN
