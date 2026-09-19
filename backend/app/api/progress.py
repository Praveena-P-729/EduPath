from fastapi import APIRouter
from app.schemas.progress import ProgressMetricsResponse
from app.services.progress_analyzer import get_progress_analytics

router = APIRouter(prefix="/api/progress", tags=["Progress"])

@router.get("/metrics", response_model=ProgressMetricsResponse)
def get_metrics():
    return get_progress_analytics()
