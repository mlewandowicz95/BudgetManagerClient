<template>
  <div>
    <h1>Zarządzanie użytkownikami</h1>

    <!-- Przycisk dodawania użytkownika -->
    <button @click="toggleAddUserForm">
      {{ addingUser ? "Anuluj dodawanie" : "Dodaj użytkownika" }}
    </button>

    <!-- Formularz dodawania użytkownika -->
    <AddUserForm
      v-if="addingUser"
      @refresh="handleAddUserSuccess"
      @error="handleError"
    />

    <!-- Filtry -->
    <div class="filters">
      <div>
        <label for="roles">Rola:</label>
        <select id="roles" v-model="filters.roles" multiple>
          <option value="All">Wszystkie role</option>
          <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
        </select>
      </div>
      <div>
        <label for="isActive">Status:</label>
        <select id="isActive" v-model="filters.isActive">
          <option value="">Wszystkie statusy</option>
          <option :value="true">Aktywni</option>
          <option :value="false">Nieaktywni</option>
        </select>
      </div>
      <button @click="fetchUsers">Filtruj</button>
    </div>

    <!-- Tabela użytkowników -->
    <div v-if="error" class="error">
      {{ error }}
    </div>

    <UserTable
      v-else
      :users="users"
      :sortBy="sortBy"
      :sortOrder="sortOrder"
      @sort="sort"
      @edit="editUser"
      @delete="deleteUser"
    />

    <!-- Formularz edycji -->
    <UserForm
      v-if="editingUser"
      :user="editingUser"
      @save="saveUser"
      @cancel="cancelEdit"
      @error="handleError"
    />

    <!-- Paginacja -->
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
        Poprzednia
      </button>
      <span>Strona {{ currentPage }} z {{ totalPages }}</span>
      <button
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      >
        Następna
      </button>
    </div>
  </div>
</template>

<script>
import UserTable from "@/components/Admin/UserTable.vue";
import UserForm from "@/components/Admin/UserForm.vue";
import AddUserForm from "@/components/Admin/AddUserForm.vue";
import { getAllUsers, deleteUser, updateUser } from "@/api/api";

export default {
  components: { UserTable, UserForm, AddUserForm },
  data() {
    return {
      users: [],
      roles: ["Admin", "User", "Pro"], // Role do wyboru w filtrach
      filters: {
        roles: [],
        isActive: "",
      },
      currentPage: 1,
      totalPages: 0,
      pageSize: 20,
      editingUser: null,
      addingUser: false, // Dodane: Czy formularz dodawania użytkownika jest widoczny
      error: null,
      sortBy: "email", // Domyślne sortowanie
      sortOrder: "asc", // Domyślny kierunek sortowania
    };
  },

  methods: {
    toggleAddUserForm() {
      this.addingUser = !this.addingUser;
    },
    async fetchUsers() {
      try {
        const params = {
  roles: this.filters.roles.length === 0 || this.filters.roles.includes("All") ? null : this.filters.roles.join(","),
  isActive: this.filters.isActive,
  page: this.currentPage,
  pageSize: this.pageSize,
  sortBy: this.sortBy,
  sortOrder: this.sortOrder,
};

        console.log("Wysyłane parametry (przed API call):", JSON.stringify(params));
        const response = await getAllUsers(params);
        this.users = response.items;
        this.totalPages = response.totalPages;
        this.currentPage = response.currentPage;
        this.error = null; // Czyszczenie błędu
      } catch (error) {
        console.error("Błąd podczas pobierania użytkowników:", error.message);
        this.error = "Nie udało się pobrać użytkowników.";
      }
    },
    handleAddUserSuccess() {
      this.addingUser = false; // Ukrycie formularza po dodaniu użytkownika
      this.fetchUsers(); // Odświeżenie listy użytkowników
    },
    sort(column) {
      if (this.sortBy === column) {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        this.sortBy = column;
        this.sortOrder = "asc";
      }
      this.fetchUsers();
    },
    editUser(user) {
      this.editingUser = { ...user };
    },
    async saveUser(userData) {
      try {
        await updateUser(userData.id, userData);
        console.log("Użytkownik został zaktualizowany:", userData);
        this.editingUser = null; // Zamknięcie formularza
        this.fetchUsers(); // Odświeżenie listy użytkowników
      } catch (error) {
        console.error("Błąd podczas zapisywania użytkownika:", error.message);
        this.error = error.message; // Wyświetlenie błędu użytkownikowi
      }
    },
    async deleteUser(userId) {
      try {
        await deleteUser(userId); // Wywołanie API do usunięcia użytkownika
        console.log("Użytkownik usunięty:", userId);
        this.fetchUsers();
      } catch (error) {
        console.error("Błąd podczas usuwania użytkownika:", error.message);
        this.error = "Nie udało się usunąć użytkownika.";
      }
    },
    cancelEdit() {
      this.editingUser = null;
    },
    changePage(newPage) {
      this.currentPage = newPage;
      this.fetchUsers();
    },
    handleError(error) {
      this.error = error;
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: center;
}
.filters label {
  margin-right: 5px;
}
.error {
  color: red;
  margin-bottom: 20px;
}
.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}
button {
  padding: 5px 10px;
}
</style>
