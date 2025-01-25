import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null, // JWT token
  }),
  actions: {
    setToken(token) {
      this.token = token;
    },
    logout() {
      this.token = null;
      localStorage.removeItem('jwtToken');
    },
    initializeUser() {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        this.setToken(token);
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'Admin',
  },
});
