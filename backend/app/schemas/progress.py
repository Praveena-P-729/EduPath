from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class SkillProgressHistoryItem(BaseModel):
    week: str
    frontend: int
    backend: int
    database: int
    devops: int

class DailyHourItem(BaseModel):
    day: str
    hours: float

class WeeklyRateItem(BaseModel):
    name: str
    rate: int

class SkillDistItem(BaseModel):
    name: str
    value: int
    color: str

class ProgressMetricsResponse(BaseModel):
    overallProgress: int
    learningHours: int
    tasksCompleted: int
    practiceScore: int
    currentStreak: int
    skillProgressHistory: List[SkillProgressHistoryItem]
    learningHoursPerDay: List[DailyHourItem]
    weeklyCompletionRate: List[WeeklyRateItem]
    skillDistribution: List[SkillDistItem]

class AchievementItem(BaseModel):
    title: str
    description: str
    date: str

class CareerReportResponse(BaseModel):
    candidateName: str
    targetRole: str
    generatedAt: str
    careerReadinessScore: int
    readinessBenchmark: str
    skillsAcquired: List[str]
    skillsInProgress: List[str]
    remainingGaps: List[str]
    achievements: List[AchievementItem]
    recommendedNextSteps: List[str]

class QuestionSchema(BaseModel):
    id: int
    category: str
    skill: str
    question: str
    options: List[str]
    correctAnswer: int
    explanation: str

class ChatMessageRequest(BaseModel):
    message: str

class ChatMessageResponse(BaseModel):
    reply: str
    timestamp: str
