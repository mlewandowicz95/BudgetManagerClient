<template>
  <div class="login">
    <form @submit.prevent="handleLogin">
      <div>
        <input
          class="input-login"
          id="username"
          v-model="username"
          type="email"
          required
          placeholder="Adres e-mail"
          aria-label="Adres e-mail"
        />
        <p v-if="usernameError" class="error">{{ usernameError }}</p>
      </div>
      <div>
        <input
          class="input-login"
          id="password"
          v-model="password"
          type="password"
          required
          placeholder="Hasło"
          aria-label="Hasło"
        />
        <p v-if="passwordError" class="error">{{ passwordError }}</p>
      </div>

      <!-- Przycisk resetu hasła -->
      <div>
        <button
          type="button"
          class="button-reset-password"
          @click="toggleForgotPasswordForm"
        >
          Zapomniałeś hasła?
        </button>
      </div>

      <!-- Formularz resetu hasła -->
      <transition name="slide-fade">
        <form
          v-if="showForgotPasswordForm"
          @submit.prevent="handlePasswordReset"
          class="forgot-password-form"
        >
          <div>
            <input
              class="input-login"
              v-model="resetEmail"
              type="email"
              required
              placeholder="Podaj adres e-mail do resetu hasła"
              aria-label="E-mail do resetu hasła"
            />
            <p v-if="resetEmailError" class="error">{{ resetEmailError }}</p>
          </div>
          <button class="button-reset-password" type="submit" :disabled="isResetting">
            {{ isResetting ? "Wysyłanie..." : "Zresetuj hasło" }}
          </button>
        </form>
      </transition>
      <p v-if="resetError" class="error">{{ resetError }}</p>
      <button
        class="button-login"
        type="submit"
        :disabled="isSubmitting || usernameError || passwordError"
      >
        {{ isSubmitting ? "Logowanie..." : "Zaloguj się" }}
      </button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">{{ success }}</p>
  </div>
</template>

<script>
import { login, resetPassword } from "@/api/authApi";
import { useUserStore } from "@/stores/userStore";

export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
      resetEmail: "", // E-mail do resetu hasła
      error: "",
      resetError: "",
      success: "",
      usernameError: null, // Walidacja e-maila
      passwordError: null, // Walidacja hasła
      resetEmailError: null,
      isSubmitting: false, // Flaga dla ładowania logowania
      isResetting: false, // Flaga dla ładowania resetowania hasła
      showForgotPasswordForm: false, // Kontroluje widoczność formularza resetu hasła
    };
  },
  watch: {
    username(value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.usernameError = emailPattern.test(value)
        ? null
        : "Podaj poprawny adres e-mail.";
    },
    password(value) {
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      this.passwordError = passwordPattern.test(value)
        ? null
        : "Hasło musi mieć min. 8 znaków, zawierać wielką i małą literę, cyfrę oraz znak specjalny.";
    },
    resetEmail(value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.resetEmailError = emailPattern.test(value)
        ? null
        : "Podaj poprawny adres e-mail.";
    },
  },
  methods: {
    toggleForgotPasswordForm() {
      this.showForgotPasswordForm = !this.showForgotPasswordForm;
      this.resetError = ""; // Wyczyść błędy przy otwieraniu formularza
      this.success = "";
    },
    async handlePasswordReset() {
  console.log("Reset hasła rozpoczęty...");
  try {
    if (this.resetEmailError) {
      console.log("Sprawdzanie błędów e-maila:", this.resetEmailError);
      this.resetError = "Popraw błędy przed wysłaniem formularza.";
      return;
    }

    this.isResetting = true; // Włącz flagę ładowania
    this.resetError = ""; // Wyczyść poprzednie błędy
    this.success = ""; // Wyczyść poprzednie sukcesy

    const response = await resetPassword({ email: this.resetEmail });
    console.log("Odpowiedź API resetu hasła:", response);
    // Obsługa sukcesu
    if (response.success) {
      this.success = "Instrukcje resetu hasła zostały wysłane.";
      //this.success = response.message || "Instrukcje resetu hasła zostały wysłane.";
      this.resetEmail = ""; // Wyczyść pole e-mail
      this.showForgotPasswordForm = false; // Zamknij formularz
    }
  } catch (error) {
    console.error("Błąd resetu hasła:", error);

    // Obsługa błędów według kodu błędu
    switch (error.errorCode) {
      case "USER_NOT_FOUND":
        this.resetError = "Nie znaleziono użytkownika o podanym adresie e-mail.";
        break;
      case "VALIDATION_ERROR":
        this.resetError = "Wystąpił błąd walidacji. Sprawdź poprawność danych.";
        break;
      default:
        this.resetError = error.message || "Wystąpił błąd podczas resetu hasła.";
    }
  } finally {
    this.isResetting = false; // Wyłącz flagę ładowania
  }
}
,
    async handleLogin() {
      const userStore = useUserStore();
      if (this.usernameError || this.passwordError) {
        this.error = "Popraw błędy przed wysłaniem formularza.";
        return;
      }

      try {
        this.isSubmitting = true;
        this.error = "";
        const token = await login({
          email: this.username,
          password: this.password,
        });
        userStore.setToken(token);
        localStorage.setItem("jwtToken", token);
        this.$router.push("/dashboard");
      } catch (error) {
        this.error =
          error.response?.data?.message || "Wystąpił błąd podczas logowania.";
        console.error("Błąd logowania:", error);
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>
<style scoped>
.input-login {
  width: 75%;
  padding: 10px 20px;
  margin: 8px 0px;
  box-sizing: border-box;
  border: none;
  border-bottom: 2px solid black;
}

.input-login:focus {
  outline: none;
  border-bottom: 2px solid #004aad;
  background-color: #deede5;
}

.button-login {
  padding: 10px 20px;
  font-size: 27px;
  font-weight: bold;
  color: white;
  background-color: #004aad;
  border-radius: 30px;
}

.button-login:hover {
  background-color: #003078;
  cursor: pointer;
}

.button-reset-password {
  padding: 10px 20px;
  font-size: 27px;
  font-weight: bold;
  color: #004aad;
  background-color: white;
  border: 2px solid #004aad;
  border-radius: 30px;
  margin: 10px 0;
}

.button-reset-password:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}

.error {
  color: red;
  font-weight: bold;
  font-size: 16px;
}

.success {
  color: green;
  font-weight: bold;
  font-size: 16px;
}

.forgot-password-form {
  margin-top: 10px;
  text-align: center;
}

@media (max-width: 768px) {
  .input-login {
    width: 90%;
  }
  .button-login {
    font-size: 20px;
    padding: 8px 16px;
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
