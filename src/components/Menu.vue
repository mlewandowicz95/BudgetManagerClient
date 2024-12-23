<template>
    <div class="menu">
      <h2>Witaj w Budget Manager!</h2>
      <div>
        <button @click="goToLogin">Zaloguj się</button>
        <button @click="goToRegister">Zarejestruj się</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MenuView',
    methods: {
      goToLogin() {
        this.$router.push('/login'); // Przekierowanie do strony logowania
      },
      goToRegister() {
        this.$router.push('/register'); // Przekierowanie do strony rejestracji
      }
    }
  }
  </script>
  
  <style scoped>
  .menu {
    text-align: center;
    margin-top: 50px;
  }
  
  button {
    margin: 10px;
    padding: 10px 20px;
    font-size: 1.2em;
    cursor: pointer;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
  }
  
  button:hover {
    background-color: #2980b9;
  }
  </style>
  