<template>
    <div class="add-expense-form">
      <h2>Dodaj Wydatek</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="amount">Kwota</label>
          <input
            type="number"
            id="amount"
            v-model="form.amount"
            placeholder="Wprowadź kwotę"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="category">Kategoria</label>
          <select id="category" v-model="form.categoryId" required>
            <option value="" disabled>Wybierz kategorię</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="goal">Cel (opcjonalnie)</label>
          <select id="goal" v-model="form.goalId">
            <option value="">-- Wybierz cel --</option>
            <option
              v-for="goal in goals"
              :key="goal.id"
              :value="goal.id"
            >
              {{ goal.name }} ({{ formatCurrency(goal.targetAmount - goal.currentProgress) }} do osiągnięcia)
            </option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="description">Opis</label>
          <textarea
            id="description"
            v-model="form.description"
            placeholder="Dodaj opis (opcjonalnie)"
          ></textarea>
        </div>
  
        <div class="form-group">
          <label for="date">Data</label>
          <input type="date" id="date" v-model="form.date" required />
        </div>
  
        <div class="form-group">
          <label>
            <input type="checkbox" v-model="form.isRecurring" />
            Powtarzający się wydatek
          </label>
        </div>
  
        <button type="submit" class="submit-button">Dodaj Wydatek</button>
      </form>
    </div>
  </template>
  

  <script>
  import { addTransaction, fetchCategories, fetchGoals } from "@/api/api"; // Funkcje API
  import { jwtDecode } from "jwt-decode";
  
  export default {
    name: "AddExpenseForm",
    data() {
      return {
        form: {
          amount: "",
          categoryId: "",
          goalId: null, // Pole dla celu
          description: "",
          isRecurring: false,
          date: new Date().toISOString().split("T")[0], // Domyślnie dzisiejsza data
        },
        categories: [], // Kategorie dla wyboru
        goals: [], // Lista celów
      };
    },
    async created() {
      try {
        this.categories = await fetchCategories(); // Pobierz kategorie
        this.goals = await fetchGoals(); // Pobierz cele
      } catch (error) {
        console.error("Nie udało się pobrać danych:", error.message);
      }
    },
    methods: {
      formatCurrency(amount) {
        return parseFloat(amount).toLocaleString("pl-PL", {
          style: "currency",
          currency: "PLN",
        });
      },
      async submitForm() {
        try {
          const token = localStorage.getItem("jwtToken");
          if (!token) {
            throw new Error("Nie znaleziono tokenu JWT.");
          }
          const decodedToken = jwtDecode(token);
          const userId = parseInt(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
  
          const payload = {
            userId: userId,
            amount: parseFloat(this.form.amount),
            categoryId: parseInt(this.form.categoryId),
            goalId: this.form.goalId ? parseInt(this.form.goalId) : null, // Dodanie celu (jeśli wybrano)
            description: this.form.description,
            isRecurring: this.form.isRecurring,
            type: "Expense", // Typ ustawiony na "Expense"
            date: this.form.date,
          };
  
          const response = await addTransaction(payload);
          console.log("Dodano wydatek:", response);
          this.$router.push("/dashboard"); // Przekierowanie po sukcesie
        } catch (error) {
          console.error("Wystąpił błąd:", error.message);
        }
      },
    },
  };
  </script>

<style scoped>
.add-expense-form {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
select,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background: #f44336; /* Czerwony */
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background: #d32f2f;
}
</style>
  