import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router'; // Importuj router
//import './assets/global.css'; // Import globalnych stylów
import { useUserStore } from '@/stores/userStore'; // Importuj store użytkownika
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
// Debugowanie zmiennych środowiskowych
console.log('Base API URL:', process.env.VUE_APP_API_BASE_URL);

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

const userStore = useUserStore(); // Użyj store użytkownika
userStore.initializeUser();

app.use(router);

app.mount('#app');


  