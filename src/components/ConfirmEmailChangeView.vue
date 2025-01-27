<template>
  <div class="confirm-email-change-container">
    <div class="content">
      <h1>Potwierdzenie zmiany e-maila</h1>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <p v-else-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-else class="loading-message">Trwa przetwarzanie...</p>
      <router-link v-if="successMessage || errorMessage" to="/" class="redirect-link">
        Powrót do strony głównej
      </router-link>
    </div>
  </div>
</template>

<script>
import { getConfirmEmailChange } from "@/api/api";

export default {
  name: "ConfirmEmailChangeView",
  props: ["token"],
  data() {
    return {
      successMessage: "",
      errorMessage: "",
    };
  },
  async created() {
  try {
    if (!this.token) {
      throw new Error("Brak tokenu do potwierdzenia zmiany e-maila.");
    }

    const response = await getConfirmEmailChange(this.token);
    console.log("Response z API w widoku: ", response);
    if (response) {
      this.successMessage = "E-mail został pomyślnie zmieniony.";
    } else {
      throw new Error("Nie udało się potwierdzić zmiany e-maila.");
    }
  } catch (error) {
    console.error("Błąd potwierdzenia zmiany e-maila:", error);
    this.errorMessage =
      error.response?.data?.message || "Nie udało się potwierdzić zmiany e-maila.";
  }
},
};
</script>

<style scoped>
.confirm-email-change-container {
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

.redirect-link {
  display: inline-block;
  margin-top: 10px;
  color: #2196f3;
  text-decoration: none;
  font-weight: bold;
}

.redirect-link:hover {
  text-decoration: underline;
}
</style>
