<template>
  <div class="dashboard-container">
    <div class="add-goal-section">
      <button @click="navigateTo('/add-income')" class="add-goal-button income-button">Dodaj wpływ</button>
      <button @click="navigateTo('/add-expense')" class="add-goal-button expense-button">Dodaj wydatek</button>
      <button @click="navigateTo('/add-goal')" class="add-goal-button goal-button">Dodaj cel</button>
      <button v-if="!isUser" @click="navigateTo('/add-budget')" class="add-goal-button goal-button">Dodaj miesięczny budżet</button>
    </div>

    <div class="dashboard-summary">
      <SummaryItem title="Wydatki" :value="dashboardData.totalExpenses" color="red" />
      <SummaryItem title="Wpływy" :value="dashboardData.totalIncome" color="green" />
      <SummaryItem title="Bilans" :value="balance" color="#333" />
      <SummaryItem title="Okres" :value="currentMonth" />
    </div>

    <div class="dashboard-lists">
      <TransactionList
        :transactions="dashboardData.recentTransactions"
        @deleteTransaction="handleDeleteTransaction"
      />
      <SavingGoalsList :goals="dashboardData.savingGoals" @deleteGoal="handleDeleteGoal" />
    </div>

    <div class="charts-container">
      <BalancePerMonth />
      <ExpensesByCategoryChart />
      <MonthlyTrendsChart />
    </div>

    <FinancialIndicators />
    <BudgetForecast />
  </div>
</template>

<script>
import { fetchDashboardData, deleteTransaction, deleteGoal } from "@/api/api"; // Import funkcji API
import { useUserStore } from "@/stores/userStore";  // 👈 Import Pinia
import { computed } from "vue"; // Import computed
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
    MonthlyTrendsChart,
  },
  setup() {
    const userStore = useUserStore();  // 👈 Pobranie store użytkownika
    const isUser = computed(() => userStore.isUser);  // 👈 Sprawdzenie roli

    return { isUser };  // 👈 Eksportujemy do template
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
      console.log("Dane z API (cele oszczędnościowe):", response.savingGoals);
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
    async handleDeleteGoal(goalId) {
      try {
        console.log("Usuwam w dashboard..");
        await deleteGoal(goalId);
        this.dashboardData.savingGoals = this.dashboardData.savingGoals.filter(goal => goal.id !== goalId);
        alert("Cel został pomyślnie usunięty.");
      } catch (error) {
        console.error("Błąd podczas usuwania celu:", error.message);
        alert("Nie udało się usunąć celu. Spróbuj ponownie później.");
      }
    },
    async handleDeleteTransaction(transactionId) {
      try {
        await deleteTransaction(transactionId);
        this.dashboardData.recentTransactions = this.dashboardData.recentTransactions.filter(
          (transaction) => transaction.id !== transactionId
        );
        alert("Transakcja została pomyślnie usunięta.");
      } catch (error) {
        console.error("Błąd podczas usuwania transakcji:", error.message);
        alert("Nie udało się usunąć transakcji. Spróbuj ponownie później.");
      }
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
  background: linear-gradient(to bottom, #ffffff, #f9f9f9);
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease; /* Animacja dla efektu hover */
}

.summary-item:hover {
  transform: translateY(-5px); /* Efekt uniesienia */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.charts-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Minimum 300px szerokości */
  gap: 20px; /* Przestrzeń między wykresami */
  margin-top: 20px;
}

.charts-container > * {
  padding: 20px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 400px; /* Ograniczenie wysokości */
  overflow: hidden; /* Zapobiega niekontrolowanemu przewijaniu */
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


