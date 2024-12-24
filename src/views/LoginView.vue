<template>
    <div>
        <h1>Logowanie</h1>
        <form @submit.prevent="login">
            <div>
                <label for="username">Nazwa użytkownika(adres email):</label>
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
import apiClient from '@/services/api';

export default {
    data() {
        return {
            username: '',
            password: '',
            error: '',
        }
    },
    methods: {
        async login() {
  try {
    // Wysyłaj zapytanie na pełny URL, aby upewnić się, że zapytanie trafia do właściwego miejsca
    const response = await apiClient.post('/Auth/login', {
      email: this.username,
      password: this.password,
    });

    const token = response.data.token;
    localStorage.setItem('jwtToken', token); // Zapisz token w localStorage
    this.$router.push('/menu'); // Przekieruj do strony menu po zalogowaniu
  } catch (error) {
    this.error = 'Błąd logowania. Sprawdź dane logowania.';
    console.error('Błąd logowania:', error);
  }
},
    },
}
</script>