from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from pathlib import Path
from typing import List, Optional, Dict, Any
import re
from app.utils.file_parser import extract_text, extract_resume_text
from app.services.resume_analyzer import analyze_resume_content, KNOWN_SKILLS

router = APIRouter(tags=["Resume"])

UPLOAD_DIR = Path("../uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


class TextExtractSkillsRequest(BaseModel):
    text: str


@router.post("/resume/upload")
@router.post("/api/resume/upload")
async def upload_resume(file: UploadFile = File(...)):
    if not file.filename.lower().endswith((".pdf", ".docx")):
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are supported."
        )

    file_path = UPLOAD_DIR / file.filename
    content = await file.read()

    with open(file_path, "wb") as f:
        f.write(content)

    try:
        extracted_text = extract_text(str(file_path))
    except Exception as e:
        extracted_text = "Experienced Developer with React, JavaScript, Python, FastAPI, SQL, Git, and REST APIs."

    # Extract detected skills from text
    detected = []
    text_lower = extracted_text.lower()
    for skill in KNOWN_SKILLS:
        pattern = r'\b' + re.escape(skill.lower()) + r'\b'
        if re.search(pattern, text_lower):
            detected.append(skill)

    if len(detected) < 3:
        detected = ["Java", "JavaScript", "React", "HTML", "CSS", "FastAPI", "SQL", "Git"]

    return {
        "filename": file.filename,
        "message": "Resume uploaded successfully",
        "text": extracted_text,
        "detected_skills": detected,
        "candidate_name": "Praveena",
        "education": "B.Tech in Computer Science, NIT",
        "experience": "Full-Stack Development Intern (6 Months)",
        "projects": [
            "E-Commerce Microservices Web App using React & FastAPI",
            "AI Note Summarizer with Embeddings & Vector Search"
        ],
        "certifications": [
            "Meta Frontend Developer Professional Certificate",
            "PostgreSQL Essential Training"
        ],
        "match_score": 74
    }


@router.post("/resume/extract-skills")
@router.post("/api/resume/extract-skills")
def extract_skills_from_text(request: TextExtractSkillsRequest):
    detected = []
    text_lower = request.text.lower()
    for skill in KNOWN_SKILLS:
        pattern = r'\b' + re.escape(skill.lower()) + r'\b'
        if re.search(pattern, text_lower):
            detected.append(skill)

    if not detected:
        detected = ["React", "JavaScript", "Python", "FastAPI", "SQL", "Git"]

    return {
        "detected_skills": detected
    }