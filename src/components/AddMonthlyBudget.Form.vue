<template>
    <div class="add-budget-form">
      <h2>Dodaj miesięczny budżet</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="categoryId">Kategoria</label>
          <select v-model="form.categoryId" id="categoryId" required>
            <option value="" disabled>Wybierz kategorię</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="amount">Kwota</label>
          <input
            type="number"
            id="amount"
            v-model.number="form.amount"
            placeholder="Wprowadź kwotę"
            required
          />
        </div>
        <div class="form-actions">
          <button type="submit">Dodaj budżet</button>
          <button type="button" @click="resetForm">Wyczyść</button>
        </div>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import { useUserStore } from "@/stores/userStore";
  import { addMonthlyBudget, fetchCategories } from "@/api/api";
  
  export default {
    name: "AddMonthlyBudgetForm",
    data() {
      return {
        form: {
          categoryId: "",
          amount: "",
        },
        categories: [],
        errorMessage: "",
      };
    },
    computed: {
      userId() {
        const userStore = useUserStore();
        return userStore.user?.id || null;
      },
    },
    async created() {
        try {

        this.categories = await fetchCategories(); // Pobierz kategorie
      } catch (error) {
        console.error("Nie udało się pobrać danych:", error.message);
      }
    },
    methods: {
      async submitForm() {
        if (!this.userId) {
          this.errorMessage = "Nie można dodać budżetu – brak użytkownika.";
          return;
        }
  
        try {
          const payload = {
            userId: this.userId,
            categoryId: parseInt(this.form.categoryId),
            amount: parseFloat(this.form.amount),
          };
  
          const response = await addMonthlyBudget(payload);
          console.log("Dodano miesięczny budżet:", response);
          this.resetForm();
          this.$router.push("/dashboard"); // Przekierowanie po sukcesie
        } catch (error) {
          console.error("Wystąpił błąd:", error);
          this.errorMessage =
            error.response?.data?.message || "Nie udało się dodać budżetu.";
        }
      },
      resetForm() {
        this.form = {
          categoryId: "",
          amount: "",
        };
        this.errorMessage = "";
      },
    },
  };
  </script>
  
  <style scoped>
  .add-budget-form {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input,
  select {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  input:focus,
  select:focus {
    outline: none;
    border-color: #4caf50;
  }
  
  .form-actions {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
  
  button {
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: #4caf50;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  button[type="button"] {
    background-color: #f44336;
  }
  
  button[type="button"]:hover {
    background-color: #d32f2f;
  }
  
  .error-message {
    color: red;
    font-weight: bold;
    margin-top: 10px;
  }
  </style>
  