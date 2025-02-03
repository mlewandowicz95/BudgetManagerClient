<template>
    <div>
      <h1>Zarządzanie kategoriami</h1>
      <button @click="createCategory">Dodaj kategorię</button>
      <CategoryTable :categories="categories" @edit="editCategory" @delete="deleteCategory" />
      <CategoryForm v-if="editingCategory" :category="editingCategory" @save="saveCategory" @cancel="cancelEdit" />
    </div>
  </template>
  
  <script>
  import CategoryTable from "@/components/Admin/CategoryTable.vue";
  import CategoryForm from "@/components/Admin/CategoryForm.vue";
  import { fetchCategories, addCategory, updateCategory, deleteCategory } from "@/api/api";
  
  export default {
    components: { CategoryTable, CategoryForm },
    data() {
      return {
        categories: [],
        editingCategory: null,
      };
    },
    methods: {
      async fetchCategories() {
        try {
          this.categories = await fetchCategories();
        } catch (error) {
          console.error("Błąd podczas pobierania kategorii:", error);
        }
      },
      createCategory() {
        this.editingCategory = { name: "" }; // Nowa kategoria
      },
      editCategory(category) {
        this.editingCategory = { ...category }; // Kopia obiektu do edycji
      },
      async saveCategory(categoryData) {
        try {
          if (categoryData.id) {
            await updateCategory(categoryData.id, categoryData);
          } else {
            await addCategory(categoryData);
          }
          this.editingCategory = null;
          this.fetchCategories();
        } catch (error) {
          console.error("Błąd podczas zapisywania kategorii:", error);
        }
      },
      async deleteCategory(categoryId) {
        try {
          await deleteCategory(categoryId);
          this.fetchCategories();
        } catch (error) {
          console.error("Błąd podczas usuwania kategorii:", error);
        }
      },
      cancelEdit() {
        this.editingCategory = null;
      },
    },
    mounted() {
      this.fetchCategories();
    },
  };
  </script>
  
  <style scoped>
  button {
    margin-bottom: 20px;
  }
  </style>
  