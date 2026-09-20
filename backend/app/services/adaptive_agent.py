from typing import Dict, Any, List, Optional

def analyze_learning_performance(
    skill_scores: Optional[Dict[str, float]] = None,
    completed_topics: Optional[List[str]] = None,
    failed_topics: Optional[List[str]] = None,
    target_role: str = "Full-Stack Developer",
    current_learning_path: Optional[List[str]] = None
) -> Dict[str, Any]:
    """
    Adaptive Learning Agent:
    Analyzes quiz scores, topic completion, and performance to:
    1. Identify weak skills and deficit topics.
    2. Suggest immediate remediation actions.
    3. Re-sequence learning path by placing review modules before advanced topics.
    """
    # Default scores for demo scenario if not provided
    if not skill_scores:
        skill_scores = {
            "JavaScript": 85.0,
            "React": 42.0,
            "Node.js": 45.0,
            "FastAPI": 65.0,
            "SQL": 78.0
        }

    if current_learning_path is None:
        current_learning_path = ["JavaScript", "React", "TypeScript", "Node.js", "PostgreSQL", "Docker"]

    # 1. Find the weakest skill below 60% threshold
    sorted_skills = sorted(skill_scores.items(), key=lambda x: x[1])
    weakest_skill, lowest_score = sorted_skills[0] if sorted_skills else ("React", 42.0)

    # 2. Derive weak topics based on the weak skill
    weak_topics_map = {
        "React": ["React Hooks (useEffect/useMemo)", "State Management & Context API"],
        "JavaScript": ["Async/Await & Promises", "Closures & Scope"],
        "Node.js": ["Express Middleware Routing", "Asynchronous Event Loop"],
        "FastAPI": ["Dependency Injection with Depends()", "Pydantic Request Validation"],
        "PostgreSQL": ["Relational Indexing (B-Tree/GIN)", "Query Joins & Foreign Keys"],
        "Docker": ["Multi-Stage Dockerfile Builds", "Docker Compose Multi-Container Networking"],
        "TypeScript": ["Generics & Type Narrowing", "TypeScript with React Props"],
        "REST API": ["HTTP Status Codes & Idempotency", "Authentication Headers & JWT"]
    }

    weak_topics = failed_topics if failed_topics else weak_topics_map.get(
        weakest_skill, [f"{weakest_skill} Fundamentals", f"{weakest_skill} Best Practices"]
    )

    # 3. Formulate adaptive plan adjustment
    if weakest_skill == "React":
        next_advanced = "TypeScript"
        plan_adjustment = "Moved React Hooks & State revision ahead of TypeScript."
    elif weakest_skill == "Node.js":
        next_advanced = "Docker"
        plan_adjustment = "Prioritizing Node.js REST APIs before containerization."
    else:
        plan_adjustment = f"Inserted targeted {weakest_skill} revision module before next milestone."

    # 4. Reorder learning path dynamically
    updated_path = [s for s in current_learning_path if s != weakest_skill]
    updated_path.insert(0, f"{weakest_skill} (Revision Focus)")

    return {
        "weak_skill": weakest_skill,
        "score_percentage": lowest_score,
        "weak_topics": weak_topics,
        "next_action": f"Revise {weak_topics[0]}",
        "priority": "high",
        "recommended_action": f"Practice 5 targeted {weakest_skill} questions to boost readiness",
        "plan_adjustment": plan_adjustment,
        "adaptive_message": "Your learning plan has been updated based on your performance.",
        "resequenced_path": updated_path,
        "is_adapted": True
    }


def recalibrate_learning_pace(quiz_score_pct: float, current_pace_hours: int = 15) -> Dict[str, Any]:
    if quiz_score_pct >= 85:
        adjusted_hours = max(10, current_pace_hours - 2)
        recommendation = "You demonstrated rapid mastery! Advanced milestones have been accelerated."
        status = "Strong / Accelerated"
    elif quiz_score_pct >= 60:
        adjusted_hours = current_pace_hours
        recommendation = "Solid progress. Continue following your standard weekly plan."
        status = "On Track"
    else:
        adjusted_hours = min(30, current_pace_hours + 3)
        recommendation = "We recommend an additional 3 hours of focused fundamentals practice before advancing."
        status = "Needs Attention"

    return {
        "adjusted_hours": adjusted_hours,
        "recommendation": recommendation,
        "quiz_score_pct": quiz_score_pct,
        "status": status
    }
