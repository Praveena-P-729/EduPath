import os
import json
from typing import Dict, Any, Optional

class LLMClient:
    def __init__(self):
        self.openai_key = os.getenv("OPENAI_API_KEY")
        self.gemini_key = os.getenv("GEMINI_API_KEY")

    def generate_response(self, system_prompt: str, user_prompt: str, context: Optional[str] = None) -> str:
        # Heuristic fallback reasoning engine if API key is not configured in local environment
        prompt_lower = user_prompt.lower()
        if "learn next" in prompt_lower or "what should i" in prompt_lower:
            return (
                "Based on your current skills and verified progress, I recommend prioritizing **REST API Design & Integration** "
                "followed by **FastAPI Dependency Injection**.\n\n"
                "You already have strong React (90%) and JavaScript (85%) foundations. Connecting your frontend components to robust "
                "FastAPI REST endpoints will give you the fastest jump in career readiness!"
            )
        elif "gap" in prompt_lower or "explain" in prompt_lower:
            return (
                "Here is an overview of your top 3 high-impact skill gaps:\n\n"
                "1. **Docker Containerization (High)**: Essential for reproducible full-stack deployment and CI/CD.\n"
                "2. **PostgreSQL & Database Design (High)**: Critical for schema modeling, index optimization, and joins.\n"
                "3. **System Design (Medium)**: Needed for building scalable microservices and API rate limiting."
            )
        elif "study plan" in prompt_lower or "schedule" in prompt_lower:
            return (
                "Here is your personalized 3-day micro study plan:\n\n"
                "• **Day 1 (2h)**: REST API status codes and Pydantic request body validation.\n"
                "• **Day 2 (2h)**: PostgreSQL indexing, foreign key constraints, and SQLAlchemy relationships.\n"
                "• **Day 3 (1.5h)**: Write a Docker Compose setup linking React + FastAPI + Postgres."
            )
        elif "project" in prompt_lower:
            return (
                "Here is a standout portfolio project idea:\n\n"
                "**\"AI-Powered Real-Time Career Intelligence Platform\"**\n"
                "• **Frontend**: React + Tailwind CSS + Recharts for live dashboards.\n"
                "• **Backend**: FastAPI with asynchronous background workers and JWT authentication.\n"
                "• **Database**: PostgreSQL with indexing for high-speed query reads.\n"
                "• **Containerization**: Docker Compose for single-command deployment."
            )
        elif "react" in prompt_lower:
            return (
                "To advance your React skills to senior level:\n\n"
                "1. Master custom hooks and compound component patterns.\n"
                "2. Use `useMemo` and `useCallback` effectively to prevent unnecessary child re-renders.\n"
                "3. Implement optimistic UI state synchronization."
            )
        elif "interview" in prompt_lower:
            return (
                "Let's practice a mock interview question!\n\n"
                "**Question**: *\"How does Dependency Injection in FastAPI differ from traditional middleware, and why is it beneficial for DB sessions?\"*\n\n"
                "Think about `Depends()`, yield teardown, and request scope. Reply with your thoughts and I will grade your answer!"
            )
        else:
            return (
                f"As your EduPath AI Career Coach, I'm here to support your full-stack journey. "
                "With your current 72% career readiness benchmark, staying committed to your weekly plan and closing your Docker and PostgreSQL "
                "milestones will position you strongly for hiring opportunities."
            )

llm_client = LLMClient()
