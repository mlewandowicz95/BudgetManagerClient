<template>
  <div>
    <form @submit.prevent="login">
      <div>
        <input class="input-data" id="username"  v-model="username" type="text" required placeholder="Adres e-mail" />
      </div>
      <div>
        <input class="input-data" id="password" v-model="password" type="password" required placeholder="Hasło"/>
      </div>
      <button class="button-login" type="submit">Zaloguj się</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { login } from '@/api/authApi';

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
        const response = await login({
          email: this.username,
          password: this.password,
        });

        console.log('Login response:', response);

        // Zapis tokena do localStorage
        const token = response.token;
        if (!token) {
          throw new Error('Brak tokena w odpowiedzi z serwera.');
        }
        localStorage.setItem('jwtToken', token);

        const userRole = response.user.role;
        localStorage.setItem("userRole", userRole);

        const userEmail = response.user.email;
        localStorage.setItem("userEmail", userEmail);
        
        // Przekierowanie po zalogowaniu
        this.$router.push('/dashboard');
      } catch (error) {
        // Obsługa błędów
        this.error =
          error.message ||
          (error.response?.message || 'Błąd logowania. Sprawdź dane logowania.');
        console.error('Błąd logowania:', error);
      }
    },
  },
};
</script>

<style scoped>
.input-data {
  width: 50%;
  padding: 10px 20px;
  margin: 8px 0px;
  box-sizing: border-box;
  border: none;
  border-bottom: 2px solid black;
}

.button-login {
  padding: 10px 20px;
  font-size: 27px;
  font-weight: bold;
  color: white;
  background-color: #004aad;
  border-radius: 30px;
}
</style>