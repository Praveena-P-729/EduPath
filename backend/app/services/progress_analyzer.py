from typing import Dict, Any

def get_progress_analytics(user_id: int = None) -> Dict[str, Any]:
    return {
        "overallProgress": 68,
        "learningHours": 24,
        "tasksCompleted": 37,
        "practiceScore": 82,
        "currentStreak": 6,
        "skillProgressHistory": [
            {"week": "Week 1", "frontend": 40, "backend": 15, "database": 10, "devops": 5},
            {"week": "Week 2", "frontend": 55, "backend": 25, "database": 15, "devops": 10},
            {"week": "Week 3", "frontend": 70, "backend": 38, "database": 25, "devops": 12},
            {"week": "Week 4", "frontend": 82, "backend": 48, "database": 35, "devops": 18},
            {"week": "Week 5", "frontend": 88, "backend": 58, "database": 42, "devops": 20},
            {"week": "Week 6", "frontend": 92, "backend": 65, "database": 50, "devops": 25}
        ],
        "learningHoursPerDay": [
            {"day": "Mon", "hours": 2.5},
            {"day": "Tue", "hours": 3.0},
            {"day": "Wed", "hours": 4.0},
            {"day": "Thu", "hours": 2.0},
            {"day": "Fri", "hours": 3.5},
            {"day": "Sat", "hours": 5.0},
            {"day": "Sun", "hours": 4.0}
        ],
        "weeklyCompletionRate": [
            {"name": "Week 1", "rate": 75},
            {"name": "Week 2", "rate": 85},
            {"name": "Week 3", "rate": 90},
            {"name": "Week 4", "rate": 65},
            {"name": "Week 5", "rate": 95},
            {"name": "Current Week", "rate": 64}
        ],
        "skillDistribution": [
            {"name": "Frontend", "value": 38, "color": "#6366f1"},
            {"name": "Backend", "value": 28, "color": "#8b5cf6"},
            {"name": "Database", "value": 18, "color": "#06b6d4"},
            {"name": "DevOps & Tools", "value": 16, "color": "#10b981"}
        ]
    }

def get_career_audit_report(candidate_name: str = "Praveena", target_role: str = "Full-Stack Developer") -> Dict[str, Any]:
    return {
        "candidateName": candidate_name,
        "targetRole": target_role,
        "generatedAt": "September 2026",
        "careerReadinessScore": 72,
        "readinessBenchmark": "Upper 15% of Entry-Level Candidates",
        "skillsAcquired": ["React", "JavaScript", "HTML5", "CSS3", "Git", "REST API Design", "FastAPI Basics", "SQL Basics"],
        "skillsInProgress": ["Advanced FastAPI", "PostgreSQL Optimization", "Docker Containerization", "React Query"],
        "remainingGaps": ["Production CI/CD Pipelines", "System Design & Microservices", "Integration Testing Suites"],
        "achievements": [
            {"title": "7-Day Learning Streak", "description": "Consistently logged 2+ hours every day this week", "date": "Earned 2 days ago"},
            {"title": "React Master", "description": "Completed 100% of React fundamentals & advanced hooks", "date": "Earned 1 week ago"},
            {"title": "Quiz Ace", "description": "Scored 90%+ in 5 consecutive REST API assessments", "date": "Earned 2 weeks ago"}
        ],
        "recommendedNextSteps": [
            "Focus 6 hours this week on PostgreSQL indexing and connection pooling",
            "Complete the Docker multi-container compose practical lab",
            "Build a full-stack CRUD capstone integrating JWT authentication",
            "Schedule a mock interview on System Design fundamentals"
        ]
    }
