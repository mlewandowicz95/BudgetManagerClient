<template>
    <div class="reset-password-container">
      <div class="content">
        <h1>Reset hasła</h1>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
        <p v-else-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-else class="loading-message">Trwa przetwarzanie...</p>
  
        <!-- Formularz zmiany hasła -->
        <form v-if="showForm && !successMessage" @submit.prevent="submitNewPassword">
          <div class="form-group">
            <label for="newPassword">Nowe hasło</label>
            <input
              id="newPassword"
              type="password"
              v-model="newPassword"
              placeholder="Wprowadź nowe hasło"
              required
            />
          </div>
          <button type="submit" class="submit-button">Zresetuj hasło</button>
        </form>
  
        <!-- Przycisk powrotu -->
        <router-link v-if="successMessage || errorMessage" to="/" class="redirect-link">
          Powrót do strony głównej
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  import { resetPassword } from "@/api/api";
  
  export default {
    name: "ResetPasswordView",
    props: ["token"],
    data() {
      return {
        newPassword: "",
        successMessage: "",
        errorMessage: "",
        showForm: true,
      };
    },
    async created() {
      try {
        if (!this.token) {
          throw new Error("Brak tokenu do resetu hasła.");
        }
        // Jeśli token jest prawidłowy, pokazujemy formularz
        console.log("Token do resetu hasła:", this.token);
      } catch (error) {
        console.error("Błąd resetu hasła:", error);
        this.errorMessage =
          error.response?.data?.message || "Nie udało się rozpocząć resetu hasła.";
        this.showForm = false; // Ukryj formularz, jeśli token jest nieprawidłowy
      }
    },
    methods: {
      async submitNewPassword() {
        try {
          if (!this.newPassword) {
            this.errorMessage = "Proszę wprowadzić nowe hasło.";
            return;
          }
          const response = await resetPassword({
            token: this.token,
            newPassword: this.newPassword,
          });
          console.log("Odpowiedź resetu hasła:", response);
          this.successMessage = "Hasło zostało pomyślnie zresetowane.";
          this.showForm = false; // Ukryj formularz po sukcesie
        } catch (error) {
          console.error("Błąd resetu hasła:", error);
          this.errorMessage =
            error.response?.data?.message || "Nie udało się zresetować hasła.";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .reset-password-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f9f9f9;
    padding: 20px;
  }
  
  .content {
    max-width: 500px;
    width: 100%;
    padding: 20px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .loading-message {
    font-size: 18px;
    color: #555;
  }
  
  .success-message {
    font-size: 18px;
    color: #4caf50;
  }
  
  .error-message {
    font-size: 18px;
    color: #f44336;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
  }
  
  button {
    padding: 10px 20px;
    background-color: #004aad;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #00368f;
  }
  
  .redirect-link {
    display: inline-block;
    margin-top: 20px;
    color: #2196f3;
    text-decoration: none;
    font-weight: bold;
  }
  
  .redirect-link:hover {
    text-decoration: underline;
  }
  </style>
  