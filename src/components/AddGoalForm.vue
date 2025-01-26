<template>
    <div class="add-goal-form">
      <h2>Dodaj cel</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Nazwa celu</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            placeholder="Wprowadź nazwę celu"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="targetAmount">Docelowa kwota</label>
          <input
            type="number"
            id="targetAmount"
            v-model="form.targetAmount"
            placeholder="Wprowadź docelową kwotę"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="currentProgress">Obecny postęp</label>
          <input
            type="number"
            id="currentProgress"
            v-model="form.currentProgress"
            placeholder="Wprowadź obecny postęp (opcjonalnie)"
          />
        </div>
  
        <div class="form-group">
          <label for="dueDate">Termin realizacji</label>
          <input
            type="date"
            id="dueDate"
            v-model="form.dueDate"
            placeholder="Wybierz termin realizacji (opcjonalnie)"
          />
        </div>
  
        <button type="submit" class="submit-button">Dodaj cel</button>
        <!-- Wyświetlanie błędów -->
        <p v-if="goalError" class="error-message">{{ goalError }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import { addGoal } from "@/api/api";
  import { ErrorCodes } from "@/constants/errorCodes";
  import { jwtDecode } from "jwt-decode";
  
  export default {
    name: "AddGoalForm",
    data() {
      return {
        form: {
          name: "",
          targetAmount: "",
          currentProgress: 0, // Domyślnie zero
          dueDate: null, // Opcjonalne pole
        },
        goalError: "", // Przechowywanie błędów
      };
    },
    methods: {
      async submitForm() {
        try {
          this.goalError = ""; // Resetowanie błędów przed wysłaniem
          const token = localStorage.getItem("jwtToken");
          if (!token) {
            throw new Error("Nie znaleziono tokenu JWT.");
          }
  
          const decodedToken = jwtDecode(token);
          const userId = parseInt(
            decodedToken[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ]
          );
  
          const payload = {
            userId: userId,
            name: this.form.name,
            targetAmount: parseFloat(this.form.targetAmount),
            currentProgress: parseFloat(this.form.currentProgress) || 0,
            dueDate: this.form.dueDate || null,
          };
  
          const response = await addGoal(payload);
          console.log("Dodano cel:", response);
  
          // Przekierowanie po sukcesie
          this.$router.push("/dashboard");
        } catch (error) {
          switch (error.errorCode) {
      case ErrorCodes.UserNotFound:
        this.resetError = "Nie znaleziono użytkownika o podanym adresie e-mail.";
        break;
      case ErrorCodes.ValidationError:
        this.resetError = "Wystąpił błąd walidacji. Sprawdź poprawność danych.";
        break;
      case ErrorCodes.InternalServerError:
        this.resetError = "Wystąpił błąd serwera. Spróbuj ponownie później.";
        break;
      default:
        this.resetError = error.message || "Wystąpił nieoczekiwany błąd.";
    }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .add-goal-form {
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
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background: #2196f3;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }
  
  button:hover {
    background: #1976d2;
  }
  
  .error-message {
    color: #f44336;
    margin-top: 15px;
    font-weight: bold;
    text-align: center;
  }
  </style>
  