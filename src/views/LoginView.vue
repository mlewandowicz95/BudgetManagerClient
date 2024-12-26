<template>
    <div>
      <h1>Logowanie</h1>
      <form @submit.prevent="login">
        <div>
          <label for="username">Nazwa użytkownika (adres email):</label>
          <input id="username" v-model="username" type="text" required />
        </div>
        <div>
          <label for="password">Hasło:</label>
          <input id="password" v-model="password" type="password" required />
        </div>
        <button type="submit">Zaloguj</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import authApi from '@/api/authApi';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        error: '',
      };
    },
    methods: {
  async login() {
    try {
      const response = await authApi.login({
        email: this.username,
        password: this.password,
      });

      const token = response.token;
      localStorage.setItem('jwtToken', token); // Zapisz token w localStorage

      this.$router.push('/dashboard'); // Przekierowanie po zalogowaniu
    } catch (error) {
      this.error = "Błąd inny: " + error.message || 'Błąd logowania. Sprawdź dane logowania.';
      console.error('Błąd logowania:', error);
    }
  },
},
  };
  </script>
  