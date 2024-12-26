<template>
    <div class="dashboard">
      <h1>Dashboard</h1>
      <div class="widgets">
        <div class="widget" v-for="widget in widgets" :key="widget.id">
          <h2>{{ widget.title }}</h2>
          <p>{{ widget.value }}</p>
        </div>
      </div>
      <button @click="logout">Wyloguj</button>
    </div>
  </template>
  
  <script>
  import apiClient from '@/api/config'; // Axios client
  import authApi from '@/api/authApi'; // Obsługa logowania
  
  export default {
    name: 'DashboardView',
    data() {
      return {
        widgets: [], // Tablica na widżety
        error: '',
      };
    },
    methods: {
      async fetchDashboardData() {
        try {
          const response = await apiClient.get('/api/Dashboard/dashboard');
          this.widgets = response.data; // Przypisz dane do widżetów
        } catch (error) {
          console.error('Błąd pobierania danych Dashboardu:', error);
          this.error = 'Nie udało się pobrać danych.';
        }
      },
      async logout() {
        try {
          await authApi.logout(); // Wylogowanie
          localStorage.removeItem('jwtToken'); // Usuń token
          this.$router.push('/login'); // Przekieruj na stronę logowania
        } catch (error) {
          console.error('Błąd wylogowywania:', error);
          this.error = 'Nie udało się wylogować.';
        }
      },
    },
    mounted() {
      this.fetchDashboardData(); // Pobierz dane Dashboardu przy załadowaniu
    },
  };
  </script>
  
  <style scoped>
  .dashboard {
    text-align: center;
    padding: 20px;
  }
  .widgets {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin: 20px 0;
  }
  .widget {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  </style>
  