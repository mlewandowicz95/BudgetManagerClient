<template>
  <div class="add-goal-form">
    <h2>{{ isEditing ? "Edytuj Cel" : "Dodaj Cel" }}</h2>
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

      <button type="submit" class="submit-button">{{ isEditing ? "Zapisz zmiany" : "Dodaj cel" }}</button>
      <p v-if="goalError" class="error-message">{{ goalError }}</p>
    </form>
  </div>
</template>

<script>
import { addGoal, fetchGoalById, updateGoal, } from "@/api/api"; // Funkcja do edycji celu
import { ErrorCodes } from "@/constants/errorCodes";
import { useUserStore } from "@/stores/userStore";

export default {
  name: "AddGoalForm",
  data() {
    return {
      form: {
        name: "",
        targetAmount: "",
        currentProgress: 0, 
        dueDate: null, 
      },
      isEditing: false, // Nowa zmienna do sprawdzania trybu edycji
      goalError: "", 
    };
  },
  async created() {
    if (this.$route.params.id) {
      this.isEditing = true;
      const goalId = this.$route.params.id;

      try {
        const response = await fetchGoalById(goalId);
        this.form = {
          name: response.name,
          targetAmount: response.targetAmount,
          currentProgress: response.currentProgress,
          dueDate: response.dueDate ? response.dueDate.split("T")[0] : null, // ✅ KONWERSJA DATY
        };
      } catch (error) {
        console.error("Błąd podczas pobierania celu:", error);
      }
    }
  },
  methods: {
    async submitForm() {
      try {
        this.goalError = ""; 
        const userStore = useUserStore();

        const payload = {
          userId: userStore.user.id, 
          name: this.form.name,
          targetAmount: parseFloat(this.form.targetAmount),
          currentProgress: parseFloat(this.form.currentProgress) || 0,
          dueDate: this.form.dueDate || null,
        };

        let response;
        if (this.isEditing) {
          response = await updateGoal(this.$route.params.id, payload);
          console.log("Edytowano cel:", response);
        } else {
          response = await addGoal(payload);
          console.log("Dodano cel:", response);
        }

        this.$router.push("/dashboard");
      } catch (error) {
        switch (error.errorCode) {
          case ErrorCodes.UserNotFound:
            this.goalError = "Nie znaleziono użytkownika o podanym adresie e-mail.";
            break;
          case ErrorCodes.ValidationError:
            this.goalError = "Wystąpił błąd walidacji. Sprawdź poprawność danych.";
            break;
          case ErrorCodes.InternalServerError:
            this.goalError = "Wystąpił błąd serwera. Spróbuj ponownie później.";
            break;
          default:
            this.goalError = error.message || "Wystąpił nieoczekiwany błąd.";
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
  