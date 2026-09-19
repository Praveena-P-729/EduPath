from sqlalchemy import Column, Integer, String, Text
from app.database.database import Base

class Role(Base):
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True, index=True)
    role_name = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text)
    required_skills = Column(Text, nullable=False) # Comma separated
    optional_skills = Column(Text)
    min_experience_years = Column(Integer, default=0)
