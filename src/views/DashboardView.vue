<template>

  <div class="dashboard-container">
    <!-- Sekcja podsumowania finansowego -->
    <div class="dashboard-summary">
      <div class="summary-item">
        <h3 class="red">Wydatki</h3>
        <p>{{ formatCurrency(dashboardData.totalExpenses) }}</p>
      </div>
      <div class="summary-item">
        <h3>Wpływy</h3>
        <p>{{ formatCurrency(dashboardData.totalIncome) }}</p>
      </div>
      <div class="summary-item">
        <h3>Balance</h3>
        <p>{{ formatCurrency(dashboardData.balance) }}</p>
      </div>
    </div>

    <!--Sekcja "Dodaj cel"-->
    <div class="add-goal-section">
      <button @click="onAddGoalClick" class="add-goal-button">Dodaj cel</button>
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
      console.log("Dashboard data in component:", data);
      this.dashboardData = data;
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  },
  methods: {
    onAddGoalClick(){
      console.log("Dodaj cel kliknięty");
    },
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

.add-goal-section {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.add-goal-button {
  padding: 10px 20px;
  font-size: 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dashboard-lists {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
</style>
