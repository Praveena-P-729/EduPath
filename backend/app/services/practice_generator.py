from typing import List, Dict, Any, Optional

ALL_PRACTICE_QUESTIONS: List[Dict[str, Any]] = [
    # --- React ---
    {
        "id": 1,
        "category": "MCQ",
        "skill": "React",
        "level": "beginner",
        "question": "What is the primary difference between useEffect and useLayoutEffect in React?",
        "options": [
            "useLayoutEffect runs asynchronously after paint, while useEffect runs synchronously before paint.",
            "useLayoutEffect runs synchronously after DOM mutations but before the browser paints, while useEffect runs asynchronously after paint.",
            "useLayoutEffect is only available in Class Components, while useEffect is for functional components.",
            "There is no functional difference; useLayoutEffect is an alias for useEffect."
        ],
        "correct_answer": 1,
        "topic": "React Hooks",
        "explanation": "useLayoutEffect fires synchronously after all DOM mutations. Use it to read layout from the DOM and synchronously re-render before paint to avoid visual flickering."
    },
    {
        "id": 2,
        "category": "MCQ",
        "skill": "React",
        "level": "beginner",
        "question": "Which hook should be used to memoize the calculation result between re-renders?",
        "options": [
            "useCallback",
            "useMemo",
            "useRef",
            "useReducer"
        ],
        "correct_answer": 1,
        "topic": "Performance Optimization",
        "explanation": "useMemo caches the result of a calculation between renders unless its dependencies change."
    },
    {
        "id": 3,
        "category": "MCQ",
        "skill": "React",
        "level": "intermediate",
        "question": "How do you pass data deeply throughout a component tree without manually passing props at every level?",
        "options": [
            "Redux only",
            "React Context API",
            "Local Storage",
            "Global window variables"
        ],
        "correct_answer": 1,
        "topic": "State Management",
        "explanation": "React Context provides a way to pass data through the component tree without having to pass props down manually at every level."
    },
    {
        "id": 4,
        "category": "Debugging",
        "skill": "React",
        "level": "intermediate",
        "question": "Scenario: 'useEffect(() => { fetchUser(id).then(setUser); }, [user])' causes an infinite loop. How to fix it?",
        "options": [
            "Replace useEffect with useState",
            "Change dependency array to [id]",
            "Remove the Promise then block",
            "Add user.id to the dependency array"
        ],
        "correct_answer": 1,
        "topic": "React Hooks & Dependencies",
        "explanation": "Changing dependency to [id] prevents re-triggering the effect on every setUser update."
    },
    {
        "id": 5,
        "category": "MCQ",
        "skill": "React",
        "level": "beginner",
        "question": "What is the key rule of React hooks?",
        "options": [
            "Hooks can be called inside loops and nested functions.",
            "Hooks must only be called at the top level of React function components.",
            "Hooks must be called inside class methods.",
            "Hooks must be initialized inside the render method."
        ],
        "correct_answer": 1,
        "topic": "React Rules",
        "explanation": "Only call hooks at the top level. Don’t call Hooks inside loops, conditions, or nested functions."
    },

    # --- REST API ---
    {
        "id": 6,
        "category": "MCQ",
        "skill": "REST API",
        "level": "beginner",
        "question": "Which HTTP status code should be returned when a POST request successfully creates a new database resource?",
        "options": [
            "200 OK",
            "201 Created",
            "204 No Content",
            "202 Accepted"
        ],
        "correct_answer": 1,
        "topic": "HTTP Status Codes",
        "explanation": "HTTP 201 Created indicates that the request succeeded and resulted in the creation of a new resource."
    },
    {
        "id": 7,
        "category": "MCQ",
        "skill": "REST API",
        "level": "beginner",
        "question": "Which HTTP method is designated as idempotent for updating or replacing an existing resource completely?",
        "options": [
            "POST",
            "PUT",
            "PATCH",
            "CONNECT"
        ],
        "correct_answer": 1,
        "topic": "HTTP Methods",
        "explanation": "PUT is idempotent, meaning multiple identical requests have the exact same effect as a single request."
    },
    {
        "id": 8,
        "category": "MCQ",
        "skill": "REST API",
        "level": "intermediate",
        "question": "Where should a client send a JWT Bearer authentication token in an HTTP request?",
        "options": [
            "URL Query Parameter",
            "Authorization Header (Bearer <token>)",
            "HTML Body payload",
            "User-Agent Header"
        ],
        "correct_answer": 1,
        "topic": "API Authentication",
        "explanation": "Standard practice is sending JWTs in the Authorization request header formatted as 'Bearer <token>'."
    },
    {
        "id": 9,
        "category": "MCQ",
        "skill": "REST API",
        "level": "intermediate",
        "question": "What status code should an API return when a client attempts to access a protected route without a valid authentication token?",
        "options": [
            "400 Bad Request",
            "401 Unauthorized",
            "403 Forbidden",
            "404 Not Found"
        ],
        "correct_answer": 1,
        "topic": "API Security",
        "explanation": "401 Unauthorized indicates that the request lacks valid authentication credentials for the target resource."
    },
    {
        "id": 10,
        "category": "MCQ",
        "skill": "REST API",
        "level": "beginner",
        "question": "What format is most commonly used for payload exchange in modern RESTful APIs?",
        "options": [
            "XML",
            "JSON",
            "YAML",
            "Protobuf"
        ],
        "correct_answer": 1,
        "topic": "Data Serialization",
        "explanation": "JSON (JavaScript Object Notation) is the lightweight standard for modern web API communication."
    },

    # --- JavaScript ---
    {
        "id": 11,
        "category": "Coding",
        "skill": "JavaScript",
        "level": "beginner",
        "question": "Which keyword defines a block-scoped variable that cannot be reassigned?",
        "options": [
            "var",
            "const",
            "let",
            "static"
        ],
        "correct_answer": 1,
        "topic": "Variables & Scope",
        "explanation": "const creates block-scoped read-only references to values."
    },
    {
        "id": 12,
        "category": "MCQ",
        "skill": "JavaScript",
        "level": "intermediate",
        "question": "What will 'console.log(typeof NaN)' output in modern JavaScript?",
        "options": [
            "'nan'",
            "'number'",
            "'undefined'",
            "'object'"
        ],
        "correct_answer": 1,
        "topic": "Data Types",
        "explanation": "In JavaScript, NaN (Not-a-Number) is technically a numeric data type value."
    },
    {
        "id": 13,
        "category": "Coding",
        "skill": "JavaScript",
        "level": "intermediate",
        "question": "How do you handle rejected Promises when using async/await syntax?",
        "options": [
            "Using .catch() chain only",
            "Wrapping await calls inside try...catch blocks",
            "Using window.onerror",
            "Promises cannot fail inside async functions"
        ],
        "correct_answer": 1,
        "topic": "Asynchronous JavaScript",
        "explanation": "try...catch blocks are the standard mechanism for capturing rejected Promises in async/await functions."
    },

    # --- Node.js & Express ---
    {
        "id": 14,
        "category": "MCQ",
        "skill": "Node.js",
        "level": "beginner",
        "question": "What is the role of the 'next()' function in Express.js middleware?",
        "options": [
            "To terminate the HTTP request immediately",
            "To pass control to the next middleware function in the stack",
            "To restart the Node.js server",
            "To redirect to a new route URL"
        ],
        "correct_answer": 1,
        "topic": "Middleware Architecture",
        "explanation": "Calling next() passes execution to the next registered middleware in the Express request pipeline."
    },
    {
        "id": 15,
        "category": "MCQ",
        "skill": "Node.js",
        "level": "intermediate",
        "question": "How does Node.js handle high concurrency despite running on a single main thread?",
        "options": [
            "Spawning a new thread per request",
            "Non-blocking I/O event loop and libuv threadpool",
            "Compiling JavaScript into C++ binary",
            "Synchronous socket multiplexing"
        ],
        "correct_answer": 1,
        "topic": "Event Loop & Architecture",
        "explanation": "Node.js uses an event-driven, non-blocking I/O model backed by libuv to handle thousands of concurrent connections efficiently."
    },

    # --- PostgreSQL & SQL ---
    {
        "id": 16,
        "category": "MCQ",
        "skill": "PostgreSQL",
        "level": "intermediate",
        "question": "What type of index is default in PostgreSQL for optimizing range (<, <=, =, >=) queries?",
        "options": [
            "Hash Index",
            "B-Tree Index",
            "GIN Index",
            "BRIN Index"
        ],
        "correct_answer": 1,
        "topic": "Database Indexing",
        "explanation": "B-Tree is the default and most versatile index type in PostgreSQL for equality and range filtering."
    },
    {
        "id": 17,
        "category": "MCQ",
        "skill": "SQL",
        "level": "beginner",
        "question": "Which SQL clause is used to filter aggregated group results produced by GROUP BY?",
        "options": [
            "WHERE",
            "HAVING",
            "ORDER BY",
            "LIMIT"
        ],
        "correct_answer": 1,
        "topic": "SQL Aggregation",
        "explanation": "HAVING filters groups created by GROUP BY, whereas WHERE filters individual rows before grouping."
    },

    # --- Docker ---
    {
        "id": 18,
        "category": "MCQ",
        "skill": "Docker",
        "level": "intermediate",
        "question": "What is the primary benefit of multi-stage Docker builds?",
        "options": [
            "Running multiple containers simultaneously",
            "Separating build dependencies from runtime to reduce final image size",
            "Automating cloud cluster autoscaling",
            "Encrypting environment variables"
        ],
        "correct_answer": 1,
        "topic": "Docker Optimization",
        "explanation": "Multi-stage builds leave compiler tools in intermediate layers, copying only minimal artifacts to the final production image."
    }
]


def generate_practice_quiz(skill: str = "All", level: str = "beginner", count: int = 5) -> List[Dict[str, Any]]:
    """
    Generate questions for a given skill and level.
    Excludes the correct_answer field when delivering to the frontend before submission.
    """
    filtered = []
    skill_clean = skill.strip().lower() if skill else "all"

    if skill_clean != "all":
        filtered = [
            q for q in ALL_PRACTICE_QUESTIONS
            if skill_clean in q["skill"].lower() or q["skill"].lower() in skill_clean
        ]

    # Fallback to general pool if specific skill has few questions
    if len(filtered) < count:
        filtered = ALL_PRACTICE_QUESTIONS

    selected = filtered[:count]

    # Return safe questions without revealing correct_answer
    safe_questions = []
    for q in selected:
        safe_questions.append({
            "id": q["id"],
            "category": q["category"],
            "skill": q["skill"],
            "level": q.get("level", "beginner"),
            "question": q["question"],
            "options": q["options"],
            "topic": q.get("topic", q["skill"]),
            # For backward compatibility with existing components:
            "explanation": q["explanation"],
            "correctAnswer": q["correct_answer"]
        })

    return safe_questions


def evaluate_quiz_submission(skill: str, user_answers: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Evaluate user answers, compute score, identify weak topics and recommend revisions.
    """
    total = len(user_answers)
    if total == 0:
        return {
            "skill": skill,
            "score": 0,
            "total": 0,
            "percentage": 0.0,
            "correct_answers": [],
            "explanations": {},
            "weak_topics": [],
            "recommended_revision_topics": ["Core Fundamentals Review"]
        }

    correct_count = 0
    correct_answers_map = {}
    explanations_map = {}
    failed_topics = []

    # Map question DB by ID
    q_map = {q["id"]: q for q in ALL_PRACTICE_QUESTIONS}

    for item in user_answers:
        q_id = item.get("question_id") or item.get("id")
        user_choice = item.get("selected_option") if "selected_option" in item else item.get("selected")
        
        q_data = q_map.get(q_id)
        if q_data:
            correct_idx = q_data["correct_answer"]
            correct_answers_map[q_id] = correct_idx
            explanations_map[q_id] = q_data["explanation"]

            if user_choice == correct_idx:
                correct_count += 1
            else:
                failed_topics.append(q_data.get("topic", q_data["skill"]))

    percentage = round((correct_count / total) * 100, 2)
    weak_topics = list(set(failed_topics))

    # Recommendations
    if percentage >= 80:
        recommended_revisions = [f"Advanced {skill} Patterns", "Full-Stack Project Application"]
    elif percentage >= 50:
        recommended_revisions = weak_topics if weak_topics else [f"{skill} Intermediate Exercises"]
    else:
        recommended_revisions = weak_topics + [f"{skill} Core Syntax Review"]

    return {
        "skill": skill,
        "score": correct_count,
        "total": total,
        "percentage": percentage,
        "correct_answers": correct_answers_map,
        "explanations": explanations_map,
        "weak_topics": weak_topics,
        "recommended_revision_topics": recommended_revisions
    }


def get_questions_by_category(category: str = "All") -> List[Dict[str, Any]]:
    return generate_practice_quiz(skill=category, count=10)
