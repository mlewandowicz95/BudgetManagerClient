<template>
    <form @submit.prevent="save">
      <label>Email:</label>
      <input type="email" v-model="userData.email" required />
  
      <label>Rola:</label>
      <select v-model="userData.role">
        <option value="Admin">Admin</option>
        <option value="User">User</option>
        <option value="Pro">Pro</option>
      </select>
  
      <label>Status:</label>
      <select v-model="userData.isActive">
        <option :value="true">Aktywny</option>
        <option :value="false">Nieaktywny</option>
      </select>
  
      <div class="actions">
        <button type="submit">Zapisz</button>
        <button type="button" @click="$emit('cancel')">Anuluj</button>
      </div>
    </form>
  </template>
  
  <script>
  export default {
    props: {
      user: Object,
    },
    data() {
      return {
        userData: { ...this.user }, // Kopia obiektu użytkownika
      };
    },
    methods: {
      save() {
        this.$emit("save", this.userData); // Emituje dane użytkownika do rodzica
      },
    },
  };
  </script>
  
  <style scoped>
  .actions {
    margin-top: 10px;
  }
  button {
    margin-right: 10px;
  }
  </style>
  