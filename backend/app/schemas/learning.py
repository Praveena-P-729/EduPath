from pydantic import BaseModel
from typing import List, Optional

class LearningModuleSchema(BaseModel):
    id: str
    title: str
    description: str
    difficulty: str
    duration: str
    progress: int
    status: str
    skills: List[str]

class WeeklyTaskSchema(BaseModel):
    id: str
    day: str
    task: str
    topic: str
    duration: str
    completed: bool
    skill: str

class ResourceSchema(BaseModel):
    id: str
    title: str
    type: str
    duration: str
    skill: str
    level: str
    url: str
    rating: float
