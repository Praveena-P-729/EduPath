from typing import Dict, Any, List
from sqlalchemy.orm import Session
from app.models.role import Role

def calculate_skill_gaps(user_skills: List[str], target_role_name: str = "Full-Stack Developer", db: Session = None) -> Dict[str, Any]:
    # Default skills matrix for all 6 target roles
    role_benchmarks = {
        "Full-Stack Developer": [
            ("React", "Frontend", 90, "Strong"),
            ("JavaScript", "Frontend", 85, "Strong"),
            ("HTML & CSS", "Frontend", 95, "Strong"),
            ("Git & GitHub", "DevOps", 80, "Strong"),
            ("Node.js", "Backend", 60, "Developing"),
            ("REST APIs", "Backend", 65, "Developing"),
            ("FastAPI", "Backend", 55, "Developing"),
            ("PostgreSQL", "Database", 45, "Developing"),
            ("Docker", "DevOps", 20, "Missing"),
            ("Testing (PyTest/Jest)", "Quality", 15, "Missing"),
            ("System Design", "Architecture", 10, "Missing")
        ],
        "Frontend Engineer": [
            ("React", "Frontend", 90, "Strong"),
            ("JavaScript", "Frontend", 85, "Strong"),
            ("HTML & CSS", "Frontend", 95, "Strong"),
            ("Tailwind CSS", "Frontend", 85, "Strong"),
            ("TypeScript", "Frontend", 50, "Developing"),
            ("REST APIs", "Backend", 65, "Developing"),
            ("GraphQL", "Frontend", 30, "Missing"),
            ("Testing (PyTest/Jest)", "Quality", 20, "Missing"),
            ("Next.js", "Frontend", 25, "Missing")
        ],
        "Backend Engineer": [
            ("Python", "Backend", 85, "Strong"),
            ("REST APIs", "Backend", 75, "Strong"),
            ("FastAPI", "Backend", 65, "Developing"),
            ("PostgreSQL", "Database", 50, "Developing"),
            ("Docker", "DevOps", 25, "Missing"),
            ("Redis", "Database", 20, "Missing"),
            ("System Design", "Architecture", 15, "Missing"),
            ("Kubernetes", "DevOps", 10, "Missing")
        ],
        "AI / ML Engineer": [
            ("Python", "Programming", 90, "Strong"),
            ("SQL", "Database", 70, "Developing"),
            ("Machine Learning Basics", "AI/ML", 60, "Developing"),
            ("Deep Learning & PyTorch", "AI/ML", 35, "Missing"),
            ("RAG & LLM Engineering", "AI/ML", 25, "Missing"),
            ("FastAPI", "Backend", 55, "Developing"),
            ("Docker", "DevOps", 20, "Missing"),
            ("Vector Databases (Pinecone/Chroma)", "Database", 15, "Missing")
        ],
        "Data Scientist": [
            ("Python", "Programming", 90, "Strong"),
            ("SQL", "Database", 80, "Strong"),
            ("Machine Learning Basics", "AI/ML", 65, "Developing"),
            ("Statistical Modeling", "Analytics", 45, "Developing"),
            ("PostgreSQL", "Database", 60, "Developing"),
            ("Data Visualization", "Analytics", 50, "Developing"),
            ("Deep Learning & PyTorch", "AI/ML", 25, "Missing"),
            ("AWS Cloud", "DevOps", 20, "Missing")
        ],
        "DevOps & Cloud Specialist": [
            ("Git & GitHub", "DevOps", 85, "Strong"),
            ("Linux", "Systems", 75, "Strong"),
            ("Docker", "Containerization", 60, "Developing"),
            ("Docker Compose", "Containerization", 55, "Developing"),
            ("CI/CD Pipelines", "DevOps", 40, "Developing"),
            ("Kubernetes", "Orchestration", 25, "Missing"),
            ("AWS Cloud", "Cloud", 30, "Missing"),
            ("Infrastructure as Code (Terraform)", "DevOps", 15, "Missing"),
            ("System Design", "Architecture", 20, "Missing")
        ]
    }

    skills_data = role_benchmarks.get(target_role_name, role_benchmarks["Full-Stack Developer"])

    breakdown = []
    total_score = 0
    missing_items = []
    developing_items = []

    for name, cat, score, default_status in skills_data:
        # Check if user has this skill
        is_user_skill = any(s.lower() == name.lower() or name.lower() in s.lower() for s in user_skills)
        if is_user_skill:
            actual_score = max(score, 85)
            status = "Strong"
        else:
            actual_score = score
            status = default_status

        breakdown.append({
            "name": name,
            "category": cat,
            "level": status,
            "score": actual_score,
            "status": status.lower()
        })
        total_score += actual_score

        if status.lower() == "missing":
            missing_items.append(name)
        elif status.lower() == "developing":
            developing_items.append(name)

    overall_readiness = round(total_score / len(breakdown))

    # Dynamic Top Skill Gaps
    gap_reasons = {
        "Docker": ("High", "Critical for reproducible containerized deployment & microservices"),
        "Kubernetes": ("High", "Essential for production container orchestration and auto-scaling"),
        "PostgreSQL": ("High", "Key relational database design, query joins, and indexing"),
        "System Design": ("High", "Needed for scalable architecture and high-availability systems"),
        "Testing (PyTest/Jest)": ("Medium", "Required for automated test coverage and reliability"),
        "RAG & LLM Engineering": ("High", "Core for modern AI agents, embeddings, and vector retrieval"),
        "Deep Learning & PyTorch": ("High", "Foundation for training and fine-tuning neural networks"),
        "TypeScript": ("Medium", "Standard for enterprise frontend type safety and maintainability"),
        "Redis": ("Medium", "High-performance caching and in-memory session management"),
        "AWS Cloud": ("High", "Industry-standard cloud deployment and infrastructure services"),
        "CI/CD Pipelines": ("High", "Automated testing, build pipelines, and continuous deployment")
    }

    top_gaps = []
    # Prioritize missing skills first, then developing
    for s_name in missing_items + developing_items:
        if s_name in gap_reasons:
            prio, reason = gap_reasons[s_name]
            top_gaps.append({"name": s_name, "priority": prio, "reason": reason})
        else:
            top_gaps.append({
                "name": s_name,
                "priority": "High" if s_name in missing_items else "Medium",
                "reason": f"Required competency for industry-standard {target_role_name} roles"
            })
        if len(top_gaps) >= 5:
            break

    return {
        "targetRole": target_role_name,
        "overallReadiness": overall_readiness,
        "skillsBreakdown": breakdown,
        "topSkillGaps": top_gaps
    }

