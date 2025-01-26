<template>
    <div class="add-income-form">
      <h2>Dodaj wpływ</h2>
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
            Powtarzający się wpływ
          </label>
        </div>
  
        <button type="submit" class="submit-button">Dodaj wpływ</button>
      </form>
    </div>
  </template>
  
  <script>
  import { addTransaction } from "@/api/api"; // Funkcja do wysyłania żądania POST
  import { fetchCategories } from "@/api/api"; // Funkcja do pobrania kategorii
  import { jwtDecode } from "jwt-decode";


  
  export default {
    name: "AddIncomeForm",
    data() {
      return {
        form: {
          amount: "",
          categoryId: "",
          description: "",
          isRecurring: false,
          date: new Date().toISOString().split("T")[0], // Domyślnie dzisiejsza data
        },
        categories: [], // Kategorie dla wyboru
      };
    },
    async created() {
      try {
        this.categories = await fetchCategories();
      } catch (error) {
        console.error("Nie udało się pobrać kategorii:", error.message);
      }
    },
    methods: {
        async submitForm() {
  try {
    console.log(typeof jwtDecode); // powinno wyświetlić "function"
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
      description: this.form.description,
      isRecurring: this.form.isRecurring,
      type: "Income",
      date: this.form.date,
    };

    const response = await addTransaction(payload);
    console.log("Dodano transakcję:", response);
    this.$router.push("/dashboard"); // Przekierowanie po sukcesie
  } catch (error) {
    console.error("Wystąpił błąd:", error.message);
    this.errorMessage = error.message || "Wystąpił błąd. Spróbuj ponownie później.";
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
  