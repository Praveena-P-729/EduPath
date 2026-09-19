from sqlalchemy import Column, Integer, String, Text, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.database.database import Base

class LearningModule(Base):
    __tablename__ = "learning_modules"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    module_key = Column(String, nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text)
    difficulty = Column(String, default="Intermediate")
    duration = Column(String, default="10 Hours")
    progress = Column(Integer, default=0)
    status = Column(String, default="In Progress") # Completed, In Progress, Recommended, Locked
    skills = Column(String)

class WeeklyTask(Base):
    __tablename__ = "weekly_tasks"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    day = Column(String, nullable=False) # Monday, Tuesday...
    task = Column(String, nullable=False)
    topic = Column(String)
    duration = Column(String, default="1.5 hours")
    skill = Column(String, default="General")
    completed = Column(Boolean, default=False)
