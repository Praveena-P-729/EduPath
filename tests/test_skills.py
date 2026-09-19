import pytest
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_list_skills():
    response = client.get("/api/skills")
    assert response.status_code == 200
    skills = response.json()
    assert isinstance(skills, list)
    assert len(skills) > 0

def test_skill_gap_analysis():
    response = client.get("/api/skills/analysis?role=Full-Stack%20Developer")
    assert response.status_code == 200
    data = response.json()
    assert data["targetRole"] == "Full-Stack Developer"
    assert "overallReadiness" in data
    assert len(data["skillsBreakdown"]) > 0
    assert len(data["topSkillGaps"]) > 0
