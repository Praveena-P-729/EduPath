from typing import Dict, Any, List

def recalibrate_learning_pace(quiz_score_pct: float, current_pace_hours: int) -> Dict[str, Any]:
    if quiz_score_pct >= 85:
        adjusted_hours = max(10, current_pace_hours - 2)
        recommendation = "You demonstrated rapid mastery! We have unlocked advanced modules ahead of schedule."
    elif quiz_score_pct >= 60:
        adjusted_hours = current_pace_hours
        recommendation = "Solid progress. Keep following your standard weekly plan."
    else:
        adjusted_hours = min(30, current_pace_hours + 3)
        recommendation = "We recommend an additional 3 hours of focused fundamentals practice before advancing."

    return {
        "adjusted_hours": adjusted_hours,
        "recommendation": recommendation,
        "quiz_score_pct": quiz_score_pct
    }
