<template>
  <div class="dashboard-container">
    <div class="add-goal-section">
      <button @click="navigateTo('/add-income')" class="add-goal-button income-button">Dodaj wpływ</button>
      <button @click="navigateTo('/add-expense')" class="add-goal-button expense-button">Dodaj wydatek</button>
      <button @click="navigateTo('/add-goal')" class="add-goal-button goal-button">Dodaj cel</button>
    </div>

    <div class="dashboard-summary">
      <SummaryItem title="Wydatki" :value="dashboardData.totalExpenses" color="red" />
      <SummaryItem title="Wpływy" :value="dashboardData.totalIncome" color="green" />
      <SummaryItem title="Bilans" :value="balance" color="#333" />
      <SummaryItem title="Okres" :value="currentMonth" />
    </div>
    <div class="charts-container">
      <BalancePerMonth />
      <ExpensesByCategoryChart />
      <MonthlyTrendsChart />
    </div>


    <FinancialIndicators />
    <BudgetForecast />

    <div class="dashboard-lists">
      <TransactionList :transactions="dashboardData.recentTransactions" />
      <SavingGoalsList :goals="dashboardData.savingGoals" /> 
    </div>
  </div>
</template>

<script>
import { fetchDashboardData } from "@/api/api";
import ErrorCodes from "@/constants/errorCodes";
import SummaryItem from "@/components/SummaryItem.vue";
import TransactionList from "@/components/TransactionList.vue";
import SavingGoalsList from "@/components/SavingGoalsList.vue";
import FinancialIndicators from "@/components/FinancialIndicators.vue";
import BudgetForecast from "@/components/BudgetForecast.vue";
import BalancePerMonth from "@/components/charts/BalancePerMonthChart.vue";
import ExpensesByCategoryChart from "@/components/charts/ExpensesByCategoryChart.vue";
import MonthlyTrendsChart from "@/components/charts/MonthlyTrendsChart.vue";

export default {
  name: "DashboardView",
  components: {
    SummaryItem,
    FinancialIndicators,
    TransactionList,
    BudgetForecast,
    SavingGoalsList,
    BalancePerMonth,
    ExpensesByCategoryChart,
    MonthlyTrendsChart
  },
  data() {
    return {
      currentMonth: "",
      dashboardData: {
        totalIncome: 0,
        totalExpenses: 0,
        recentTransactions: [],
        savingGoals: [],
      },
    };
  },
  computed: {
    balance() {
      return this.dashboardData.totalIncome - this.dashboardData.totalExpenses;
    },
  },
  async created() {
    try {
      const now = new Date();
      this.currentMonth = now.toLocaleDateString("pl-PL", {
        year: "numeric",
        month: "long",
      });

      const response = await fetchDashboardData();
      this.dashboardData = response;
    } catch (error) {
      this.handleApiError(error);
    }
  },
  methods: {
    handleApiError(error) {
      const messages = {
        [ErrorCodes.Unathorized]: "Użytkownik nie jest zalogowany.",
        [ErrorCodes.InternalServerError]: "Wystąpił błąd serwera. Spróbuj ponownie później.",
      };
      console.error(messages[error.errorCode] || "Wystąpił nieoczekiwany błąd.");
    },
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>


<style scoped>
.dashboard-container {
  padding: 20px;
}

.add-goal-section {
  display: flex;
  justify-content: flex-start;
  gap: 15px;
  margin-bottom: 20px;
}

.add-goal-button {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: white; /* Zmieniono na biały dla kontrastu */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-align: center;
}

.add-goal-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.income-button {
  background-color: #4caf50; /* Zielony */
}

.expense-button {
  background-color: #f44336; /* Czerwony */
}

.goal-button {
  background-color: #2196f3; /* Niebieski */
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

.charts-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
}

.charts-container > * {
  flex: 1;
  max-width: calc(20% - 20px); /* Zmniejsz szerokość do 20% */
  padding: 10px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dashboard-lists {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .dashboard-summary {
    flex-direction: column;
  }

  .charts-container {
    flex-direction: column;
  }

  .charts-container > * {
    max-width: 100%; /* Pełna szerokość na małych ekranach */
    margin: 10px 0;
  }

  .dashboard-lists {
    flex-direction: column;
  }
}
</style>


