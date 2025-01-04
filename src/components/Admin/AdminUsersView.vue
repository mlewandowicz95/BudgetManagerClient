<template>
  <div>
    <h1>Zarządzanie użytkownikami</h1>

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
import { getAllUsers } from "@/api/adminApi";

export default {
  components: { UserTable, UserForm },
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
      error: null,
      sortBy: "email", // Domyślne sortowanie
      sortOrder: "asc", // Domyślny kierunek sortowania
    };
  },

  methods: {
    async fetchUsers() {
      try {
        const params = {
          roles: this.filters.roles.includes("All") ? null : this.filters.roles,
          isActive: this.filters.isActive,
          page: this.currentPage,
          pageSize: this.pageSize,
          sortBy: this.sortBy,
          sortOrder: this.sortOrder,
        };

        const response = await getAllUsers(params);
        this.users = response.items;
        this.totalPages = response.totalPages;
        this.currentPage = response.currentPage;
      } catch (error) {
        console.error("Błąd podczas pobierania użytkowników:", error.message);
        this.error = "Nie udało się pobrać użytkowników.";
      }
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
      console.log("Zapisywanie użytkownika", userData);
      this.editingUser = null;
      this.fetchUsers();
    },
    deleteUser(userId) {
      console.log("Usuwanie użytkownika o ID:", userId);
      this.fetchUsers();
    },
    cancelEdit() {
      this.editingUser = null;
    },
    changePage(newPage) {
      this.currentPage = newPage;
      this.fetchUsers();
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
