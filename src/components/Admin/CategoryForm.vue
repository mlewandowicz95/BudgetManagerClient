<template>
    <form @submit.prevent="save">
      <label for="name">Nazwa kategorii:</label>
      <input type="text" id="name" v-model="categoryData.name" required />
      <div class="actions">
        <button type="submit">Zapisz</button>
        <button type="button" @click="$emit('cancel')">Anuluj</button>
      </div>
    </form>
  </template>
  
  <script>
  export default {
    props: {
      category: Object,
    },
    data() {
      return {
        categoryData: { ...this.category }, // Kopia obiektu do edycji
      };
    },
    methods: {
      save() {
        this.$emit("save", this.categoryData);
      },
    },
  };
  </script>
  
  <style scoped>
  form {
    margin-top: 20px;
  }
  .actions {
    margin-top: 10px;
  }
  button {
    margin-right: 10px;
  }
  </style>
  