<template>
  <div class="add-expense-form">
    <h2>{{ isEditing ? "Edytuj Wydatek" : "Dodaj Wydatek" }}</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="amount">Kwota</label>
        <input type="number" id="amount" v-model="form.amount" placeholder="Wprowadź kwotę" required />
      </div>

      <div class="form-group">
        <label for="category">Kategoria</label>
        <select id="category" v-model="form.categoryId" required>
          <option value="" disabled>Wybierz kategorię</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="goal">Cel (opcjonalnie)</label>
        <select id="goal" v-model="form.goalId">
          <option value="">-- Wybierz cel --</option>
          <option v-for="goal in goals" :key="goal.id" :value="goal.id">
            {{ goal.name }} ({{ formatCurrency(goal.targetAmount - goal.currentProgress) }} do osiągnięcia)
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="description">Opis</label>
        <textarea id="description" v-model="form.description" placeholder="Dodaj opis (opcjonalnie)"></textarea>
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

      <button type="submit" class="submit-button">{{ isEditing ? "Zapisz zmiany" : "Dodaj Wydatek" }}</button>
    </form>
  </div>
</template>

<script>
import { fetchCategories, fetchGoals, getTransactionById, addTransaction, updateTransaction } from "@/api/api";
import { useUserStore } from "@/stores/userStore";

export default {
  name: "AddExpenseForm",
  data() {
    return {
      form: {
        amount: "",
        categoryId: "",
        goalId: null,
        description: "",
        isRecurring: false,
        date: new Date().toISOString().split("T")[0],
      },
      categories: [],
      goals: [],
      userStore: useUserStore(),
    };
  },
  computed: {
    isEditing() {
      return !!this.$route.params.id;
    },
  },
  async created() {
  try {
    this.categories = await fetchCategories();
    this.goals = await fetchGoals();

    if (this.isEditing) {
      const response = await getTransactionById(this.$route.params.id);

      // Konwersja daty do "YYYY-MM-DD" dla input[type="date"]
      if (response.date) {
        response.date = response.date.split("T")[0]; // Usuwa czas, zostawia tylko "YYYY-MM-DD"
      }

      this.form = { ...response };
      console.log("Data po konwersji:", this.form.date);
    }
  } catch (error) {
    console.error("Błąd pobierania danych:", error);
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
        const payload = {
          userId: this.userStore.user.id, // Pobieramy ID użytkownika z Pinia
          amount: parseFloat(this.form.amount),
          categoryId: parseInt(this.form.categoryId),
          goalId: this.form.goalId ? parseInt(this.form.goalId) : null,
          description: this.form.description,
          isRecurring: this.form.isRecurring,
          type: "Expense",
          date: this.form.date,
        };

        if (this.isEditing) {
          await updateTransaction(this.$route.params.id, payload);
          console.log("Transakcja zaktualizowana!");
        } else {
          await addTransaction(payload);
          console.log("Nowa transakcja dodana!");
        }

        this.$router.push("/dashboard");
      } catch (error) {
        console.error("Błąd operacji:", error.message);
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
  