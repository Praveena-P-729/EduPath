from pydantic import BaseModel
from typing import List, Optional

class SkillItem(BaseModel):
    name: str
    category: str
    level: str # Strong, Developing, Missing
    score: int
    status: str

class SkillGapItem(BaseModel):
    name: str
    priority: str
    reason: str

class SkillAnalysisResponse(BaseModel):
    targetRole: str
    overallReadiness: int
    skillsBreakdown: List[SkillItem]
    topSkillGaps: List[SkillGapItem]

class ResumeAnalysisResponse(BaseModel):
    candidateName: str
    education: str
    experience: str
    detectedSkills: List[str]
    projects: List[str]
    certifications: List[str]
    matchScore: int
