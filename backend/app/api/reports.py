from fastapi import APIRouter, Query, Path
from typing import Optional, Dict, Any
from app.schemas.progress import CareerReportResponse
from app.services.progress_analyzer import get_career_audit_report

router = APIRouter(tags=["Reports"])


@router.get("/api/reports/career", response_model=CareerReportResponse)
@router.get("/reports/career")
def get_career_report(
    candidate: str = Query("Praveena"),
    role: str = Query("Full-Stack Developer")
):
    return get_career_audit_report(candidate_name=candidate, target_role=role)


@router.get("/reports/{user_id}")
@router.get("/api/reports/{user_id}")
def get_user_career_report(
    user_id: int = Path(...),
    candidate: Optional[str] = Query("Praveena"),
    role: Optional[str] = Query("Full-Stack Developer")
):
    return get_career_audit_report(candidate_name=candidate, target_role=role)

