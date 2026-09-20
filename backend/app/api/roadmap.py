from fastapi import APIRouter
from app.schemas.roadmap import RoadmapRequest, RoadmapResponse
from app.services.roadmap_service import generate_roadmap

router = APIRouter(tags=["Roadmap"])


@router.post("/roadmap", response_model=RoadmapResponse)
def create_learning_roadmap(request: RoadmapRequest):
    """
    Generate a personalized learning roadmap based on missing skills for a target role.
    """
    result = generate_roadmap(
        target_role=request.target_role,
        missing_skills=request.missing_skills
    )
    return result
