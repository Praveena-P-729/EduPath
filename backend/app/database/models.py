import os
import csv
from sqlalchemy.orm import Session
from app.database.database import Base, engine, SessionLocal
from app.models.user import User
from app.models.profile import Profile
from app.models.skill import Skill
from app.models.role import Role
from app.models.resource import Resource
from app.models.learning_plan import LearningModule, WeeklyTask
from app.models.progress import ProgressLog, QuizResult

def init_db():
    Base.metadata.create_all(bind=engine)
    seed_data()

def seed_data():
    db: Session = SessionLocal()
    try:
        # Determine CSV paths
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        data_dir = os.path.join(base_dir, "..", "data")
        if not os.path.exists(data_dir):
            data_dir = os.path.join(base_dir, "data")
        if not os.path.exists(data_dir):
            data_dir = "data"

        # 1. Seed Skills
        skills_csv = os.path.join(data_dir, "skills.csv")
        if os.path.exists(skills_csv) and db.query(Skill).count() == 0:
            with open(skills_csv, mode="r", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                for row in reader:
                    db.add(Skill(
                        name=row["name"].strip(),
                        category=row["category"].strip(),
                        difficulty=row.get("difficulty", "Intermediate").strip(),
                        description=row.get("description", "").strip()
                    ))
            db.commit()

        # 2. Seed Roles
        roles_csv = os.path.join(data_dir, "roles.csv")
        if os.path.exists(roles_csv) and db.query(Role).count() == 0:
            with open(roles_csv, mode="r", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                for row in reader:
                    db.add(Role(
                        role_name=row["role_name"].strip(),
                        description=row.get("description", "").strip(),
                        required_skills=row["required_skills"].strip(),
                        optional_skills=row.get("optional_skills", "").strip(),
                        min_experience_years=int(row.get("min_experience_years", 0))
                    ))
            db.commit()

        # 3. Seed Resources
        resources_csv = os.path.join(data_dir, "resources.csv")
        if os.path.exists(resources_csv) and db.query(Resource).count() == 0:
            with open(resources_csv, mode="r", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                for row in reader:
                    db.add(Resource(
                        skill_name=row["skill_name"].strip(),
                        title=row["title"].strip(),
                        resource_type=row.get("resource_type", "Course").strip(),
                        duration=row.get("duration", "4 Hours").strip(),
                        difficulty=row.get("difficulty", "Intermediate").strip(),
                        url=row["url"].strip(),
                        rating=float(row.get("rating", 4.8)),
                        author_or_source=row.get("author_or_source", "EduPath Curated").strip()
                    ))
            db.commit()

    except Exception as e:
        print(f"Seed error: {e}")
        db.rollback()
    finally:
        db.close()
