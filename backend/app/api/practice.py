from fastapi import APIRouter, Query
from typing import List, Optional
from app.schemas.progress import QuestionSchema
from app.services.practice_generator import get_questions_by_category

router = APIRouter(prefix="/api/practice", tags=["Practice"])

@router.get("/questions", response_model=List[QuestionSchema])
def get_practice_questions(category: Optional[str] = Query("All")):
    return get_questions_by_category(category)
