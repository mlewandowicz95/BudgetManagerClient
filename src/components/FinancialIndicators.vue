<template>
  <div class="financial-indicators">
    <h3>Wskaźniki finansowe</h3>
    <ul>
      <li>
        <strong><i class="fas fa-piggy-bank"></i> Procent oszczędności:</strong>
        <span :class="getIndicatorClass(indicators.savingsPercentage)">
          {{ indicators.savingsPercentage.toFixed(2) }}%
        </span>
      </li>
      <li>
        <strong><i class="fas fa-percentage"></i> Stosunek wydatków do przychodów:</strong>
        <span :class="getIndicatorClass(indicators.expensesToIncomeRatio, false)">
          {{ indicators.expensesToIncomeRatio.toFixed(2) }}%
        </span>
      </li>
      <li>
        <strong><i class="fas fa-wallet"></i> Średnie miesięczne wydatki:</strong>
        <span>{{ formatCurrency(indicators.averageMonthlyExpenses) }}</span>
      </li>
      <li>
        <strong><i class="fas fa-money-bill-wave"></i> Średnie miesięczne przychody:</strong>
        <span>{{ formatCurrency(indicators.averageMonthlyIncome) }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { getFinancialIndicators } from "@/api/api";

export default {
  name: "FinancialIndicators",
  data() {
    return {
      indicators: {
        savingsPercentage: 0,
        expensesToIncomeRatio: 0,
        averageMonthlyExpenses: 0,
        averageMonthlyIncome: 0,
      },
    };
  },
  async created() {
    try {
      const data = await getFinancialIndicators();
      this.indicators = data;
    } catch (error) {
      console.error(
        "Wystąpił błąd podczas pobierania wskaźników finansowych:",
        error.message
      );
    }
  },
  methods: {
    formatCurrency(amount) {
      return parseFloat(amount).toLocaleString("pl-PL", {
        style: "currency",
        currency: "PLN",
      });
    },
    getIndicatorClass(value, positive = true) {
      return positive
        ? value > 50
          ? "positive"
          : "neutral"
        : value > 50
        ? "negative"
        : "neutral";
    },
  },
};
</script>

<style scoped>
.financial-indicators {
  margin-top: 20px;
  padding: 15px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.financial-indicators h3 {
  margin-bottom: 15px;
  text-align: center;
}

.financial-indicators ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.financial-indicators li {
  flex: 1 1 calc(50% - 20px);
  margin-bottom: 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.financial-indicators li strong {
  margin-right: 5px;
}

.financial-indicators .positive {
  color: #4caf50; /* Zielony */
  font-weight: bold;
}

.financial-indicators .neutral {
  color: #ffc107; /* Żółty */
  font-weight: bold;
}

.financial-indicators .negative {
  color: #f44336; /* Czerwony */
  font-weight: bold;
}

.financial-indicators i {
  margin-right: 8px;
  font-size: 16px;
  color: #2196f3;
}
</style>
