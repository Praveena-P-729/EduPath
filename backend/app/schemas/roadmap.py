from pydantic import BaseModel
from typing import List


class RoadmapItem(BaseModel):
    skill: str
    priority: str
    estimated_days: int
    topics: List[str]


class RoadmapRequest(BaseModel):
    target_role: str
    missing_skills: List[str]


class RoadmapResponse(BaseModel):
    target_role: str
    roadmap: List[RoadmapItem]
