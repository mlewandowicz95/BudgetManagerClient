<template>
  <div>
    <form @submit.prevent="handleLogin">
      <div>
        <input class="input-data" id="username" v-model="username" type="text" required placeholder="Adres e-mail" />
      </div>
      <div>
        <input class="input-data" id="password" v-model="password" type="password" required placeholder="Hasło" />
      </div>
      <button class="button-login" type="submit">Zaloguj się</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { login } from '@/api/authApi';
import { useUserStore } from '@/stores/userStore';

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async handleLogin() {
      const userStore = useUserStore();

      try {
        const response = await login({
          email: this.username,
          password: this.password,
        });

        // Ustaw token i dane użytkownika w Pinia
        userStore.setToken(response.token);
        userStore.setUser(response.user);

        // Zapisz token w localStorage, aby przetrwał odświeżenie
        localStorage.setItem('jwtToken', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));

        // Przekierowanie na dashboard
        this.$router.push('/dashboard');
      } catch (error) {
        this.error =
          error.response?.data?.message ||
          error.message ||
          'Błąd logowania. Sprawdź dane logowania.';
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