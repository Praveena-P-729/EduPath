import pytest
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_progress_metrics():
    response = client.get("/api/progress/metrics")
    assert response.status_code == 200
    data = response.json()
    assert "overallProgress" in data
    assert "skillProgressHistory" in data
    assert "learningHoursPerDay" in data

def test_get_career_report():
    response = client.get("/api/reports/career?candidate=Praveena&role=Full-Stack%20Developer")
    assert response.status_code == 200
    data = response.json()
    assert data["candidateName"] == "Praveena"
    assert data["targetRole"] == "Full-Stack Developer"
    assert "skillsAcquired" in data
    assert "achievements" in data

def test_get_practice_questions():
    response = client.get("/api/practice/questions?category=All")
    assert response.status_code == 200
    questions = response.json()
    assert isinstance(questions, list)
    assert len(questions) > 0

def test_send_chat_message():
    response = client.post("/api/chat/message", json={"message": "What should I learn next?"})
    assert response.status_code == 200
    data = response.json()
    assert "reply" in data
    assert len(data["reply"]) > 0
