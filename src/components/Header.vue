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
    <p v-if="isAuthenticated" class="user-info">Witaj, {{ user?.email }}</p>
    <button @click="logout">Wyloguj się</button>
  </div>
</header>
  </template>
  
  <script>
  import { ref } from "vue"; // Dodano import ref
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
        window.location.href = "/"; // Przekierowanie na stronę główną
      };
  
      return {
        isMenuOpen,
        toggleMenu,
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
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
  background-color: #f9f9f9;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  position: relative; /* Dodanie pozycji względnej dla menu */
  z-index: 1000;
}

.logo {
  margin-left: 20px;
}

.logo img {
  max-width: 150px; 
  height: auto; 
}

.hamburger-menu {
  display: none; /* Ukryj na większych ekranach */
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.menu {
  display: flex;
  gap: 15px;
  align-items: center;
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
  font-size: 18px;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 4px;
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

.actions button {
  padding: 8px 12px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  background-color: #f44336;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.actions button:hover {
  background-color: #d32f2f;
}

/* Dostosowanie do trybu mobilnego */
@media (max-width: 768px) {
  .hamburger-menu {
    display: block;
  }

  .menu {
    display: none; /* Domyślnie ukryj menu */
    position: absolute;
    top: 60px; /* Dopasuj do headera */
    left: 0;
    right: 0;
    background-color: white;
    padding: 20px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }

  .menu.open {
    display: flex;
    flex-direction: column; /* Wyświetlanie w kolumnie */
    max-height: calc(100vh - 60px); /* Wysokość menu dostosowana do okna */
    overflow-y: auto; /* Włącz przewijanie, jeśli elementów będzie za dużo */
  }

  .menu ul {
    flex-direction: column;
    gap: 10px;
  }

  .menu li {
    margin: 0;
  }

  .menu a {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }

  .menu a:last-child {
    border-bottom: none;
  }

  .menu a:hover {
    text-decoration: underline;
    text-decoration-color: #00b5f8;
    text-decoration-thickness: 2px;
  }

    /* Rozwiązanie problemu z zasłanianiem przycisków */
    .menu.open + .actions {
    position: relative;
    z-index: 0; /* Menu będzie pod przyciskami */
  }
}
</style>



