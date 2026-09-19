from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database.database import get_db
from app.schemas.learning import ResourceSchema
from app.services.recommendation import get_recommended_resources

router = APIRouter(prefix="/api/resources", tags=["Resources"])

@router.get("", response_model=List[ResourceSchema])
def list_resources(skill: Optional[str] = Query(None), db: Session = Depends(get_db)):
    return get_recommended_resources(skill_name=skill, db=db)
