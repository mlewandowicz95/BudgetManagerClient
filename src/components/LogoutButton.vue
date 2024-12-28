<template>
    <button class="logout-button" @click="handleLogout">
      Logout
    </button>
  </template>
  
  <script>
  import { logout } from '@/api/authApi';
  
  export default {
    name: 'LogoutButton',
    methods: {
      async handleLogout() {
        try {
          await logout();
          // Usunięcie tokena z localStorage
          localStorage.removeItem('jwtToken');
          localStorage.removeItem('userEmail');
          localStorage.removeItem('userRole');
  
          // Przekierowanie do strony logowania
          this.$router.push('/');
        } catch (error) {
          console.error('Error during logout:', error);
          alert('Failed to logout. Please try again.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .logout-button {
    background-color: #f44336;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .logout-button:hover {
    background-color: #d32f2f;
  }
  </style>
  