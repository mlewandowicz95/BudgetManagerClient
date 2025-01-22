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
import { ErrorCodes } from "@/constants/errorCodes";
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

  if (this.resetEmailError) {
    console.log("Sprawdzanie błędów e-maila:", this.resetEmailError);
    this.resetError = "Popraw błędy przed wysłaniem formularza.";
    return;
  }

  try {
    this.isResetting = true; // Włącz flagę ładowania
    this.resetError = ""; // Wyczyść poprzednie błędy
    this.success = ""; // Wyczyść poprzednie sukcesy

    // Wywołanie funkcji z authApi
    const { email } = await resetPassword({ email: this.resetEmail });

    // Sukces - obsługa odpowiedzi
    console.log("Reset hasła powiódł się dla e-maila:", email);
    this.success = "Instrukcje resetu hasła zostały wysłane na podany adres e-mail.";
    this.resetEmail = ""; // Wyczyść pole e-mail
    this.showForgotPasswordForm = false; // Zamknij formularz
  } catch (error) {
    console.error("Błąd resetu hasła:", error);

    // Obsługa błędów według kodów błędów z backendu
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
  } finally {
    this.isResetting = false; // Wyłącz flagę ładowania
  }
}

,
async handleLogin() {
  const userStore = useUserStore();

  // Sprawdzenie błędów walidacji przed wysłaniem formularza
  if (this.usernameError || this.passwordError) {
    this.error = "Popraw błędy przed wysłaniem formularza.";
    return;
  }

  try {
    this.isSubmitting = true; // Flaga ładowania
    this.error = ""; // Wyczyść wcześniejsze błędy

    // Wysłanie żądania logowania
    const { token } = await login({
      email: this.username,
      password: this.password,
    });

    // Jeśli logowanie się powiedzie
    userStore.setToken(token); // Zapis tokena do Pinia
    localStorage.setItem("jwtToken", token); // Zapis tokena do localStorage
    this.$router.push("/dashboard"); // Przekierowanie na dashboard
  } catch (error) {
    console.error("Błąd logowania:", error);
    console.log("Kod błędu:", error?.errorCode);

    // Obsługa błędów w zależności od kodu błędu
    switch (error.errorCode) {
      case  ErrorCodes.InvalidCredentials:
        this.error = "Nieprawidłowy e-mail lub hasło.";
        break;
      case ErrorCodes.UserNotFound:
        this.error = "Użytkownik o podanym adresie e-mail nie istnieje.";
        break;
      case ErrorCodes.AccountNotActivated:
        this.error = "Konto nie zostało aktywowane. Sprawdź swój e-mail.";
        break;
      case ErrorCodes.ValidationError:
        this.error = "Wystąpił błąd walidacji. Sprawdź poprawność danych.";
        break;
        case ErrorCodes.InternalServerError:
        this.resetError = "Wystąpił błąd serwera. Spróbuj ponownie później.";
        break;
      default:
        this.error = error.message || "Wystąpił nieoczekiwany błąd.";
    }
  } finally {
    this.isSubmitting = false; // Wyłączenie flagi ładowania
  }
}

,
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
