<template>

  <div class="dashboard-container">
    <!-- Sekcja podsumowania finansowego -->
    <div class="dashboard-summary">
      <div class="summary-item">
        <h3>Total Income</h3>
        <p>{{ formatCurrency(dashboardData.totalIncome) }}</p>
      </div>
      <div class="summary-item">
        <h3>Total Expenses</h3>
        <p>{{ formatCurrency(dashboardData.totalExpenses) }}</p>
      </div>
      <div class="summary-item">
        <h3>Balance</h3>
        <p>{{ formatCurrency(dashboardData.balance) }}</p>
      </div>
    </div>

    <!-- Sekcja list transakcji i celów oszczędnościowych -->
    <div class="dashboard-lists">
      <TransactionList :transactions="dashboardData.recentTransactions" />
      <SavingGoalsList :goals="dashboardData.savingGoals" />
    </div>
  </div>

</template>

<script>

import { fetchDashboardData } from "@/api/authApi";
import TransactionList from "@/components/TransactionList.vue";
import SavingGoalsList from "@/components/SavingGoalsList.vue";

export default {
  name: "DashboardView",
  components: {
    TransactionList,
    SavingGoalsList,
  },
  data() {
    return {
      dashboardData: {
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0,
        recentTransactions: [],
        savingGoals: [],
      },
    };
  },
  async created() {
    try {
      // Pobieranie danych z API
      const data = await fetchDashboardData();
      this.dashboardData = data;
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat("pl-PL", {
        style: "currency",
        currency: "PLN",
      }).format(value);
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
  border: 1px solid black;
}

.dashboard-summary {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.summary-item {
  text-align: center;
  flex: 1;
  margin: 0 10px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dashboard-lists {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
</style>
