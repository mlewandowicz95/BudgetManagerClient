import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from "@/stores/userStore";

//import AppLayout from '@/layouts/AppLayout.vue';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import DashboardView from '@/views/DashboardView.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import ProfileView from "@/views/ProfileView.vue";
import HistoryView from '@/views/HistoryView.vue';
import SettingsView from '@/views/SettingsView.vue';
import AdminView from '@/views/admin/AdminView.vue';


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
  {
    path: '/profile',
    component: AppLayout,
    meta: {requiresAuth: true},
    children: [
      {
        path: "",
        name: "Profile",
        component: ProfileView,
      }
    ]
  },
  {
    path: '/history',
    component: AppLayout,
    meta: {requiresAuth: true},
    children: [
      {
        path: "",
        name: "History",
        component: HistoryView,
      }
    ]
  },
  {
    path: '/settings',
    component: AppLayout,
    meta: {requiresAuth: true},
    children: [
      {
        path: "",
        name: "Settings",
        component: SettingsView,
      }
    ]
  },
  {
    path: '/admin',
    component: AppLayout,
    meta: {requiresAuth: true},
    children: [
      {
        path: "",
        name: "Admin",
        component: AdminView,
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();


  if (!userStore.isAuthenticated) {
    userStore.initializeUser();
  }

 
  if (userStore.isAuthenticated && (to.name === "Home" || to.name === "Login" || to.name === "Register")) {
    return next({ name: "Dashboard" });
  }

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    return next({ name: "Login" });
  }

  
  next();
});

export default router;
