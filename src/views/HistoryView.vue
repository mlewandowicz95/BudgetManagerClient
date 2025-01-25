<template>
    <div class="filters">
      <select v-model="filters.type">
        <option value="">Wszystkie typy</option>
        <option value="income">Przychody</option>
        <option value="expense">Wydatki</option>
      </select>
  
      <select v-model="filters.categoryId" v-if="categories.length > 0">
  <option value="">Wszystkie kategorie</option>
  <option v-for="category in categories" :key="category.id" :value="category.id">
    {{ category.name }}
  </option>
</select>
<div v-else>Ładowanie kategorii</div>

      <input 
        type="date"
        v-model="filters.startDate"
        placeholder="Początek zakresu dat"
      />
  
      <input 
        type="date"
        v-model="filters.endDate"
        placeholder="Koniec zakresu dat"
      />
  
      <input
        type="text"
        v-model="filters.description"
        placeholder="Szukaj w opisie"
      />
  
      <button @click="fetchFilteredTransactions">Filtruj</button>
    </div>
  
    <div class="transaction-list">
      <h3>Transakcje</h3>
      <div v-if="loading">Ładowanie danych...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <table class="transaction-table">
          <thead>
            <tr>
              <th>Typ</th>
              <th>Data</th>
              <th>Opis</th>
              <th>Kategoria</th>
              <th>Kwota</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in transactions" :key="transaction.id">
              <td>{{ getTransactionTypeLabel(transaction.type) }}</td>
              <td>{{ formatDate(transaction.date) }}</td>
              <td>{{ transaction.description }}</td>
              <td>{{ transaction.categoryName }}</td>
              <td :class="{'income': transaction.type === 'Income', 'expense': transaction.type === 'Expense'}">
                {{ formatCurrency(transaction.amount) }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination" v-if="totalPages > 0">
          <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">Poprzednia</button>
          <span>Strona {{ currentPage }} z {{ totalPages }}</span>
          <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">Następna</button>
        </div>
        <div v-else>Brak transakcji spełniających podane kryteria.</div>
      </div>
    </div>
  </template>
  
  
  <script>
  import { getAllTransaction } from "@/api/api";
  import { getCategories } from "@/api/categoryApi";

  
  export default {
    data() {
      return {
        transactions: [],
        categories: [],
        currentPage: 1,
        totalPages: 0,
        loading: true,
        error: null,
        filters: {
          type: "",
          categoryId: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      };
    },

    async created() {
      try {
        await Promise.all([this.fetchCategories(), this.fetchFilteredTransactions()]);
      } catch (error) {
        this.error = "Wystąpił błąd podczas inicjalizacji danych.";
      } finally {
        this.loading = false;
      }
    },

    methods: {
      getTransactionTypeLabel(type) {
        const typeLabels = {
          Income: "Przychód",
          Expense: "Wydatek",
        };
        return typeLabels[type] || "Nieznany typ";
      },

      async fetchCategories() {
  try {
    const response = await getCategories();  // Zmieniona funkcja
    this.categories = response.items;  // Przypisanie do 'items'
    console.log("Fetched categories:", this.categories);
  } catch (error) {
    this.error = error.message || "Wystąpił błąd podczas pobierania kategorii.";
    console.error("Error:", error);
  }
},


    async fetchFilteredTransactions() {
      this.loading = true;
      this.error = null;
      try {
        const typeMapping = {
          income: "Income",
          expense: "Expense",
        };
        const params = {
          ...this.filters,
          type: this.filters.type ? typeMapping[this.filters.type] : null,
          page: this.currentPage,
          pageSize: 10,
          startDate: this.filters.startDate || null,
          endDate: this.filters.endDate || null,
        };

        const response = await getAllTransaction(params);

        // Zaktualizowana logika obsługi odpowiedzi
        this.transactions = response.items || []; // Teraz oczekujemy `items` z funkcji
        this.totalPages = response.totalPages || 0;

        if (!response.items) {
          console.warn("Oczekiwano tablicy transakcji, ale otrzymano:", response);
        }
      } catch (error) {
        this.error = "Wystąpił błąd podczas pobierania transakcji.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },


      formatDate(date) {
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Date(date).toLocaleDateString("pl-PL", options);
      },

      formatCurrency(value) {
        return new Intl.NumberFormat("pl-PL", {
          style: "currency",
          currency: "PLN",
        }).format(value);
      },

      async changePage(newPage) {
        this.currentPage = newPage;
        await this.fetchFilteredTransactions();
      },
      
    },
  };
  </script>
  
  <style scoped>

.filters {
    width: 100%;

}

input {
    margin: 20px;
    
}

  .transaction-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .transaction-table th,
  .transaction-table td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  .transaction-table th {
    background-color: #f4f4f4;
    font-weight: bold;
  }
  
  .transaction-table .income {
    color: green;
  }
  
  .transaction-table .expense {
    color: red;
  }
  
  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  .pagination button {
    padding: 5px 10px;
    font-size: 16px;
  }
  
  .pagination span {
    line-height: 32px;
  }
  </style>
  