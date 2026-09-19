from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List, Optional
from app.schemas.learning import LearningModuleSchema, WeeklyTaskSchema
from app.services.learning_agent import generate_personalized_roadmap, generate_weekly_plan
from app.utils.security import get_current_user_optional

router = APIRouter(prefix="/api/learning", tags=["Learning"])

# In-memory storage for weekly plan tasks during local execution
_LOCAL_WEEKLY_PLAN = generate_weekly_plan()

@router.get("/roadmap", response_model=List[LearningModuleSchema])
def get_roadmap(role: Optional[str] = Query("Full-Stack Developer")):
    return generate_personalized_roadmap(target_role=role)

@router.get("/weekly-plan", response_model=List[WeeklyTaskSchema])
def get_weekly_plan():
    global _LOCAL_WEEKLY_PLAN
    return _LOCAL_WEEKLY_PLAN

@router.post("/tasks/{task_id}/toggle", response_model=List[WeeklyTaskSchema])
def toggle_task(task_id: str):
    global _LOCAL_WEEKLY_PLAN
    for item in _LOCAL_WEEKLY_PLAN:
        if item["id"] == task_id:
            item["completed"] = not item["completed"]
            break
    return _LOCAL_WEEKLY_PLAN
