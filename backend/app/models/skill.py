from sqlalchemy import Column, Integer, String, Text, Float
from app.database.database import Base

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    category = Column(String, nullable=False)
    difficulty = Column(String, default="Intermediate")
    description = Column(Text)
