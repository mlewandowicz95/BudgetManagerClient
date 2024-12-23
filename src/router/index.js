import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue'; // HomeView
import LoginView from '@/views/LoginView.vue'; // LoginView
import RegisterView from '@/views/RegisterView.vue'; // RegisterView
import MenuView from '@/views/MenuView.vue'; // MenuView

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
  { path: '/menu', name: 'Menu', component: MenuView }, // Dodanie trasy do Menu
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
