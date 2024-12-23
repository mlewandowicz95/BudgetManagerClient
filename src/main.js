import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importuj router

createApp(App)
  .use(router) // Zastosuj router
  .mount('#app'); // Montuj aplikację na elemencie <div id="app">
