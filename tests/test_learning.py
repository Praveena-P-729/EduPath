import pytest
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_roadmap():
    response = client.get("/api/learning/roadmap")
    assert response.status_code == 200
    roadmap = response.json()
    assert isinstance(roadmap, list)
    assert len(roadmap) >= 5

def test_get_weekly_plan():
    response = client.get("/api/learning/weekly-plan")
    assert response.status_code == 200
    tasks = response.json()
    assert isinstance(tasks, list)
    assert len(tasks) == 7

def test_toggle_task():
    response = client.post("/api/learning/tasks/w4/toggle")
    assert response.status_code == 200
    tasks = response.json()
    assert isinstance(tasks, list)

def test_get_resources():
    response = client.get("/api/resources")
    assert response.status_code == 200
    resources = response.json()
    assert isinstance(resources, list)
    assert len(resources) > 0
