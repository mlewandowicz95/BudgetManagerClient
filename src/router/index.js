import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue'; // Importuj HomeView

const routes = [
  { path: '/', name: 'Home', component: HomeView }, // Wyświetl HomeView na ścieżce "/"
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
