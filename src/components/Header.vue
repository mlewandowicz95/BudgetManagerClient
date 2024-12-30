<template>
    <header class="app-header">
      <div class="logo">
        <img src="@/assets/logo.png" alt="Budget Manager Logo" />
      </div>
      <nav class="menu">
        <ul>
          <li v-if="isAuthenticated">
            <router-link to="/dashboard">Pulpit</router-link>
          </li>
          <li v-if="isAuthenticated">
            <router-link to="/history">Historia</router-link>
          </li>
          <li v-if="isAuthenticated">
            <router-link to="/profile">Profil</router-link>
          </li>
          <li v-if="isAuthenticated">
            <router-link to="/settings">Ustawienia</router-link>
          </li>
          <li v-if="isAuthenticated && isAdmin">
            <router-link to="/admin">Panel administracyjny</router-link>
          </li>
        </ul>
      </nav>
      <div class="actions">
        <p v-if="isAuthenticated" class="user-info">Witaj, {{ user?.email }}</p>
        <button @click="logout">Wyloguj się</button>
      </div>
    </header>
  </template>
  
  <script>
  import { useUserStore } from '@/stores/userStore';
  
  export default {
    name: 'HeaderDefault',
    setup() {
      const userStore = useUserStore();
  
      const logout = () => {
        userStore.logout();
        window.location.href = '/'; // Przekierowanie na stronę główną
      };
  
      return {
        user: userStore.user,
        isAuthenticated: userStore.isAuthenticated,
        isAdmin: userStore.isAdmin,
        logout,
      };
    },
  };
  </script>

<style scoped>
.app-header {
    display: flex;
  justify-content:space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid black;

}

.logo img {
    max-width: 200px; 
    height: auto; 
}

.menu ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 15px; /* Odstępy między elementami menu */
}

.menu li {
  margin: 0 50px;
}

.menu a {
  text-decoration: none;
  color: #333;
  font-size: 16px;
  font-weight: bold;
}

.menu a:hover {
  text-decoration: underline;
  text-decoration-color:#00b5f8;
  text-decoration-thickness: 2px;
}


.actions {
    display: flex;
    align-items: center;
}
</style>