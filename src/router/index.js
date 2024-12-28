import { createRouter, createWebHistory } from 'vue-router';
//import AppLayout from '@/layouts/AppLayout.vue';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import DashboardView from '@/views/DashboardView.vue';
import AppLayout from '@/layouts/AppLayout.vue';


const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: { requiresAuth: false },

  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: { requiresAuth: false },
  },
  {
    path: '/dashboard',
    component: AppLayout,
    meta: {requiresAuth: true },
    children : [
      {
        path: "",
        name: "Dashboard",
        component: DashboardView,
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Guard sprawdzający autoryzację
// Sprawdzanie autoryzacji przed każdą trasą
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("jwtToken"); // Sprawdzenie obecności tokena

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Jeśli trasa wymaga autoryzacji, a użytkownik nie jest zalogowany
    next({
      path: "/", // Przekierowanie na stronę główną
      query: { message: "Proszę się zalogować, aby uzyskać dostęp." }, // Wiadomość dla użytkownika
    });
  } else {
    next(); // Kontynuuj trasę
  }
});

export default router;
