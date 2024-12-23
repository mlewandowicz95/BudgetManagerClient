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
            try{
                const response = await apiClient.post('/auth/login', {
                    username: this.username,
                    password: this.password,
                })
                const token = response.data.token
                localStorage.setItem('jwtToken', token)
                this.$router.push('/') // Przekieruj do strony głównej
            } catch(error) {
                this.error = 'Błąd logowania. Sprawdź dane logowania.'
            }
        },
    },
    name: 'LoginView'
}
</script>