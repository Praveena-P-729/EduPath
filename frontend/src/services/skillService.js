import api from './api';

const MOCK_SKILL_ANALYSIS = {
  targetRole: 'Full-Stack Developer',
  overallReadiness: 72,
  skillsBreakdown: [
    { name: 'React', category: 'Frontend', level: 'Strong', score: 90, status: 'strong' },
    { name: 'JavaScript', category: 'Frontend', level: 'Strong', score: 85, status: 'strong' },
    { name: 'HTML & CSS', category: 'Frontend', level: 'Strong', score: 95, status: 'strong' },
    { name: 'Git & GitHub', category: 'DevOps', level: 'Strong', score: 80, status: 'strong' },
    { name: 'Node.js', category: 'Backend', level: 'Developing', score: 60, status: 'developing' },
    { name: 'REST APIs', category: 'Backend', level: 'Developing', score: 65, status: 'developing' },
    { name: 'FastAPI', category: 'Backend', level: 'Developing', score: 55, status: 'developing' },
    { name: 'PostgreSQL', category: 'Database', level: 'Developing', score: 45, status: 'developing' },
    { name: 'Docker', category: 'DevOps', level: 'Missing', score: 20, status: 'missing' },
    { name: 'Testing (Jest/PyTest)', category: 'Quality', level: 'Missing', score: 15, status: 'missing' },
    { name: 'System Design', category: 'Architecture', level: 'Missing', score: 10, status: 'missing' },
  ],
  topSkillGaps: [
    { name: 'Docker', priority: 'High', reason: 'Critical for modern containerized full-stack deployment' },
    { name: 'PostgreSQL', priority: 'High', reason: 'Essential relational database design and optimization' },
    { name: 'System Design', priority: 'Medium', reason: 'Needed for scalable microservice and API architecture' },
    { name: 'Testing', priority: 'Medium', reason: 'Unit & integration testing requirements' },
    { name: 'Node.js', priority: 'Medium', reason: 'Core runtime for full-stack JavaScript ecosystems' },
  ]
};

export const skillService = {
  async getSkillAnalysis(role = 'Full-Stack Developer') {
    try {
      const response = await api.get(`/api/skills/analysis?role=${encodeURIComponent(role)}`);
      return response.data;
    } catch (err) {
      return MOCK_SKILL_ANALYSIS;
    }
  },

  async getAllSkills() {
    try {
      const response = await api.get('/api/skills');
      return response.data;
    } catch (err) {
      return [
        'React', 'JavaScript', 'TypeScript', 'Node.js', 'Express', 'HTML', 'CSS', 'Tailwind CSS',
        'Python', 'FastAPI', 'Django', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes',
        'AWS', 'CI/CD', 'Git', 'REST APIs', 'GraphQL', 'System Design', 'Jest', 'PyTest', 'Java'
      ];
    }
  },

  async analyzeResume(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await api.post('/api/resume/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (err) {
      // Mock resume analysis result
      return {
        candidateName: 'Praveena R.',
        education: 'B.Tech in Computer Science, NIT (2024)',
        experience: 'Full-Stack Development Intern (6 Months)',
        detectedSkills: ['Java', 'JavaScript', 'React', 'HTML', 'CSS', 'FastAPI', 'SQL', 'Git', 'Tailwind CSS'],
        projects: [
          'E-Commerce Microservices Web App using React & FastAPI',
          'AI Note Summarizer with Embeddings & Vector Search'
        ],
        certifications: [
          'Meta Frontend Developer Professional Certificate',
          'AWS Cloud Practitioner'
        ],
        matchScore: 74
      };
    }
  }
};

export default skillService;
