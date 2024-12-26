import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue'; // HomeView
import LoginView from '@/views/LoginView.vue'; // LoginView
import RegisterView from '@/views/RegisterView.vue'; // RegisterView
import MenuView from '@/views/MenuView.vue'; // MenuView
import DashboardView from '@/views/DashboardView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
  { path: '/menu', name: 'Menu', component: MenuView }, // Dodanie trasy do Menu
  { path: '/dashboard', name: 'Dashboard', component: DashboardView}
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('jwtToken'); // Sprawdzenie obecności tokena
  if (to.name !== 'Login' && to.name !== 'Register' && to.name !== 'Home' && !isAuthenticated) {
    next({ name: 'Login' }); // Przekierowanie na login, jeśli użytkownik nie jest zalogowany
  } else {
    next(); // Kontynuuj trasę
  }
});

export default router;
