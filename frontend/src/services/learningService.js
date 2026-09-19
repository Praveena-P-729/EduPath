import api from './api';

const MOCK_ROADMAP = [
  {
    id: 'm1',
    title: 'HTML & CSS Foundations',
    description: 'Semantic HTML5, CSS Grid, Flexbox, responsive design and accessibility standards.',
    difficulty: 'Beginner',
    duration: '10 Hours',
    progress: 100,
    status: 'Completed',
    skills: ['HTML5', 'CSS3', 'Flexbox', 'Responsive UI']
  },
  {
    id: 'm2',
    title: 'JavaScript Deep Dive',
    description: 'ES6+ syntax, asynchronous programming, Promises, Event Loop, DOM manipulation.',
    difficulty: 'Intermediate',
    duration: '15 Hours',
    progress: 100,
    status: 'Completed',
    skills: ['JavaScript ES6+', 'Async/Await', 'Closures', 'Fetch API']
  },
  {
    id: 'm3',
    title: 'Modern React & State Management',
    description: 'Component lifecycles, custom hooks, Context API, Tailwind integration, client routing.',
    difficulty: 'Intermediate',
    duration: '20 Hours',
    progress: 80,
    status: 'In Progress',
    skills: ['React', 'Hooks', 'Context API', 'Vite', 'Tailwind']
  },
  {
    id: 'm4',
    title: 'RESTful API Engineering',
    description: 'API design patterns, status codes, OpenAPI/Swagger, request validation, headers.',
    difficulty: 'Intermediate',
    duration: '12 Hours',
    progress: 65,
    status: 'In Progress',
    skills: ['REST APIs', 'CRUD Design', 'HTTP Protocol', 'Postman']
  },
  {
    id: 'm5',
    title: 'Backend Development with FastAPI & Python',
    description: 'FastAPI routing, dependency injection, Pydantic data validation, async handlers.',
    difficulty: 'Intermediate',
    duration: '18 Hours',
    progress: 45,
    status: 'In Progress',
    skills: ['FastAPI', 'Python', 'Pydantic', 'Uvicorn']
  },
  {
    id: 'm6',
    title: 'PostgreSQL & Database Design',
    description: 'Relational schema modeling, indexing, joins, migrations with Alembic, SQLAlchemy ORM.',
    difficulty: 'Intermediate',
    duration: '16 Hours',
    progress: 20,
    status: 'Recommended',
    skills: ['PostgreSQL', 'SQLAlchemy', 'Alembic', 'Database Optimization']
  },
  {
    id: 'm7',
    title: 'Authentication & Security',
    description: 'JWT tokens, OAuth2 flows, password hashing with bcrypt, CORS and CSRF mitigation.',
    difficulty: 'Advanced',
    duration: '12 Hours',
    progress: 0,
    status: 'Recommended',
    skills: ['JWT', 'OAuth2', 'Bcrypt', 'Web Security']
  },
  {
    id: 'm8',
    title: 'Containerization & Docker Deployment',
    description: 'Dockerfiles, multi-stage builds, Docker Compose, environment configuration, cloud deploy.',
    difficulty: 'Advanced',
    duration: '14 Hours',
    progress: 0,
    status: 'Locked',
    skills: ['Docker', 'Docker Compose', 'CI/CD Pipelines', 'Cloud Hosting']
  },
  {
    id: 'm9',
    title: 'Capstone Full-Stack AI Product',
    description: 'End-to-end full-stack SaaS application with AI integration, testing, and production deployment.',
    difficulty: 'Advanced',
    duration: '30 Hours',
    progress: 0,
    status: 'Locked',
    skills: ['Full-Stack Architecture', 'System Design', 'Testing', 'Production Readiness']
  }
];

const MOCK_WEEKLY_PLAN = [
  {
    id: 'w1',
    day: 'Monday',
    task: 'React Hooks & State Optimization',
    topic: 'Master useMemo, useCallback, and custom hooks patterns',
    duration: '1.5 hours',
    completed: true,
    skill: 'React'
  },
  {
    id: 'w2',
    day: 'Tuesday',
    task: 'REST API Design & Integration',
    topic: 'Build robust Axios client interceptors and error handlers',
    duration: '2 hours',
    completed: true,
    skill: 'REST APIs'
  },
  {
    id: 'w3',
    day: 'Wednesday',
    task: 'FastAPI Router & Dependency Injection',
    topic: 'Implement structured APIRouter modules and JWT auth dependencies',
    duration: '1.5 hours',
    completed: true,
    skill: 'FastAPI'
  },
  {
    id: 'w4',
    day: 'Thursday',
    task: 'PostgreSQL Schema & SQLAlchemy ORM',
    topic: 'Write relational models, foreign key relationships, and query joins',
    duration: '2 hours',
    completed: false,
    skill: 'PostgreSQL'
  },
  {
    id: 'w5',
    day: 'Friday',
    task: 'Practice & Debugging Challenges',
    topic: 'Solve 5 MCQ and 2 coding debugging scenarios on EduPath Practice Hub',
    duration: '1 hour',
    completed: false,
    skill: 'Practice'
  },
  {
    id: 'w6',
    day: 'Saturday',
    task: 'Mini Full-Stack Project Build',
    topic: 'Connect React dashboard with live FastAPI database endpoints',
    duration: '3 hours',
    completed: false,
    skill: 'Full-Stack'
  },
  {
    id: 'w7',
    day: 'Sunday',
    task: 'Weekly Review & Knowledge Assessment',
    topic: 'Take weekly adaptive assessment and review AI skill gap feedback',
    duration: '1 hour',
    completed: false,
    skill: 'Review'
  }
];

export const learningService = {
  async getRoadmap(role = 'Full-Stack Developer') {
    try {
      const response = await api.get(`/api/learning/roadmap?role=${encodeURIComponent(role)}`);
      return response.data;
    } catch (err) {
      return MOCK_ROADMAP;
    }
  },

  async getWeeklyPlan() {
    try {
      const response = await api.get('/api/learning/weekly-plan');
      return response.data;
    } catch (err) {
      const stored = localStorage.getItem('edupath_weekly_plan');
      return stored ? JSON.parse(stored) : MOCK_WEEKLY_PLAN;
    }
  },

  async toggleTaskCompletion(taskId) {
    try {
      const response = await api.post(`/api/learning/tasks/${taskId}/toggle`);
      return response.data;
    } catch (err) {
      const current = await this.getWeeklyPlan();
      const updated = current.map(item => item.id === taskId ? { ...item, completed: !item.completed } : item);
      localStorage.setItem('edupath_weekly_plan', JSON.stringify(updated));
      return updated;
    }
  },

  async getResources() {
    try {
      const response = await api.get('/api/resources');
      return response.data;
    } catch (err) {
      return [
        {
          id: 'r1',
          title: 'Full-Stack React & FastAPI Complete Guide',
          type: 'Course',
          duration: '6 hours',
          skill: 'React & FastAPI',
          level: 'Intermediate',
          url: 'https://fastapi.tiangolo.com',
          rating: 4.9
        },
        {
          id: 'r2',
          title: 'PostgreSQL Mastery: Relational Design & Indexing',
          type: 'Interactive Lab',
          duration: '4 hours',
          skill: 'PostgreSQL',
          level: 'Intermediate',
          url: 'https://www.postgresql.org/docs/',
          rating: 4.8
        },
        {
          id: 'r3',
          title: 'Docker for Developers: Zero to Containerized Deploy',
          type: 'Video Tutorial',
          duration: '3.5 hours',
          skill: 'Docker',
          level: 'Beginner to Intermediate',
          url: 'https://docs.docker.com',
          rating: 4.9
        },
        {
          id: 'r4',
          title: 'System Design for Full-Stack Engineers',
          type: 'Interactive Guide',
          duration: '5 hours',
          skill: 'System Design',
          level: 'Advanced',
          url: 'https://github.com/donnemartin/system-design-primer',
          rating: 5.0
        }
      ];
    }
  }
};

export default learningService;
