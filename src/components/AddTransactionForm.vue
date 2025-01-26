<template>
    <div class="add-transaction-form">
      <h3>Dodaj Transakcję</h3>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="amount">Kwota:</label>
          <input
            type="number"
            id="amount"
            v-model="form.amount"
            required
            placeholder="Podaj kwotę"
          />
        </div>
  
        <div class="form-group">
          <label for="type">Typ:</label>
          <select id="type" v-model="form.type" required>
            <option value="Income">Wpływ</option>
            <option value="Expense">Wydatek</option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="category">Kategoria:</label>
          <select id="category" v-model="form.categoryId" required>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
  
        <div class="form-group" v-if="form.type === 'Expense'">
          <label for="goal">Cel (opcjonalny):</label>
          <select id="goal" v-model="form.goalId">
            <option v-for="goal in goals" :key="goal.id" :value="goal.id">
              {{ goal.name }}
            </option>
            <option :value="null">Brak</option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="description">Opis:</label>
          <textarea
            id="description"
            v-model="form.description"
            placeholder="Dodaj opis"
          ></textarea>
        </div>
  
        <div class="form-group">
          <label for="date">Data:</label>
          <input type="date" id="date" v-model="form.date" required />
        </div>
  
        <div class="form-group">
          <label for="isRecurring">Czy cykliczna?</label>
          <input
            type="checkbox"
            id="isRecurring"
            v-model="form.isRecurring"
          />
        </div>
  
        <button type="submit" class="submit-button">Dodaj Transakcję</button>
      </form>
    </div>
  </template>
  
  <script>
  import { postTransaction } from "@/api/api";
  
  export default {
    name: "AddTransactionForm",
    props: {
      categories: {
        type: Array,
        required: true,
      },
      goals: {
        type: Array,
        required: false,
        default: () => [],
      },
    },
    data() {
      return {
        form: {
          userId: 0, // ID użytkownika można automatycznie ustawić na podstawie autoryzacji
          amount: "",
          type: "Expense",
          categoryId: null,
          goalId: null,
          description: "",
          isRecurring: false,
          date: new Date().toISOString().split("T")[0],
        },
      };
    },
    methods: {
      async submitForm() {
        try {
          this.form.userId = this.getUserId(); // Uzupełnij userId
          const response = await postTransaction(this.form);
          console.log("Transakcja została dodana:", response);
          this.$emit("transactionAdded", response); // Event po pomyślnym dodaniu transakcji
        } catch (error) {
          console.error("Błąd podczas dodawania transakcji:", error.message);
        }
      },
      getUserId() {
        // Pobierz userId z localStorage lub globalnego stanu aplikacji
        return parseInt(localStorage.getItem("userId"), 10);
      },
    },
  };
  </script>
  
  <style scoped>
  .add-transaction-form {
    padding: 20px;
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
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
  select,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .submit-button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .submit-button:hover {
    background-color: #45a049;
  }
  </style>
  