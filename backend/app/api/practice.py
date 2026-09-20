from fastapi import APIRouter, Query, Body
from pydantic import BaseModel
from typing import List, Optional, Any, Dict
from app.services.practice_generator import (
    generate_practice_quiz,
    evaluate_quiz_submission,
    get_questions_by_category
)

router = APIRouter(tags=["Practice"])


class PracticeGenerateRequest(BaseModel):
    skill: str = "React"
    level: str = "beginner"
    count: Optional[int] = 5


class PracticeAnswerItem(BaseModel):
    question_id: int
    selected_option: int


class PracticeSubmitRequest(BaseModel):
    skill: str
    answers: List[Dict[str, Any]]


# 1. POST /practice/generate
@router.post("/practice/generate")
@router.post("/api/practice/generate")
def generate_quiz(request: PracticeGenerateRequest):
    questions = generate_practice_quiz(
        skill=request.skill,
        level=request.level,
        count=request.count or 5
    )
    return {"skill": request.skill, "questions": questions}


# 2. POST /practice/submit
@router.post("/practice/submit")
@router.post("/api/practice/submit")
def submit_quiz(request: PracticeSubmitRequest):
    result = evaluate_quiz_submission(
        skill=request.skill,
        user_answers=request.answers
    )
    return result


# 3. GET /api/practice/questions (for backward compatibility)
@router.get("/api/practice/questions")
@router.get("/practice/questions")
def get_practice_questions(category: Optional[str] = Query("All")):
    return get_questions_by_category(category)
