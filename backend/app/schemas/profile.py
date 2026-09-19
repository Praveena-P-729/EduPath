from pydantic import BaseModel
from typing import Optional, List

class ProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[str] = None
    college: Optional[str] = None
    degree: Optional[str] = None
    experience: Optional[str] = None
    current_role: Optional[str] = None
    target_role: Optional[str] = None
    career_goal: Optional[str] = None
    weekly_hours: Optional[int] = 15
    skills: Optional[List[str]] = []

class ProfileResponse(BaseModel):
    id: Optional[int] = None
    full_name: str
    email: str
    college: str
    degree: str
    experience: str
    current_role: str
    target_role: str
    career_goal: str
    weekly_hours: int
    skills: List[str]
    career_readiness: int
    streak: int

    model_config = {"from_attributes": True}
