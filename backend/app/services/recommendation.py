from typing import List, Dict, Any
from sqlalchemy.orm import Session
from app.models.resource import Resource

def get_recommended_resources(skill_name: str = None, db: Session = None) -> List[Dict[str, Any]]:
    if db:
        query = db.query(Resource)
        if skill_name:
            query = query.filter(Resource.skill_name.ilike(f"%{skill_name}%"))
        results = query.all()
        if results:
            return [
                {
                    "id": str(r.id),
                    "title": r.title,
                    "type": r.resource_type,
                    "duration": r.duration,
                    "skill": r.skill_name,
                    "level": r.difficulty,
                    "url": r.url,
                    "rating": r.rating
                } for r in results
            ]

    # Fallback resources
    return [
        {
            "id": "r1",
            "title": "Full-Stack React & FastAPI Complete Guide",
            "type": "Course",
            "duration": "6 hours",
            "skill": "React & FastAPI",
            "level": "Intermediate",
            "url": "https://fastapi.tiangolo.com",
            "rating": 4.9
        },
        {
            "id": "r2",
            "title": "PostgreSQL Mastery: Relational Design & Indexing",
            "type": "Interactive Lab",
            "duration": "4 hours",
            "skill": "PostgreSQL",
            "level": "Intermediate",
            "url": "https://www.postgresql.org/docs/",
            "rating": 4.8
        },
        {
            "id": "r3",
            "title": "Docker for Developers: Zero to Containerized Deploy",
            "type": "Video Tutorial",
            "duration": "3.5 hours",
            "skill": "Docker",
            "level": "Beginner to Intermediate",
            "url": "https://docs.docker.com",
            "rating": 4.9
        },
        {
            "id": "r4",
            "title": "System Design for Full-Stack Engineers",
            "type": "Interactive Guide",
            "duration": "5 hours",
            "skill": "System Design",
            "level": "Advanced",
            "url": "https://github.com/donnemartin/system-design-primer",
            "rating": 5.0
        }
    ]
