import api from './api';

export const roadmapService = {
  /**
   * Generates a personalized learning roadmap based on target role and missing skills
   * @param {string} targetRole
   * @param {string[]} missingSkills
   * @returns {Promise<{target_role: string, roadmap: Array}>}
   */
  async generateRoadmap(targetRole, missingSkills = []) {
    try {
      const response = await api.post('/roadmap', {
        target_role: targetRole,
        missing_skills: missingSkills,
      });
      return response.data;
    } catch (err) {
      console.warn('Roadmap API error, falling back to local curriculum generation:', err);
      // Fallback in case of network issue
      const fallbackItems = missingSkills.map((s, idx) => ({
        skill: s.trim().toUpperCase() === 'REST API' ? 'REST API' : s.trim().charAt(0).toUpperCase() + s.trim().slice(1),
        priority: idx === 0 ? 'High' : 'Medium',
        estimated_days: 5,
        topics: [
          'Core Concepts & Syntax',
          'Data Structures & Interfaces',
          'Best Practices & Design Patterns',
          'Debugging & Error Handling',
          'Real-World Project Application'
        ]
      }));
      return {
        target_role: targetRole,
        roadmap: fallbackItems
      };
    }
  }
};

export default roadmapService;
