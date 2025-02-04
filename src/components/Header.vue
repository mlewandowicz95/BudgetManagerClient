<template>
  <header class="app-header">
    <div class="logo">
      <img src="@/assets/logo.png" alt="Budget Manager Logo" />
    </div>
    <button class="hamburger-menu" @click="toggleMenu">
      ☰
    </button>
    <nav :class="['menu', { open: isMenuOpen }]">
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
      <p v-if="isAuthenticated" class="user-info">
        Witaj, <span class="user-email">{{ userEmail }}</span>
      </p>
      <button class="logout-button" @click="logout">Wyloguj się</button>
    </div>
  </header>
  </template>
  
  <script>
  import { ref, computed } from "vue";
  import { useUserStore } from "@/stores/userStore";
  
  export default {
    name: "HeaderDefault",
    setup() {
      const userStore = useUserStore();
      const isMenuOpen = ref(false);
  
      const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value;
      };
  
      const logout = () => {
        userStore.logout();
        window.location.href = "/";
      };
  
      const userEmail = computed(() => userStore.user?.email || "Gość");
  
      return {
        isMenuOpen,
        toggleMenu,
        userEmail,
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
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 1px solid #ddd;
    background-color: #f9f9f9;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    height: 60px; /* Poprawiona wysokość */
  }
  
  .logo img {
    max-width: 150px; 
    height: auto; 
  }
  
  .hamburger-menu {
    display: none;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
  
  .menu ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 20px;
  }
  
  .menu li {
    margin: 0;
  }
  
  .menu a {
    text-decoration: none;
    color: #333;
    font-size: 16px;
    font-weight: bold;
    padding: 10px;
  }
  
  .menu a:hover {
    text-decoration: underline;
    text-decoration-color: #00b5f8;
    text-decoration-thickness: 2px;
  }
  
  .actions {
    display: flex;
    align-items: center;
  }
  
  .actions .user-info {
    font-size: 14px;
    color: #555;
    margin-right: 10px;
  }
  
  .logout-button {
    padding: 6px 10px;
    font-size: 14px;
    font-weight: bold;
    color: white;
    background-color: #f44336;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .logout-button:hover {
    background-color: #d32f2f;
  }
  
  @media (max-width: 768px) {
    .hamburger-menu {
      display: block;
    }
  
    .menu {
      display: none;
      position: absolute;
      top: 60px;
      left: 0;
      right: 0;
      background-color: white;
      padding: 20px;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
      z-index: 1000;
    }
  
    .menu.open {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  
    .menu ul {
      flex-direction: column;
    }
  }
  </style>
  