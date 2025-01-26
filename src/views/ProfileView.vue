<template>
  <div class="profile-container">
    <header class="profile-header">
      <h1>Profil użytkownika</h1>
    </header>
    <div class="profile-content">
      <!-- Informacje użytkownika -->
      <div class="card">
        <h3>Informacje</h3>
        <p><strong>Email:</strong> {{ user?.email }}</p>
        <p><strong>Rola:</strong> {{ user?.role }}</p>
      </div>

      <!-- Zmień hasło -->
      <div class="card">
        <h3>Zmień hasło</h3>
        <form @submit.prevent="handleChangePassword">
          <div>
            <label for="currentPassword">Obecne hasło</label>
            <input
              v-model="currentPassword"
              type="password"
              id="currentPassword"
              placeholder="Obecne hasło"
              required
            />
          </div>
          <div>
            <label for="newPassword">Nowe hasło</label>
            <input
              v-model="newPassword"
              type="password"
              id="newPassword"
              placeholder="Nowe hasło"
              required
            />
          </div>
          <button type="submit">Zmień hasło</button>
          <p v-if="passwordMessage" :class="{ error: passwordError, success: !passwordError }">
            {{ passwordMessage }}
          </p>
        </form>
      </div>

      <!-- Zmień email -->
      <div class="card">
        <h3>Zmień email</h3>
        <form @submit.prevent="handleChangeEmail">
          <div>
            <label for="newEmail">Nowy email</label>
            <input
              v-model="newEmail"
              type="email"
              id="newEmail"
              placeholder="Nowy email"
              required
            />
          </div>
          <button type="submit">Zmień email</button>
          <p v-if="emailMessage" :class="{ error: emailError, success: !emailError }">
            {{ emailMessage }}
          </p>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import { fetchUserProfile, changePassword, changeEmail } from "@/api/api";
import { ErrorCodes } from "@/constants/errorCodes";

export default {
  name: "ProfileView",
  data() {
    return {
      user: null,
      currentPassword: "",
      newPassword: "",
      newEmail: "",
      passwordMessage: "",
      passwordError: false,
      emailMessage: "",
      emailError: false,
    };
  },
  async created() {
    try {
      const response = await fetchUserProfile();
      this.user = response;
    } catch (error) {
      console.error("Błąd podczas pobierania danych użytkownika:", error);
    }
  },
  methods: {
    async handleChangePassword() {
      this.passwordMessage = "";
      try {
        if (!this.currentPassword || !this.newPassword) {
          this.passwordMessage = "Proszę wypełnić oba pola hasła.";
          this.passwordError = true;
          return;
        }

        await changePassword({
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,
        });

        this.passwordMessage = "Hasło zostało zmienione.";
        this.passwordError = false;
        this.currentPassword = "";
        this.newPassword = "";
      } catch (error) {
        console.error("Błąd podczas zmiany hasła:", error);
    // Obsługa błędów według kodów błędów z backendu
    switch (error.errorCode) {
      case ErrorCodes.Unathorized:
        this.passwordMessage = "Błąd autoryzacji.";
        break;
      case ErrorCodes.ValidationError:
        this.passwordMessage = "Wystąpił błąd walidacji. Sprawdź poprawność danych.";
        break;
        case ErrorCodes.InvalidCredentials:
        this.passwordMessage = "Błędne obecne hasło. Sprawdź poprawność danych.";
        break;
      case ErrorCodes.InternalServerError:
        this.passwordMessage = "Wystąpił błąd serwera. Spróbuj ponownie później.";
        break;
      default:
        this.passwordMessage = error.message || "Wystąpił nieoczekiwany błąd.";
    }
        this.passwordError = true;
      }
    },
    async handleChangeEmail() {

      this.emailMessage = "";
      try {
        if (!this.newEmail) {
          this.emailMessage = "Proszę podać nowy adres e-mail.";
          this.emailError = true;
          return;
        }

        await changeEmail({ newEmail: this.newEmail });

        this.emailMessage = "Sprawdz swoją pocztę e-mail. Kliknij w link.";
        this.emailError = false;
        this.newEmail = "";
      } catch (error) {
        console.error("Błąd podczas zmiany adresu e-mail:", error);


        this.emailMessage =
          error.response?.data?.message || "Nie udało się zmienić adresu e-mail.";
        this.emailError = true;
      }
    },
  },
};
</script>

<style scoped>
.profile-container {
  padding: 20px;
}

.profile-header {
  text-align: center;
  margin-bottom: 20px;
}

.profile-content {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1 1 300px;
  padding: 15px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

form div {
  margin-bottom: 10px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
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

p.error {
  color: red;
  margin-top: 10px;
}

p.success {
  color: green;
  margin-top: 10px;
}
</style>
