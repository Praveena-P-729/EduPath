import os
import shutil
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from app.schemas.skill import ResumeAnalysisResponse
from app.services.resume_analyzer import analyze_resume_content
from app.utils.security import get_current_user_optional

router = APIRouter(prefix="/api/resume", tags=["Resume"])

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "..", "uploads")
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/analyze", response_model=ResumeAnalysisResponse)
async def analyze_resume(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")

    file_bytes = await file.read()
    if len(file_bytes) == 0:
        raise HTTPException(status_code=400, detail="Empty file uploaded")

    # Optionally save file to uploads directory
    try:
        save_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(save_path, "wb") as f:
            f.write(file_bytes)
    except Exception:
        pass

    result = analyze_resume_content(file_bytes, file.filename)
    return result
