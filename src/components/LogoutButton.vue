<template>
  <button class="logout-button" @click="handleLogout">
    Logout
  </button>
</template>

<script>
import { logout } from '@/api/authApi';
import User from '@/models/User';

export default {
  name: 'LogoutButton',
  data() {
    return {
      currentUser: null, // Aktualny użytkownik
    };
  },
  created() {
    // Odczytaj dane użytkownika z localStorage i utwórz obiekt User
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      this.currentUser = new User(userData);
    }
  },
  methods: {
    async handleLogout() {
      try {
        if (this.currentUser) {
          console.log('Wylogowano użytkownika:', this.currentUser.email);
        }

        await logout();

        // Usunięcie danych z localStorage
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');

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
