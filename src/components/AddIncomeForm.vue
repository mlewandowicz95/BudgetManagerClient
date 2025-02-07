<template>
  <div class="add-income-form">
    <h2>{{ isEditing ? "Edytuj Wpływ" : "Dodaj Wpływ" }}</h2>
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
          Powtarzający się wpływ
        </label>
      </div>

      <button type="submit" class="submit-button">{{ isEditing ? "Zapisz zmiany" : "Dodaj Wpływ" }}</button>
    </form>
  </div>
</template>

<script>
import { fetchCategories, getTransactionById, addTransaction, updateTransaction } from "@/api/api";
import { useUserStore } from "@/stores/userStore";

export default {
  name: "AddIncomeForm",
  data() {
    return {
      form: {
        amount: "",
        categoryId: "",
        description: "",
        isRecurring: false,
        date: new Date().toISOString().split("T")[0],
      },
      categories: [],
      userStore: useUserStore(),
      isEditing: false, // <-- DODANE
    };
  },
  async created() {
    try {
      this.categories = await fetchCategories();

      if (this.$route.params.id) {
        this.isEditing = true; // <-- Ustawiamy tryb edycji
        console.log("Pobieram transakcję dla ID:", this.$route.params.id);
        const response = await getTransactionById(this.$route.params.id);

        console.log("Dane transakcji:", response);

        // Konwersja daty do YYYY-MM-DD dla <input type="date">
        if (response.date) {
          response.date = response.date.split("T")[0];
        }

        this.form = { ...response };
      }
    } catch (error) {
      console.error("Błąd pobierania danych:", error);
    }
  },
  methods: {
    async submitForm() {
      try {
        const payload = {
          userId: this.userStore.user.id,
          amount: parseFloat(this.form.amount),
          categoryId: parseInt(this.form.categoryId),
          description: this.form.description,
          isRecurring: this.form.isRecurring,
          type: "Income",
          date: this.form.date,
        };

        if (this.isEditing) {
          await updateTransaction(this.$route.params.id, payload);
          console.log("Wpływ zaktualizowany!");
        } else {
          await addTransaction(payload);
          console.log("Nowy wpływ dodany!");
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
  .add-income-form {
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
    background: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }
  
  button:hover {
    background: #45a049;
  }
  </style>
  