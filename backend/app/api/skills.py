from fastapi import APIRouter
from pydantic import BaseModel

from app.services.skill_gap import analyze_skill_gap


router = APIRouter(
    prefix="/skills",
    tags=["Skills"]
)


class SkillGapRequest(BaseModel):
    current_skills: list[str]
    target_role: str


@router.post("/gap-analysis")
def skill_gap_analysis(request: SkillGapRequest):

    result = analyze_skill_gap(
        request.current_skills,
        request.target_role
    )

    return result