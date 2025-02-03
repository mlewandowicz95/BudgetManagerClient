<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th @click="onSort('id')">
            ID <span>{{ getSortIcon('id') }}</span>
          </th>
          <th @click="onSort('email')">
            Email <span>{{ getSortIcon('email') }}</span>
          </th>
          <th @click="onSort('role')">
            Rola <span>{{ getSortIcon('role') }}</span>
          </th>
          <th @click="onSort('isActive')">
            Status <span>{{ getSortIcon('isActive') }}</span>
          </th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td :class="user.isActive ? 'active' : 'inactive'">
            {{ user.isActive ? "Aktywny" : "Nieaktywny" }}
          </td>
          <td class="actions">
            <button @click="$emit('edit', user)" class="edit-btn">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="$emit('delete', user.id)" class="delete-btn">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    users: Array,
    sortBy: String, 
    sortOrder: String, 
  },
  methods: {
    onSort(column) {
      this.$emit("sort", column); 
    },
    getSortIcon(column) {
      if (this.sortBy === column) {
        return this.sortOrder === "asc" ? "↑" : "↓";
      }
      return ""; 
    },
  },
};
</script>

<style scoped>

.table-container {
  width: 100%;
  overflow-x: auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

th,
td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
  white-space: nowrap;
}

th {
  background-color: #f4f4f4;
  cursor: pointer;
  font-weight: bold;
  user-select: none;
}

th:hover {
  background-color: #e1e1e1;
}

.active {
  color: #28a745;
  font-weight: bold;
}

.inactive {
  color: #dc3545;
  font-weight: bold;
}


.actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.edit-btn,
.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 5px;
  transition: transform 0.2s ease-in-out;
}

.edit-btn:hover {
  color: #007bff;
  transform: scale(1.2);
}

.delete-btn:hover {
  color: #dc3545;
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .table-container {
    padding: 5px;
  }
  th,
  td {
    padding: 8px;
    font-size: 14px;
  }
  .edit-btn,
  .delete-btn {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  th,
  td {
    font-size: 12px;
    padding: 6px;
  }
  .edit-btn,
  .delete-btn {
    font-size: 14px;
  }
}
</style>
