ROLE_SKILLS = {
    "full-stack developer": [
        "html",
        "css",
        "javascript",
        "react",
        "node.js",
        "fastapi",
        "express.js",
        "sql",
        "postgresql",
        "git",
        "rest api",
        "typescript",
        "docker"
    ],
    "full-stack engineer": [
        "html",
        "css",
        "javascript",
        "react",
        "node.js",
        "fastapi",
        "sql",
        "postgresql",
        "git",
        "rest api",
        "typescript",
        "docker"
    ],
    "frontend developer": [
        "html",
        "css",
        "javascript",
        "react",
        "git",
        "rest api",
        "typescript",
        "tailwind css"
    ],
    "frontend engineer": [
        "html",
        "css",
        "javascript",
        "react",
        "git",
        "rest api",
        "typescript",
        "tailwind css"
    ],
    "backend developer": [
        "java",
        "python",
        "node.js",
        "fastapi",
        "sql",
        "postgresql",
        "rest api",
        "git",
        "docker"
    ],
    "backend engineer": [
        "java",
        "python",
        "fastapi",
        "sql",
        "postgresql",
        "rest api",
        "git",
        "docker",
        "system design"
    ],
    "ai / ml engineer": [
        "python",
        "pytorch",
        "tensorflow",
        "scikit-learn",
        "sql",
        "git",
        "docker",
        "fastapi",
        "math & statistics"
    ],
    "data scientist": [
        "python",
        "sql",
        "pandas",
        "numpy",
        "data visualization",
        "scikit-learn",
        "git",
        "statistics"
    ],
    "devops & cloud specialist": [
        "docker",
        "kubernetes",
        "linux",
        "ci/cd",
        "aws",
        "git",
        "bash",
        "python"
    ]
}


def analyze_skill_gap(current_skills: list[str], target_role: str):
    role = target_role.lower().strip()

    if role not in ROLE_SKILLS:
        # Fallback to closest match or default full-stack
        matched_key = next((k for k in ROLE_SKILLS if k in role or role in k), "full-stack developer")
        required_skills = ROLE_SKILLS[matched_key]
    else:
        required_skills = ROLE_SKILLS[role]

    # Convert user's skills to lowercase
    user_skills = []
    for skill in current_skills:
        user_skills.append(skill.lower().strip())

    matched_skills = []
    missing_skills = []

    for skill in required_skills:
        if skill in user_skills or any(u in skill or skill in u for u in user_skills):
            matched_skills.append(skill)
        else:
            missing_skills.append(skill)

    total_skills = len(required_skills)
    matched_count = len(matched_skills)

    if total_skills > 0:
        match_percentage = round(
            (matched_count / total_skills) * 100,
            2
        )
    else:
        match_percentage = 0

    return {
        "target_role": target_role,
        "required_skills": required_skills,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "match_percentage": match_percentage
    }