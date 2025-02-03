<template>
  <div class="user-form-container">
    <form @submit.prevent="save">
      <div class="form-group">
        <label for="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          v-model="userData.email" 
          required
          placeholder="Wpisz email"
        />
      </div>

      <div class="form-group">
        <label for="role">Rola:</label>
        <select id="role" v-model="userData.role" required>
          <option disabled value="">Wybierz rolę</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          <option value="Pro">Pro</option>
        </select>
      </div>

      <div class="form-group">
        <label for="status">Status:</label>
        <select id="status" v-model="userData.isActive">
          <option :value="true">Aktywny</option>
          <option :value="false">Nieaktywny</option>
        </select>
      </div>


      <p v-if="error" class="error-message">{{ error }}</p>

      <div class="actions">
        <button type="submit" class="save-btn">Zapisz</button>
        <button type="button" @click="$emit('cancel')" class="cancel-btn">Anuluj</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
  },
  data() {
    return {
      userData: this.user ? { ...this.user } : { email: "", role: "", isActive: true },
      error: null,
    };
  },
  methods: {
    save() {
      if (!this.userData.email || !this.userData.role) {
        this.error = "Email i rola są wymagane!";
        return;
      }
      this.error = null;
      this.$emit("save", this.userData); 
    },
  },
};
</script>

<style scoped>
.user-form-container {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-weight: bold;
  color: #333;
}

input,
select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

input:focus,
select:focus {
  outline: none;
  border-color: #007bff;
}

.error-message {
  color: red;
  font-size: 14px;
  text-align: center;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

button {
  padding: 8px 12px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.save-btn {
  background-color: #28a745;
  color: white;
}

.save-btn:hover {
  background-color: #218838;
}

.cancel-btn {
  background-color: #dc3545;
  color: white;
}

.cancel-btn:hover {
  background-color: #c82333;
}


@media (max-width: 480px) {
  .user-form-container {
    padding: 15px;
  }

  button {
    width: 48%;
    font-size: 14px;
  }
}
</style>
