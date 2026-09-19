from typing import List, Dict, Any

QUESTIONS = [
    # --- MCQ Questions ---
    {
        "id": 1,
        "category": "MCQ",
        "skill": "React",
        "question": "What is the primary difference between useEffect and useLayoutEffect in React?",
        "options": [
            "useLayoutEffect runs asynchronously after paint, while useEffect runs synchronously before paint.",
            "useLayoutEffect runs synchronously after DOM mutations but before the browser paints, while useEffect runs asynchronously after paint.",
            "useLayoutEffect is only available in Class Components, while useEffect is for functional components.",
            "There is no functional difference; useLayoutEffect is an alias for useEffect."
        ],
        "correctAnswer": 1,
        "explanation": "useLayoutEffect fires synchronously after all DOM mutations. Use it to read layout from the DOM and synchronously re-render before paint to avoid visual flickering."
    },
    {
        "id": 2,
        "category": "MCQ",
        "skill": "REST APIs",
        "question": "Which HTTP status code should be returned when a POST request successfully creates a new database resource?",
        "options": [
            "200 OK",
            "201 Created",
            "204 No Content",
            "202 Accepted"
        ],
        "correctAnswer": 1,
        "explanation": "HTTP 201 Created is the standard HTTP status code indicating that the request has succeeded and led to the creation of a new resource."
    },
    {
        "id": 3,
        "category": "MCQ",
        "skill": "FastAPI",
        "question": "In FastAPI, which library is utilized under the hood for data validation and schema declaration?",
        "options": [
            "Marshmallow",
            "Cerberus",
            "Pydantic",
            "Django ORM"
        ],
        "correctAnswer": 2,
        "explanation": "FastAPI leverages Pydantic for data parsing, type hints validation, serialization, and automatic OpenAPI documentation generation."
    },
    {
        "id": 4,
        "category": "MCQ",
        "skill": "Database",
        "question": "What type of index is most effective in PostgreSQL for high-speed equality and range queries on numeric columns?",
        "options": [
            "Hash Index",
            "B-Tree Index",
            "GIN Index",
            "BRIN Index"
        ],
        "correctAnswer": 1,
        "explanation": "B-Tree is the default and most versatile index type in PostgreSQL, perfectly optimized for comparisons involving <, <=, =, >=, and >."
    },
    {
        "id": 5,
        "category": "MCQ",
        "skill": "Docker",
        "question": "What is the purpose of multi-stage builds in a Dockerfile?",
        "options": [
            "To run multiple containers simultaneously within a single Docker daemon.",
            "To minimize final image size by separating the build environment from the lean runtime environment.",
            "To allow multiple operating systems to be emulated in one image.",
            "To automatically scale CPU and RAM usage."
        ],
        "correctAnswer": 1,
        "explanation": "Multi-stage builds allow you to use intermediate images with compilers/build tools, copying only the final compiled artifacts into a lightweight production runtime image."
    },

    # --- Coding Questions ---
    {
        "id": 6,
        "category": "Coding",
        "skill": "JavaScript",
        "question": "Which implementation correctly creates a custom debounce function in JavaScript?",
        "options": [
            "function debounce(fn, delay) { return function(...args) { setTimeout(() => fn(...args), delay); }; }",
            "function debounce(fn, delay) { let timer; return function(...args) { clearTimeout(timer); timer = setTimeout(() => fn.apply(this, args), delay); }; }",
            "function debounce(fn, delay) { let active = false; return function(...args) { if(!active) { fn(...args); active = true; } }; }",
            "function debounce(fn, delay) { return setInterval(fn, delay); }"
        ],
        "correctAnswer": 1,
        "explanation": "Debouncing postpones execution until a specified delay has elapsed since the last invocation. Storing the timer reference in a closure and clearing it on subsequent calls is the correct pattern."
    },
    {
        "id": 7,
        "category": "Coding",
        "skill": "Python",
        "question": "In Python / FastAPI, how do you correctly define an asynchronous dependency for a database session yield?",
        "options": [
            "def get_db(): db = SessionLocal(); yield db; db.close()",
            "async def get_db(): async with AsyncSessionLocal() as session: yield session",
            "async def get_db(): return await SessionLocal()",
            "def get_db(): return Depends(SessionLocal)"
        ],
        "correctAnswer": 1,
        "explanation": "Using an asynchronous context manager with 'async with AsyncSessionLocal() as session: yield session' ensures proper async connection teardown and cleanup upon request termination."
    },

    # --- Debugging Scenarios ---
    {
        "id": 8,
        "category": "Debugging",
        "skill": "React",
        "question": "Scenario: A React component is causing an infinite re-render loop with 'useEffect(() => { fetchUser(id).then(setUser); }, [user])'. What is the bug?",
        "options": [
            "fetchUser should use async/await inside useEffect without a Promise.",
            "The dependency array includes 'user', which changes on every setUser call, triggering the effect repeatedly.",
            "useEffect should be replaced with useState.",
            "The component must return a cleanup function to prevent memory leaks."
        ],
        "correctAnswer": 1,
        "explanation": "Placing 'user' in the dependency array causes the effect to re-run whenever 'user' updates. Since the effect calls setUser, it triggers an infinite loop. The dependency should be '[id]' instead."
    },
    {
        "id": 9,
        "category": "Debugging",
        "skill": "SQL",
        "question": "Scenario: A query 'SELECT * FROM users WHERE LOWER(email) = 'test@example.com'' is doing a full table scan despite an index on 'email'. Why?",
        "options": [
            "PostgreSQL does not support VARCHAR indexing.",
            "Wrapping the indexed column in a function 'LOWER()' prevents the standard index from being used unless a functional index 'CREATE INDEX ON users (LOWER(email))' exists.",
            "SELECT * disables all indexing automatically.",
            "The query must use LIKE instead of equality."
        ],
        "correctAnswer": 1,
        "explanation": "Standard B-Tree indexes on column 'email' cannot be used for expressions like LOWER(email). An expression/functional index is required to optimize case-insensitive lookups."
    },

    # --- Interview Questions ---
    {
        "id": 10,
        "category": "Interview Questions",
        "skill": "System Design",
        "question": "When designing a high-throughput URL shortening service (like Bitly), which hashing approach best avoids collisions while generating compact 7-character URLs?",
        "options": [
            "MD5 hash truncated to 7 characters.",
            "Auto-incrementing Distributed Unique ID (e.g., Snowflake ID / DB sequence) encoded with Base62.",
            "SHA-256 hash with random salts.",
            "UUIDv4 string truncated to 7 letters."
        ],
        "correctAnswer": 1,
        "explanation": "Base62 encoding (a-z, A-Z, 0-9) of a 64-bit unique integer ID guarantees collision-free, reversible, URL-friendly strings with up to 62^7 (3.5 trillion) unique combinations."
    },
    {
        "id": 11,
        "category": "Interview Questions",
        "skill": "FastAPI",
        "question": "Why is 'def endpoint()' processed differently from 'async def endpoint()' in FastAPI?",
        "options": [
            "Standard 'def' endpoints run in an external worker threadpool, while 'async def' endpoints run directly on the main event loop.",
            "FastAPI rejects standard 'def' endpoints.",
            "Standard 'def' is faster for asynchronous I/O calls.",
            "Async def creates a new process for each incoming request."
        ],
        "correctAnswer": 0,
        "explanation": "FastAPI runs synchronous 'def' endpoints in an AnyIO threadpool to prevent blocking the async event loop, whereas 'async def' functions run directly on the event loop (which will block if synchronous operations are called)."
    }
]

def get_questions_by_category(category: str = "All") -> List[Dict[str, Any]]:
    if not category or category.lower() == "all":
        return QUESTIONS
    return [
        q for q in QUESTIONS
        if q["category"].lower() == category.lower() or q["skill"].lower() == category.lower()
    ]

