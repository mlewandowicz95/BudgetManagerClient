<template>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>Email:</label>
        <input v-model="form.email" type="email" required />
      </div>
      <div>
        <label>Hasło:</label>
        <input v-model="form.password" type="password" required />
      </div>
      <div>
        <label>Potwierdź hasło:</label>
        <input v-model="form.confirmPassword" type="password" required />
      </div>
      <div>
        <label>Rola:</label>
        <select v-model="form.role" required>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          <option value="Pro">Pro</option>
        </select>
      </div>
      <button type="submit">Dodaj użytkownika</button>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </template>
  
  <script>
  import { addUser } from "@/api/adminApi";
  
  export default {
    data() {
      return {
        form: {
          email: "",
          password: "",
          confirmPassword: "",
          role: "User",
        },
        error: null,
      };
    },
    methods: {
      async handleSubmit() {
        try {
          await addUser(this.form);
          alert("Użytkownik został dodany.");
          this.$emit("refresh"); // Powiadomienie o odświeżeniu listy użytkowników
        } catch (error) {
          this.error = error.message;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  