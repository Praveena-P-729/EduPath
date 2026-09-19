from fastapi import APIRouter, Query
from app.schemas.progress import CareerReportResponse
from app.services.progress_analyzer import get_career_audit_report

router = APIRouter(prefix="/api/reports", tags=["Reports"])

@router.get("/career", response_model=CareerReportResponse)
def get_career_report(
    candidate: str = Query("Praveena"),
    role: str = Query("Full-Stack Developer")
):
    return get_career_audit_report(candidate_name=candidate, target_role=role)
