<template>
    <div class="budget-forecast">
      <h3>Prognoza budżetu</h3>
      <div class="forecast-details">
        <div class="forecast-item">
          <i class="fas fa-arrow-up income-icon"></i>
          <div>
            <p><strong>Przewidywane przychody:</strong></p>
            <p class="value">{{ formatCurrency(forecast.predicatedIncome) }}</p>
          </div>
        </div>
        <div class="forecast-item">
          <i class="fas fa-arrow-down expense-icon"></i>
          <div>
            <p><strong>Przewidywane wydatki:</strong></p>
            <p class="value">{{ formatCurrency(forecast.predicatedExpenses) }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { getBudgetForecast } from "@/api/api";
  
  export default {
    name: "BudgetForecast",
    data() {
      return {
        forecast: {
          predicatedIncome: 0,
          predicatedExpenses: 0,
        },
      };
    },
    async created() {
      try {
        const data = await getBudgetForecast();
       // console.log("Odpowiedź API w BudgetForecast:", data);
  
        this.forecast = {
          predicatedIncome: data.predicatedIncome || 0,
          predicatedExpenses: data.predicatedExpenses || 0,
        };
      } catch (error) {
        console.error("Wystąpił błąd podczas pobierania prognozy budżetu:", error.message);
      }
    },
    methods: {
      formatCurrency(amount) {
        const numericAmount = parseFloat(amount) || 0;
        return numericAmount.toLocaleString("pl-PL", {
          style: "currency",
          currency: "PLN",
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .budget-forecast {
    margin-top: 20px;
    padding: 20px;
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .budget-forecast h3 {
    margin-bottom: 15px;
    text-align: center;
    color: #333;
    font-size: 20px;
  }
  
  .forecast-details {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
  
  .forecast-item {
    display: flex;
    align-items: center;
    gap: 15px;
    background: #fff;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid #ddd;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    flex: 1;
  }
  
  .forecast-item i {
    font-size: 24px;
  }
  
  .income-icon {
    color: #4caf50; /* Zielony */
  }
  
  .expense-icon {
    color: #f44336; /* Czerwony */
  }
  
  .forecast-item .value {
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }
  
  .forecast-item p {
    margin: 0;
    font-size: 14px;
  }
  </style>
  