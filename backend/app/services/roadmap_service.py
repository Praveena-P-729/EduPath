from typing import List, Dict, Any

SKILL_CURRICULUM_DATA: Dict[str, Dict[str, Any]] = {
    "html": {
        "display_name": "HTML5",
        "priority": "High",
        "estimated_days": 3,
        "order_weight": 1,
        "topics": [
            "Semantic Elements & Structure",
            "Forms, Inputs & Validation",
            "Accessibility (a11y) & ARIA",
            "SEO Basics & Meta Tags",
            "Audio, Video & Canvas"
        ]
    },
    "css": {
        "display_name": "CSS3",
        "priority": "High",
        "estimated_days": 4,
        "order_weight": 2,
        "topics": [
            "Box Model & Positioning",
            "Flexbox & CSS Grid Layouts",
            "Responsive Web Design & Media Queries",
            "Transitions, Keyframes & Animations",
            "CSS Custom Properties & BEM Methodology"
        ]
    },
    "javascript": {
        "display_name": "JavaScript (ES6+)",
        "priority": "High",
        "estimated_days": 7,
        "order_weight": 3,
        "topics": [
            "ES6+ Syntax & Scope (let/const, destructuring)",
            "DOM Manipulation & Event Listeners",
            "Asynchronous JavaScript (Promises, Async/Await)",
            "Fetch API & AJAX",
            "Array Methods & Object Manipulation"
        ]
    },
    "typescript": {
        "display_name": "TypeScript",
        "priority": "Medium",
        "estimated_days": 7,
        "order_weight": 5,
        "topics": [
            "Types",
            "Interfaces",
            "Functions",
            "Generics",
            "TypeScript with React"
        ]
    },
    "react": {
        "display_name": "React",
        "priority": "High",
        "estimated_days": 8,
        "order_weight": 4,
        "topics": [
            "Components, JSX & Props",
            "State & Lifecycle (useState, useEffect)",
            "Custom Hooks & Context API",
            "React Router & SPA Navigation",
            "Performance Optimization & Memoization"
        ]
    },
    "tailwind css": {
        "display_name": "Tailwind CSS",
        "priority": "Medium",
        "estimated_days": 3,
        "order_weight": 6,
        "topics": [
            "Utility-First Fundamentals",
            "Responsive Variants & Breakpoints",
            "Custom Themes & Configuration",
            "Dark Mode & Component Extraction",
            "Tailwind Plugins & JIT Engine"
        ]
    },
    "rest api": {
        "display_name": "REST API",
        "priority": "High",
        "estimated_days": 5,
        "order_weight": 7,
        "topics": [
            "HTTP Methods",
            "API Requests",
            "JSON",
            "Status Codes",
            "Authentication"
        ]
    },
    "fastapi": {
        "display_name": "FastAPI",
        "priority": "High",
        "estimated_days": 6,
        "order_weight": 8,
        "topics": [
            "Path & Query Parameters",
            "Pydantic Request/Response Models",
            "Dependency Injection & Auth Middleware",
            "SQLAlchemy ORM Integration",
            "Automated OpenAPI & Swagger Docs"
        ]
    },
    "python": {
        "display_name": "Python",
        "priority": "High",
        "estimated_days": 6,
        "order_weight": 2,
        "topics": [
            "Data Structures & Object-Oriented Programming",
            "Virtual Environments & Package Management",
            "Error Handling & Context Managers",
            "AsyncIO & Concurrency",
            "Unit Testing with PyTest"
        ]
    },
    "node.js": {
        "display_name": "Node.js",
        "priority": "High",
        "estimated_days": 6,
        "order_weight": 7,
        "topics": [
            "Node.js Runtime & Event Loop",
            "Modules, NPM & Package.json",
            "File System & Streams",
            "Building HTTP Servers",
            "Environment Variables & Configuration"
        ]
    },
    "express.js": {
        "display_name": "Express.js",
        "priority": "Medium",
        "estimated_days": 4,
        "order_weight": 8,
        "topics": [
            "Routing & Request Handlers",
            "Middleware Architecture",
            "Error Handling Strategies",
            "JWT Authentication & Route Protection",
            "CORS & Security Best Practices"
        ]
    },
    "sql": {
        "display_name": "SQL",
        "priority": "High",
        "estimated_days": 5,
        "order_weight": 9,
        "topics": [
            "CRUD Operations & Queries",
            "Joins & Aggregate Functions",
            "Table Constraints & Normalization",
            "Transactions (ACID Properties)",
            "Basic Indexing & Query Optimization"
        ]
    },
    "postgresql": {
        "display_name": "PostgreSQL",
        "priority": "High",
        "estimated_days": 6,
        "order_weight": 10,
        "topics": [
            "Relational Schema Design",
            "B-Tree Indexes & Query Plans (EXPLAIN)",
            "Foreign Keys & Cascading Actions",
            "JSONB Columns & Stored Procedures",
            "Connection Pooling & Migrations (Alembic)"
        ]
    },
    "docker": {
        "display_name": "Docker",
        "priority": "High",
        "estimated_days": 6,
        "order_weight": 11,
        "topics": [
            "Containers vs Virtual Machines",
            "Writing Dockerfiles & Multi-Stage Builds",
            "Managing Images, Volumes & Networks",
            "Multi-Container Apps with Docker Compose",
            "Container Security & Production Deployment"
        ]
    },
    "git": {
        "display_name": "Git & GitHub",
        "priority": "Medium",
        "estimated_days": 3,
        "order_weight": 1,
        "topics": [
            "Repositories, Commits & History",
            "Branching, Merging & Merge Conflicts",
            "Pull Requests & Code Reviews",
            "Rebasing & Stashing",
            "GitHub Actions & CI Workflows"
        ]
    },
    "system design": {
        "display_name": "System Design",
        "priority": "High",
        "estimated_days": 10,
        "order_weight": 15,
        "topics": [
            "Client-Server Architecture & DNS",
            "Load Balancing & Horizontal Scaling",
            "Database Sharding & Replication",
            "Caching Strategies (Redis/Memcached)",
            "Microservices vs Monoliths & Message Queues"
        ]
    },
    "pytorch": {
        "display_name": "PyTorch",
        "priority": "High",
        "estimated_days": 9,
        "order_weight": 12,
        "topics": [
            "Tensors & Autograd Engine",
            "Building Neural Networks with nn.Module",
            "Custom Datasets & DataLoaders",
            "Loss Functions & Optimizers",
            "Model Training, Validation & Checkpointing"
        ]
    },
    "tensorflow": {
        "display_name": "TensorFlow",
        "priority": "Medium",
        "estimated_days": 8,
        "order_weight": 13,
        "topics": [
            "Keras Sequential & Functional APIs",
            "Callbacks & TensorBoard Visualization",
            "Convolutional & Recurrent Networks",
            "Transfer Learning & Model Export",
            "TF Lite & Model Serving"
        ]
    },
    "scikit-learn": {
        "display_name": "Scikit-Learn",
        "priority": "High",
        "estimated_days": 5,
        "order_weight": 10,
        "topics": [
            "Supervised Learning (Regression & Classification)",
            "Unsupervised Learning (Clustering & PCA)",
            "Feature Engineering & Pipelines",
            "Cross-Validation & Hyperparameter Tuning",
            "Model Evaluation Metrics (ROC/AUC, F1-Score)"
        ]
    },
    "pandas": {
        "display_name": "Pandas",
        "priority": "High",
        "estimated_days": 4,
        "order_weight": 8,
        "topics": [
            "DataFrames & Series Manipulation",
            "Data Cleaning & Missing Value Imputation",
            "Grouping, Aggregation & Pivoting",
            "Merging, Joining & Concatenation",
            "Time Series Analysis & File I/O"
        ]
    },
    "kubernetes": {
        "display_name": "Kubernetes",
        "priority": "High",
        "estimated_days": 8,
        "order_weight": 14,
        "topics": [
            "Pods, Deployments & ReplicaSets",
            "Services, Ingress & Networking",
            "ConfigMaps & Secrets Management",
            "Persistent Volumes & Claims",
            "Helm Charts & Cluster Monitoring"
        ]
    },
    "aws": {
        "display_name": "AWS Cloud",
        "priority": "Medium",
        "estimated_days": 7,
        "order_weight": 13,
        "topics": [
            "EC2 Virtual Servers & Security Groups",
            "S3 Object Storage & Bucket Policies",
            "RDS Relational Databases & Multi-AZ",
            "AWS Lambda & Serverless Functions",
            "IAM Roles, Policies & Access Keys"
        ]
    }
}


def _match_curriculum_key(skill_name: str) -> str:
    cleaned = skill_name.lower().strip()
    # Check exact match
    if cleaned in SKILL_CURRICULUM_DATA:
        return cleaned
    
    # Check if a known key is in the string or vice versa
    for key in SKILL_CURRICULUM_DATA:
        if key in cleaned or cleaned in key:
            return key
            
    return cleaned


def generate_roadmap(target_role: str, missing_skills: List[str]) -> Dict[str, Any]:
    roadmap_items = []
    seen_skills = set()

    for skill in missing_skills:
        skill_clean = skill.strip()
        if not skill_clean:
            continue

        matched_key = _match_curriculum_key(skill_clean)
        
        # Deduplicate
        if matched_key in seen_skills:
            continue
        seen_skills.add(matched_key)

        if matched_key in SKILL_CURRICULUM_DATA:
            data = SKILL_CURRICULUM_DATA[matched_key]
            roadmap_items.append({
                "skill": data.get("display_name", skill_clean.title()),
                "priority": data.get("priority", "Medium"),
                "estimated_days": data.get("estimated_days", 5),
                "topics": data.get("topics", [
                    f"{skill_clean.title()} Fundamentals",
                    f"Core Concepts & Architecture",
                    f"Hands-on Implementation",
                    f"Best Practices & Optimization",
                    f"Integration & Project Application"
                ]),
                "_order_weight": data.get("order_weight", 10)
            })
        else:
            # Fallback for dynamic/arbitrary custom skills
            roadmap_items.append({
                "skill": skill_clean.title(),
                "priority": "Medium",
                "estimated_days": 5,
                "topics": [
                    f"{skill_clean.title()} Fundamentals",
                    f"Core Concepts & Syntax",
                    f"Practical Problem Solving",
                    f"Debugging & Error Handling",
                    f"Real-World Project Integration"
                ],
                "_order_weight": 10
            })

    # Sort roadmap items in a logical learning sequence
    roadmap_items.sort(key=lambda item: item["_order_weight"])

    # Clean internal sorting key
    for item in roadmap_items:
        item.pop("_order_weight", None)

    return {
        "target_role": target_role,
        "roadmap": roadmap_items
    }
