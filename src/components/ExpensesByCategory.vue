<template>
    <div class="expenses-by-category">
      <h3>Wydatki według kategorii</h3>
      <ul v-if="categories.length > 0">
        <li v-for="(category, index) in categories" :key="index">
          <div class="category-details">
            <span class="category-name">{{ category.category }}</span>
            <span class="category-amount">{{ formatCurrency(category.totalAmount) }}</span>
          </div>
        </li>
      </ul>
      <p v-else>Brak wydatków w kategoriach.</p>
    </div>
  </template>
  
  <script>
  import { getExpensesByCategory } from "@/api/api";
  
  export default {
    name: "ExpensesByCategory",
    data() {
      return {
        categories: [], // Lista wydatków według kategorii
      };
    },
    async created() {
      try {
        const categories = await getExpensesByCategory(); // Pobieramy już przetworzone dane
      //  console.log("Pobrane kategorie:", categories);
        this.categories = categories || []; // Przypisujemy dane lub pustą tablicę
      } catch (error) {
        console.error("Wystąpił błąd podczas pobierania wydatków według kategorii:", error.message);
      }
    },
    methods: {
      formatCurrency(amount) {
        return parseFloat(amount).toLocaleString("pl-PL", {
          style: "currency",
          currency: "PLN",
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .expenses-by-category {
    margin-top: 20px;
  }
  
  .expenses-by-category ul {
    list-style: none;
    padding: 0;
  }
  
  .expenses-by-category li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 10px;
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  .category-details {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  
  .category-name {
    font-weight: bold;
  }
  
  .category-amount {
    font-weight: bold;
    color: #f44336; /* Czerwony dla wydatków */
  }
  </style>
  