import api from './api';
import authService from './authService';

export const profileService = {
  async getProfile() {
    try {
      const response = await api.get('/api/profile');
      return response.data;
    } catch (err) {
      return await authService.getCurrentUser();
    }
  },

  async updateProfile(profileData) {
    try {
      const response = await api.put('/api/profile', profileData);
      return response.data;
    } catch (err) {
      const current = await authService.getCurrentUser();
      const updated = { ...current, ...profileData };
      localStorage.setItem('edupath_user', JSON.stringify(updated));
      return updated;
    }
  }
};

export default profileService;
