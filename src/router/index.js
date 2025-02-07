import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from "@/stores/userStore";

// Importowanie widoków
import HomeView from '@/views/HomeView.vue';
import DashboardView from '@/views/DashboardView.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import ProfileView from "@/views/ProfileView.vue";
import HistoryView from '@/views/HistoryView.vue';
import SettingsView from '@/views/SettingsView.vue';
import AdminView from '@/views/admin/AdminView.vue';
import AddIncomeForm from '@/components/AddIncomeForm.vue';
import AddExpenseForm from '@/components/AddExpenseForm.vue';
import AddGoalForm from '@/components/AddGoalForm.vue';
import ConfirmEmailChangeView from '@/components/ConfirmEmailChangeView.vue';
import ResetPasswordView from '@/components/ResetPasswordView.vue';
import AddMonthlyBudgetForm from '@/components/AddMonthlyBudget.Form.vue';

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: { requiresAuth: false },
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPasswordView,
    props: (route) => ({ token: route.query.token }),
  },
  {
    path: "/dashboard",
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "Dashboard",
        component: DashboardView,
      }
    ]
  },
  {
    path: "/add-income",
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "AddIncome",
        component: AddIncomeForm,
      }
    ]
  },
  {
    path: "/add-expense",
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "AddExpense",
        component: AddExpenseForm,
      }
    ]
  },
  {
    path: '/edit-expense/:id',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "EditExpense",
        component: AddExpenseForm,
      }
    ]
  },
  {
    path: "/edit-income/:id",
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",  // To poprawna definicja dla child-routingu!
        name: "EditIncome",
        component: AddIncomeForm,
        props: true
      }
    ]
  },
  {
    path: "/add-goal",
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "AddGoal",
        component: AddGoalForm,
      }
    ]
  },
  {
    path: "/add-budget",
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "AddBudget",
        component: AddMonthlyBudgetForm,
      }
    ]
  },
  {
    path: "/profile",
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "Profile",
        component: ProfileView,
      }
    ]
  },
  {
    path: "/confirm-email-change",
    name: "ConfirmEmailChange",
    component: ConfirmEmailChangeView,
    props: (route) => ({ token: route.query.token }),
  },
  {
    path: "/history",
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "History",
        component: HistoryView,
      }
    ]
  },
  {
    path: "/settings",
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "Settings",
        component: SettingsView,
      }
    ]
  },
  {
    path: "/admin",
    component: AppLayout,
    meta: { requiresAuth: true, requiresAdmin: true }, // Dodana ochrona dla Adminów
    children: [
      {
        path: "",
        name: "Admin",
        component: AdminView,
      }
    ]
  },
  // 🔹 Przekierowanie /login i /register na stronę główną
  {
    path: "/login",
    redirect: "/",
  },
  {
    path: "/register",
    redirect: "/",
  },
  // 🔹 Obsługa błędnych tras – przekierowanie na stronę główną
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const token = userStore.token || localStorage.getItem("jwtToken");

  if (!userStore.isAuthenticated && token) {
    await userStore.initializeUser();
  }

  if (userStore.isAuthenticated && (to.name === "Home" || to.path === "/login" || to.path === "/register")) {
    return next({ name: "Dashboard" });
  }

  if (to.meta.requiresAuth && !token) {
    return next({ name: "Home" });
  }

  if (to.meta.requiresAdmin && !userStore.isAdmin) {
    return next({ name: "Dashboard" });
  }

  next();
});

export default router;