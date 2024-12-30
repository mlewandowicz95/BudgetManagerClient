<template>
  <div class="dashboard-container">
    <div class="add-goal-section">
      <button @click="onAddGoalClick" class="add-goal-button">Dodaj wpływ</button>
      <button @click="onAddGoalClick" class="add-goal-button">Dodaj wydatek</button>
      <button @click="onAddGoalClick" class="add-goal-button">Dodaj cel</button>
    </div>

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
      <div class="summary-item">
        <h3>Okres</h3>
        <p>{{currentMonth }}</p>
      </div>
    </div>

    <!-- Sekcja list transakcji i celów oszczędnościowych -->
    <div class="dashboard-lists">
      <TransactionList :transactions="dashboardData.recentTransactions" />
      <SavingGoalsList :goals="dashboardData.savingGoals" />
    </div>

    <!-- Wykres słupkowy poziomy -->
  <!--  <HorizontalBarChart v-if="dataReady" :categories="categories" :totals="totals" /> -->
  </div>
</template>

<script>
import { expensesByCategory, fetchDashboardData } from "@/api/authApi";
import TransactionList from "@/components/TransactionList.vue";
import SavingGoalsList from "@/components/SavingGoalsList.vue";
//import HorizontalBarChart from "@/components/charts/HorizontalBarChart.vue";

export default {
  name: "DashboardView",
  components: {
    TransactionList,
    SavingGoalsList,
   // HorizontalBarChart,
  },
  data() {
    return {
      currentMonth: "",
      categories: [],
      totals: [],
      dataReady: false,
      dashboardData: {
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0,
        recentTransactions: [],
        savingGoals: [],
      },
    };
  },
  async mounted() {
    try {

      const now = new Date();
    this.currentMonth = now.toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "long",
    });
      const data = await expensesByCategory();
      this.categories = data.map((item) => item.category);
      this.totals = data.map((item) => item.totalAmount);
      this.dataReady = true; // Dane są gotowe
    } catch (error) {
      console.error("Error fetching expenses by category.", error);
    }
  },
  async created() {
    try {
      const data = await fetchDashboardData();
      this.dashboardData = data;
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  },
  methods: {
    onAddGoalClick() {
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
  justify-content: flex-start;
  margin-bottom: 20px;
}

.add-goal-button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 20px;
  border: none;
  cursor: pointer;
}

.dashboard-lists {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}


</style>
