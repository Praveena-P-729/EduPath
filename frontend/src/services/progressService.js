import api from './api';

const MOCK_PROGRESS_DATA = {
  overallProgress: 68,
  learningHours: 24,
  tasksCompleted: 37,
  practiceScore: 82,
  currentStreak: 6,
  skillProgressHistory: [
    { week: 'Week 1', frontend: 40, backend: 15, database: 10, devops: 5 },
    { week: 'Week 2', frontend: 55, backend: 25, database: 15, devops: 10 },
    { week: 'Week 3', frontend: 70, backend: 38, database: 25, devops: 12 },
    { week: 'Week 4', frontend: 82, backend: 48, database: 35, devops: 18 },
    { week: 'Week 5', frontend: 88, backend: 58, database: 42, devops: 20 },
    { week: 'Week 6', frontend: 92, backend: 65, database: 50, devops: 25 },
  ],
  learningHoursPerDay: [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.0 },
    { day: 'Wed', hours: 4.0 },
    { day: 'Thu', hours: 2.0 },
    { day: 'Fri', hours: 3.5 },
    { day: 'Sat', hours: 5.0 },
    { day: 'Sun', hours: 4.0 },
  ],
  weeklyCompletionRate: [
    { name: 'Week 1', rate: 75 },
    { name: 'Week 2', rate: 85 },
    { name: 'Week 3', rate: 90 },
    { name: 'Week 4', rate: 65 },
    { name: 'Week 5', rate: 95 },
    { name: 'Current Week', rate: 64 },
  ],
  skillDistribution: [
    { name: 'Frontend', value: 38, color: '#6366f1' },
    { name: 'Backend', value: 28, color: '#8b5cf6' },
    { name: 'Database', value: 18, color: '#06b6d4' },
    { name: 'DevOps & Tools', value: 16, color: '#10b981' },
  ]
};

const MOCK_REPORT_DATA = {
  candidateName: 'Praveena',
  targetRole: 'Full-Stack Developer',
  generatedAt: 'September 2026',
  careerReadinessScore: 72,
  readinessBenchmark: 'Upper 15% of Entry-Level Candidates',
  skillsAcquired: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Git', 'REST API Design', 'FastAPI Basics', 'SQL Basics'],
  skillsInProgress: ['Advanced FastAPI', 'PostgreSQL Optimization', 'Docker Containerization', 'React Query'],
  remainingGaps: ['Production CI/CD Pipelines', 'System Design & Microservices', 'Integration Testing Suites'],
  achievements: [
    { title: '7-Day Learning Streak', description: 'Consistently logged 2+ hours every day this week', date: 'Earned 2 days ago' },
    { title: 'React Master', description: 'Completed 100% of React fundamentals & advanced hooks', date: 'Earned 1 week ago' },
    { title: 'Quiz Ace', description: 'Scored 90%+ in 5 consecutive REST API assessments', date: 'Earned 2 weeks ago' }
  ],
  recommendedNextSteps: [
    'Focus 6 hours this week on PostgreSQL indexing and connection pooling',
    'Complete the Docker multi-container compose practical lab',
    'Build a full-stack CRUD capstone integrating JWT authentication',
    'Schedule a mock interview on System Design fundamentals'
  ]
};

const MOCK_PRACTICE_QUESTIONS = [
  {
    id: 1,
    category: 'MCQ',
    skill: 'React',
    question: 'What is the primary difference between useEffect and useLayoutEffect in React?',
    options: [
      'useLayoutEffect runs asynchronously after paint, while useEffect runs synchronously before paint.',
      'useLayoutEffect runs synchronously after DOM mutations but before the browser paints, while useEffect runs asynchronously after paint.',
      'useLayoutEffect is only available in Class Components, while useEffect is for functional components.',
      'There is no functional difference; useLayoutEffect is an alias for useEffect.'
    ],
    correctAnswer: 1,
    explanation: 'useLayoutEffect fires synchronously after all DOM mutations. Use it to read layout from the DOM and synchronously re-render before the browser has a chance to paint to avoid visual flickering.'
  },
  {
    id: 2,
    category: 'MCQ',
    skill: 'REST APIs',
    question: 'Which HTTP status code should be returned when a POST request successfully creates a new database resource?',
    options: [
      '200 OK',
      '201 Created',
      '204 No Content',
      '202 Accepted'
    ],
    correctAnswer: 1,
    explanation: 'HTTP 201 Created is the standard HTTP status code indicating that the request has succeeded and led to the creation of a new resource.'
  },
  {
    id: 3,
    category: 'MCQ',
    skill: 'FastAPI',
    question: 'In FastAPI, which library is utilized under the hood for data validation and schema declaration?',
    options: [
      'Marshmallow',
      'Cerberus',
      'Pydantic',
      'Django ORM'
    ],
    correctAnswer: 2,
    explanation: 'FastAPI leverages Pydantic for data parsing, type hints validation, serialization, and automatic OpenAPI documentation generation.'
  },
  {
    id: 4,
    category: 'MCQ',
    skill: 'Database',
    question: 'What type of index is most effective in PostgreSQL for high-speed equality and range queries on numeric columns?',
    options: [
      'Hash Index',
      'B-Tree Index',
      'GIN Index',
      'BRIN Index'
    ],
    correctAnswer: 1,
    explanation: 'B-Tree is the default and most versatile index type in PostgreSQL, perfectly optimized for comparisons involving <, <=, =, >=, and >.'
  },
  {
    id: 5,
    category: 'MCQ',
    skill: 'Docker',
    question: 'What is the purpose of multi-stage builds in a Dockerfile?',
    options: [
      'To run multiple containers simultaneously within a single Docker daemon.',
      'To minimize final image size by separating the build environment from the lean runtime environment.',
      'To allow multiple operating systems to be emulated in one image.',
      'To automatically scale CPU and RAM usage.'
    ],
    correctAnswer: 1,
    explanation: 'Multi-stage builds allow you to use intermediate images with compilers/build tools, copying only the final compiled artifacts into a lightweight production runtime image.'
  }
];

export const progressService = {
  async getProgressMetrics() {
    try {
      const response = await api.get('/api/progress/metrics');
      return response.data;
    } catch (err) {
      return MOCK_PROGRESS_DATA;
    }
  },

  async getCareerReport(candidate = 'Praveena', role = 'Full-Stack Developer') {
    try {
      const response = await api.get(`/api/reports/career?candidate=${encodeURIComponent(candidate)}&role=${encodeURIComponent(role)}`);
      return response.data;
    } catch (err) {
      return MOCK_REPORT_DATA;
    }
  },

  async getPracticeQuestions(category = 'All') {
    try {
      const response = await api.get(`/api/practice/questions?category=${category}`);
      return response.data;
    } catch (err) {
      if (category === 'All') return MOCK_PRACTICE_QUESTIONS;
      return MOCK_PRACTICE_QUESTIONS.filter(q => q.category.toLowerCase() === category.toLowerCase() || q.skill.toLowerCase() === category.toLowerCase());
    }
  },

  async sendChatMessage(message) {
    try {
      const response = await api.post('/api/chat/message', { message });
      return response.data;
    } catch (err) {
      return {
        reply: `Here is guidance regarding your question: Focus on daily practice, closing high-impact Docker & PostgreSQL gaps, and mastering REST API integration.`,
        timestamp: 'Just now'
      };
    }
  }
};

export default progressService;
