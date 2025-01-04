<template>
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
        <td>{{ user.isActive ? "Aktywny" : "Nieaktywny" }}</td>
        <td>
          <button @click="$emit('edit', user)">Edytuj</button>
          <button @click="$emit('delete', user.id)">Usuń</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    users: Array,
    sortBy: String, // Aktualna kolumna sortowania
    sortOrder: String, // Aktualny kierunek sortowania
  },
  methods: {
    onSort(column) {
      this.$emit("sort", column); // Emituj zdarzenie sortowania do rodzica
    },
    getSortIcon(column) {
      if (this.sortBy === column) {
        return this.sortOrder === "asc" ? "↑" : "↓";
      }
      return ""; // Brak ikony, jeśli kolumna nie jest sortowana
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 10px;
  border: 1px solid #ddd;
}
th {
  background-color: #f4f4f4;
  cursor: pointer;
  text-align: left;
}
</style>
