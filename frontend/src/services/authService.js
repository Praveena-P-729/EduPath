import api from './api';

const MOCK_USER = {
  id: 'usr_101',
  fullName: 'Praveena',
  email: 'praveena@example.com',
  targetRole: 'Full-Stack Developer',
  college: 'National Institute of Technology',
  degree: 'B.Tech in Computer Science',
  experience: 'Fresher / Entry-Level',
  careerGoal: 'Become a senior full-stack engineer and build scalable AI products',
  weeklyHours: 15,
  skills: ['Java', 'JavaScript', 'React', 'HTML', 'CSS', 'Git', 'FastAPI', 'SQL'],
  careerReadiness: 72,
  readinessChange: '+8%',
  skillsAcquired: 18,
  skillsInProgress: 6,
  skillGaps: 8,
  learningHours: 24,
  streak: 6,
};

export const authService = {
  async login(email, password) {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      return response.data;
    } catch (err) {
      // Fallback to mock authentication for seamless local experience
      const mockToken = 'mock_jwt_token_edupath_' + Date.now();
      const user = { ...MOCK_USER, email: email || MOCK_USER.email };
      localStorage.setItem('edupath_token', mockToken);
      localStorage.setItem('edupath_user', JSON.stringify(user));
      return { access_token: mockToken, user };
    }
  },

  async register(userData) {
    try {
      const response = await api.post('/api/auth/register', userData);
      return response.data;
    } catch (err) {
      const mockToken = 'mock_jwt_token_edupath_' + Date.now();
      const user = { ...MOCK_USER, ...userData };
      localStorage.setItem('edupath_token', mockToken);
      localStorage.setItem('edupath_user', JSON.stringify(user));
      return { access_token: mockToken, user };
    }
  },

  async getCurrentUser() {
    try {
      const response = await api.get('/api/auth/me');
      return response.data;
    } catch (err) {
      const stored = localStorage.getItem('edupath_user');
      return stored ? JSON.parse(stored) : MOCK_USER;
    }
  },

  logout() {
    localStorage.removeItem('edupath_token');
    localStorage.removeItem('edupath_user');
  }
};

export default authService;
