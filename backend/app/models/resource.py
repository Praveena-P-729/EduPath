from sqlalchemy import Column, Integer, String, Text, Float
from app.database.database import Base

class Resource(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True)
    skill_name = Column(String, index=True, nullable=False)
    title = Column(String, nullable=False)
    resource_type = Column(String, default="Course")
    duration = Column(String, default="4 Hours")
    difficulty = Column(String, default="Intermediate")
    url = Column(String, nullable=False)
    rating = Column(Float, default=4.8)
    author_or_source = Column(String, default="EduPath Curated")
