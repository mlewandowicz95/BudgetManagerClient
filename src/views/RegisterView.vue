<template>
  <div class="register">
    <form @submit.prevent="handleRegister">
      <div>
        <input class="input-register" id="email" v-model="email" type="email" required placeholder="Adres e-mail" aria-label="Adres e-mail" />
        <p v-if="emailError" class="error">{{ emailError }}</p>
      </div>
      <div>
        <input class="input-register" id="registerPassword" v-model="registerPassword" type="password" required placeholder="Hasło" aria-label="Hasło" />
        <p v-if="registerPasswordError" class="error">{{ registerPasswordError }}</p>
      </div>
      <div>
        <input class="input-register" id="confirmPassword" v-model="confirmPassword" type="password" required placeholder="Powtórz hasło" aria-label="Powtórz hasło" />
        <p v-if="confirmPasswordError" class="error">{{ confirmPasswordError }}</p>
      </div>
      <button class="button-register" type="submit" :disabled="isSubmitting || emailError || registerPasswordError || confirmPasswordError">
  {{ isSubmitting ? "Rejestrowanie..." : "Zarejestruj się" }}
</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">{{ success }}</p>
  </div>
</template>

<script>
import { register } from "@/api/authApi";
import { ErrorCodes } from "@/constants/errorCodes";

export default {
  name: "RegisterView",
  data() {
    return {
      email: "",
      registerPassword: "",
      confirmPassword: "",
      error: "",
      success: "",
      emailError: "",
      registerPasswordError: "",
      confirmPasswordError: "",
      isSubmitting: false, // Flaga dla loadera
    };
  },
  watch: {
    email(value) {
      // Walidacja adresu e-mail
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = emailPattern.test(value)
        ? null
        : "Podaj poprawny adres e-mail.";
    },
    registerPassword(value) {
      // Walidacja hasła na podstawie regex
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      this.registerPasswordError = passwordPattern.test(value)
        ? null
        : "Hasło musi mieć min. 8 znaków, zawierać wielką i małą literę, cyfrę oraz znak specjalny.";
    },
    confirmPassword(value) {
      // Sprawdzenie zgodności haseł
      this.confirmPasswordError =
        value === this.registerPassword
          ? null
          : "Hasła muszą być identyczne.";
    },
  },
  methods: {
    async handleRegister() {
      if (this.emailError || this.registerPasswordError || this.confirmPasswordError) {
        this.error = "Popraw błędy przed wysłaniem formularza.";
        return;
      }

      try {
        this.isSubmitting = true; // Włącz loader
        this.error = "";
        this.success = "";

        const response = await register({
          email: this.email,
          password: this.registerPassword,
          confirmPassword: this.confirmPassword,
        });

        // Obsługa sukcesu
        console.log("Rejestracja zakończonm:",response);
        this.success = response.message || "Rejestracja zakończona sukcesem!";
      } catch (error) {
        // Obsługa błędów
        console.error("Błąd rejestracji:", error);
// 5. Obsługa błędów wg kodów błędów
switch (error.errorCode) {
      case ErrorCodes.ValidationError:
        this.error = "Wystąpił błąd walidacji. Sprawdź poprawność danych.";
        break;
      case ErrorCodes.PasswordsMisMatch:
        this.error = "Hasła nie są zgodne. Sprawdź pola i spróbuj ponownie.";
        break;
      case ErrorCodes.UserAlreadyExists:
        this.error = "Podany adres e-mail jest już zarejestrowany.";
        break;
      case ErrorCodes.InternalServerError:
        this.error = "Wystąpił błąd serwera. Spróbuj ponownie później.";
        break;
      default:
        this.error = error.message || "Wystąpił nieoczekiwany błąd.";
    }
      } finally{
        this.isSubmitting = false; // Wyłącz loader
      }
    },
  },
};
</script>


<style scoped>


.input-register {
  width: 75%;
  padding: 10px 20px;
  margin: 8px 0px;
  box-sizing: border-box;
  border: none;
  border-bottom: 2px solid black;
  background-color: #deeef6;
}

.input-register:focus {
  outline: none;
  border-bottom: 2px solid #004aad; /* Zmiana koloru dolnej obramówki */
  background-color: #deede5; /* Jasne tło podczas edycji */
}

.button-register {
  padding: 10px 20px;
  font-size: 27px;
  font-weight: bold;
  color: white;
  background-color: #004aad;
  border-radius: 30px;
}

.button-register:hover {
  background-color: #003078; /* Ciemniejszy odcień niebieskiego */
  cursor: pointer; /* Rączka wskazuje, że to przycisk */
}

.error {
  color: red;
  font-weight: bold;
  font-size: 16px;
}

.success {
  color: green;
  font-weight: bold;
  font-size: 18px;
}

/* Style responsywne */
@media (max-width: 768px) {
  .input-register {
    width: 90%; /* Dostosowanie dla małych ekranów */
  }
  .button-register {
    font-size: 20px; /* Zmniejszenie rozmiaru tekstu */
    padding: 8px 16px;
  }
}
</style>