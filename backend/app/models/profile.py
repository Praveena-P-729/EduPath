from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.database.database import Base

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    college = Column(String, default="National Institute of Technology")
    degree = Column(String, default="B.Tech in Computer Science")
    experience = Column(String, default="Fresher / Entry-Level (0-1 yrs)")
    current_role = Column(String, default="Student / Aspiring Developer")
    target_role = Column(String, default="Full-Stack Developer")
    career_goal = Column(Text, default="Master full-stack and build scalable AI products")
    weekly_hours = Column(Integer, default=15)
    skills = Column(Text, default="Java,JavaScript,React,HTML,CSS,Git,FastAPI,SQL")
    career_readiness = Column(Integer, default=72)
    streak = Column(Integer, default=6)

    user = relationship("User", backref="profile")
