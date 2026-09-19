from typing import List, Dict, Any

def generate_personalized_roadmap(target_role: str = "Full-Stack Developer") -> List[Dict[str, Any]]:
    role_clean = target_role.lower() if target_role else "full-stack developer"

    if "frontend" in role_clean:
        return [
            {
                "id": "fe1",
                "title": "HTML5 & Modern CSS3 Architecture",
                "description": "Semantic markup, CSS Grid, Flexbox, BEM conventions, and web accessibility standards (a11y).",
                "difficulty": "Beginner",
                "duration": "10 Hours",
                "progress": 100,
                "status": "Completed",
                "skills": ["HTML5", "CSS3", "Grid", "Flexbox"]
            },
            {
                "id": "fe2",
                "title": "Modern JavaScript ES6+ & Asynchronous Engine",
                "description": "Closures, Event Loop, Promises, Async/Await, DOM manipulation, and module bundling.",
                "difficulty": "Intermediate",
                "duration": "15 Hours",
                "progress": 100,
                "status": "Completed",
                "skills": ["JavaScript", "ES6+", "Async/Await", "DOM"]
            },
            {
                "id": "fe3",
                "title": "React 18 Component Architecture & Custom Hooks",
                "description": "State management, Context API, custom hooks, performance profiling, and Tailwind CSS.",
                "difficulty": "Intermediate",
                "duration": "20 Hours",
                "progress": 85,
                "status": "In Progress",
                "skills": ["React", "Hooks", "Context API", "Tailwind CSS"]
            },
            {
                "id": "fe4",
                "title": "TypeScript for Enterprise Frontend",
                "description": "Static typing, generics, interface modeling, utility types, and strict TS React integration.",
                "difficulty": "Intermediate",
                "duration": "14 Hours",
                "progress": 40,
                "status": "In Progress",
                "skills": ["TypeScript", "Generics", "Type Safety"]
            },
            {
                "id": "fe5",
                "title": "Next.js SSR & Server Components",
                "description": "App router, Server Components, dynamic rendering, SEO optimization, and Edge deployment.",
                "difficulty": "Advanced",
                "duration": "18 Hours",
                "progress": 10,
                "status": "Recommended",
                "skills": ["Next.js", "SSR", "SEO", "Vercel"]
            },
            {
                "id": "fe6",
                "title": "Frontend Testing & Web Performance Optimization",
                "description": "Jest, React Testing Library, Cypress E2E, Core Web Vitals, and bundle splitting.",
                "difficulty": "Advanced",
                "duration": "16 Hours",
                "progress": 0,
                "status": "Locked",
                "skills": ["Jest", "Testing Library", "Performance", "CI/CD"]
            }
        ]
    elif "ai" in role_clean or "ml" in role_clean or "data" in role_clean:
        return [
            {
                "id": "ai1",
                "title": "Python for Data Science & Vector Math",
                "description": "NumPy, Pandas, vectorized array computation, data cleaning, and statistical distributions.",
                "difficulty": "Beginner",
                "duration": "12 Hours",
                "progress": 100,
                "status": "Completed",
                "skills": ["Python", "NumPy", "Pandas", "Math"]
            },
            {
                "id": "ai2",
                "title": "Machine Learning Foundations & Scikit-Learn",
                "description": "Supervised/unsupervised learning, regression, classification, clustering, cross-validation.",
                "difficulty": "Intermediate",
                "duration": "18 Hours",
                "progress": 70,
                "status": "In Progress",
                "skills": ["Scikit-Learn", "Regression", "Evaluation Metrics"]
            },
            {
                "id": "ai3",
                "title": "Deep Learning & Neural Architectures with PyTorch",
                "description": "Tensors, autograd, CNNs, RNNs, Transformer self-attention mechanisms with PyTorch.",
                "difficulty": "Advanced",
                "duration": "22 Hours",
                "progress": 30,
                "status": "In Progress",
                "skills": ["PyTorch", "Deep Learning", "Transformers"]
            },
            {
                "id": "ai4",
                "title": "RAG, Embeddings & Vector Search Engineering",
                "description": "Chunking strategies, dense embeddings, Pinecone/Chroma vector DBs, and LangChain/LlamaIndex.",
                "difficulty": "Advanced",
                "duration": "20 Hours",
                "progress": 10,
                "status": "Recommended",
                "skills": ["RAG", "Embeddings", "Vector DB", "LLMs"]
            },
            {
                "id": "ai5",
                "title": "Production AI Model Deployment & FastAPI Serving",
                "description": "Deploying LLMs and ML models with FastAPI, Docker containers, ONNX runtime, and monitoring.",
                "difficulty": "Advanced",
                "duration": "16 Hours",
                "progress": 0,
                "status": "Locked",
                "skills": ["FastAPI", "Docker", "Model Serving", "MLOps"]
            }
        ]
    elif "devops" in role_clean or "cloud" in role_clean:
        return [
            {
                "id": "do1",
                "title": "Linux Systems Administration & Shell Automation",
                "description": "Bash scripting, user permissions, networking (TCP/IP, DNS, SSH), and systemd services.",
                "difficulty": "Beginner",
                "duration": "10 Hours",
                "progress": 100,
                "status": "Completed",
                "skills": ["Linux", "Bash", "Networking", "SSH"]
            },
            {
                "id": "do2",
                "title": "Docker Containerization & Image Optimization",
                "description": "Dockerfiles, multi-stage builds, container networking, volumes, and Docker Compose.",
                "difficulty": "Intermediate",
                "duration": "14 Hours",
                "progress": 65,
                "status": "In Progress",
                "skills": ["Docker", "Docker Compose", "Multi-stage Builds"]
            },
            {
                "id": "do3",
                "title": "CI/CD Pipelines & GitHub Actions Automation",
                "description": "Workflow triggers, automated testing, semantic versioning, secret management, Docker push.",
                "difficulty": "Intermediate",
                "duration": "15 Hours",
                "progress": 35,
                "status": "In Progress",
                "skills": ["GitHub Actions", "CI/CD", "Automated Testing"]
            },
            {
                "id": "do4",
                "title": "Kubernetes Orchestration & Cluster Management",
                "description": "Pods, Deployments, Services, Ingress, ConfigMaps, Helm charts, and auto-scaling.",
                "difficulty": "Advanced",
                "duration": "20 Hours",
                "progress": 10,
                "status": "Recommended",
                "skills": ["Kubernetes", "Helm", "Ingress", "K8s"]
            },
            {
                "id": "do5",
                "title": "AWS Cloud Infrastructure as Code (Terraform)",
                "description": "EC2, ECS, VPC, S3, IAM policies, Terraform provisioning, and cloud security monitoring.",
                "difficulty": "Advanced",
                "duration": "24 Hours",
                "progress": 0,
                "status": "Locked",
                "skills": ["AWS", "Terraform", "IaC", "Cloud Security"]
            }
        ]

    # Default Full-Stack Developer Roadmap
    return [
        {
            "id": "m1",
            "title": "HTML & CSS Foundations",
            "description": "Semantic HTML5, CSS Grid, Flexbox, responsive design and accessibility standards.",
            "difficulty": "Beginner",
            "duration": "10 Hours",
            "progress": 100,
            "status": "Completed",
            "skills": ["HTML5", "CSS3", "Flexbox", "Responsive UI"]
        },
        {
            "id": "m2",
            "title": "JavaScript Deep Dive",
            "description": "ES6+ syntax, asynchronous programming, Promises, Event Loop, DOM manipulation.",
            "difficulty": "Intermediate",
            "duration": "15 Hours",
            "progress": 100,
            "status": "Completed",
            "skills": ["JavaScript ES6+", "Async/Await", "Closures", "Fetch API"]
        },
        {
            "id": "m3",
            "title": "Modern React & State Management",
            "description": "Component lifecycles, custom hooks, Context API, Tailwind integration, client routing.",
            "difficulty": "Intermediate",
            "duration": "20 Hours",
            "progress": 80,
            "status": "In Progress",
            "skills": ["React", "Hooks", "Context API", "Vite", "Tailwind"]
        },
        {
            "id": "m4",
            "title": "RESTful API Engineering",
            "description": "API design patterns, status codes, OpenAPI/Swagger, request validation, headers.",
            "difficulty": "Intermediate",
            "duration": "12 Hours",
            "progress": 65,
            "status": "In Progress",
            "skills": ["REST APIs", "CRUD Design", "HTTP Protocol", "Postman"]
        },
        {
            "id": "m5",
            "title": "Backend Development with FastAPI & Python",
            "description": "FastAPI routing, dependency injection, Pydantic data validation, async handlers.",
            "difficulty": "Intermediate",
            "duration": "18 Hours",
            "progress": 45,
            "status": "In Progress",
            "skills": ["FastAPI", "Python", "Pydantic", "Uvicorn"]
        },
        {
            "id": "m6",
            "title": "PostgreSQL & Database Design",
            "description": "Relational schema modeling, indexing, joins, migrations with Alembic, SQLAlchemy ORM.",
            "difficulty": "Intermediate",
            "duration": "16 Hours",
            "progress": 20,
            "status": "Recommended",
            "skills": ["PostgreSQL", "SQLAlchemy", "Alembic", "Database Optimization"]
        },
        {
            "id": "m7",
            "title": "Authentication & Security",
            "description": "JWT tokens, OAuth2 flows, password hashing with bcrypt, CORS and CSRF mitigation.",
            "difficulty": "Advanced",
            "duration": "12 Hours",
            "progress": 0,
            "status": "Recommended",
            "skills": ["JWT", "OAuth2", "Bcrypt", "Web Security"]
        },
        {
            "id": "m8",
            "title": "Containerization & Docker Deployment",
            "description": "Dockerfiles, multi-stage builds, Docker Compose, environment configuration, cloud deploy.",
            "difficulty": "Advanced",
            "duration": "14 Hours",
            "progress": 0,
            "status": "Locked",
            "skills": ["Docker", "Docker Compose", "CI/CD Pipelines", "Cloud Hosting"]
        },
        {
            "id": "m9",
            "title": "Capstone Full-Stack AI Product",
            "description": "End-to-end full-stack SaaS application with AI integration, testing, and production deployment.",
            "difficulty": "Advanced",
            "duration": "30 Hours",
            "progress": 0,
            "status": "Locked",
            "skills": ["Full-Stack Architecture", "System Design", "Testing", "Production Readiness"]
        }
    ]


def generate_weekly_plan() -> List[Dict[str, Any]]:
    return [
        {
            "id": "w1",
            "day": "Monday",
            "task": "React Hooks & State Optimization",
            "topic": "Master useMemo, useCallback, and custom hooks patterns",
            "duration": "1.5 hours",
            "completed": True,
            "skill": "React"
        },
        {
            "id": "w2",
            "day": "Tuesday",
            "task": "REST API Design & Integration",
            "topic": "Build robust Axios client interceptors and error handlers",
            "duration": "2 hours",
            "completed": True,
            "skill": "REST APIs"
        },
        {
            "id": "w3",
            "day": "Wednesday",
            "task": "FastAPI Router & Dependency Injection",
            "topic": "Implement structured APIRouter modules and JWT auth dependencies",
            "duration": "1.5 hours",
            "completed": True,
            "skill": "FastAPI"
        },
        {
            "id": "w4",
            "day": "Thursday",
            "task": "PostgreSQL Schema & SQLAlchemy ORM",
            "topic": "Write relational models, foreign key relationships, and query joins",
            "duration": "2 hours",
            "completed": False,
            "skill": "PostgreSQL"
        },
        {
            "id": "w5",
            "day": "Friday",
            "task": "Practice & Debugging Challenges",
            "topic": "Solve 5 MCQ and 2 coding debugging scenarios on EduPath Practice Hub",
            "duration": "1 hour",
            "completed": False,
            "skill": "Practice"
        },
        {
            "id": "w6",
            "day": "Saturday",
            "task": "Mini Full-Stack Project Build",
            "topic": "Connect React dashboard with live FastAPI database endpoints",
            "duration": "3 hours",
            "completed": False,
            "skill": "Full-Stack"
        },
        {
            "id": "w7",
            "day": "Sunday",
            "task": "Weekly Review & Knowledge Assessment",
            "topic": "Take weekly adaptive assessment and review AI skill gap feedback",
            "duration": "1 hour",
            "completed": False,
            "skill": "Review"
        }
    ]
