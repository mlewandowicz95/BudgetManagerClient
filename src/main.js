import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importuj router

// Debugowanie zmiennych środowiskowych
console.log('Base API URL:', process.env.VUE_APP_API_BASE_URL);

createApp(App)
  .use(router) // Zastosuj router
  .mount('#app'); // Montuj aplikację na elemencie <div id="app">

  