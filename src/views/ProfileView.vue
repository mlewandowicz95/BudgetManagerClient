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
              <input v-model="currentPassword" type="password" id="currentPassword" placeholder="Obecne hasło" required />
            </div>
            <div>
              <label for="newPassword">Nowe hasło</label>
              <input v-model="newPassword" type="password" id="newPassword" placeholder="Nowe hasło" required />
            </div>
            <button type="submit">Zmień hasło</button>
          </form>
        </div>
  
        <!-- Zmień email -->
        <div class="card">
          <h3>Zmień email</h3>
          <form @submit.prevent="handleChangeEmail">
            <div>
              <label for="newEmail">Nowy email</label>
              <input v-model="newEmail" type="email" id="newEmail" placeholder="Nowy email" required />
            </div>
            <button type="submit">Zmień email</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useUserStore } from "@/stores/userStore";
  import { changePassword, changeEmail } from "@/api/userApi";
  
  export default {
    name: "ProfileView",
    data() {
      return {
        user: null, // Dane użytkownika
        currentPassword: "",
        newPassword: "",
        newEmail: "",
      };
    },
    async created() {
      const userStore = useUserStore();
  
      try {
        // Jeśli dane użytkownika nie są załadowane, pobierz je
        if (!userStore.user) {
          await userStore.initializeUser();
        }
        this.user = userStore.user;
      } catch (error) {
        console.error("Błąd podczas pobierania danych użytkownika:", error);
      }
    },
    methods: {
      async handleChangePassword() {
        try {
          if (!this.currentPassword || !this.newPassword) {
            alert("Proszę wypełnić oba pola hasła.");
            return;
          }
  
          await changePassword({
            currentPassword: this.currentPassword,
            newPassword: this.newPassword,
          });
  
          alert("Hasło zostało zmienione.");
          this.currentPassword = "";
          this.newPassword = "";
        } catch (error) {
          console.error("Błąd podczas zmiany hasła:", error);
          alert(error.response?.data?.message || "Nie udało się zmienić hasła.");
        }
      },
      async handleChangeEmail() {
        try {
          if (!this.newEmail) {
            alert("Proszę podać nowy adres e-mail.");
            return;
          }
  
          await changeEmail({ newEmail: this.newEmail });
  
          alert("Adres e-mail został zmieniony.");
          this.newEmail = "";
        } catch (error) {
          console.error("Błąd podczas zmiany adresu e-mail:", error);
          alert(error.response?.data?.message || "Nie udało się zmienić adresu e-mail.");
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
  </style>
  