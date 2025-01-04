<template>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nazwa</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.id }}</td>
          <td>{{ category.name }}</td>
          <td>
            <button @click="$emit('edit', category)">Edytuj</button>
            <button @click="$emit('delete', category.id)">Usuń</button>
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  export default {
    props: {
      categories: Array,
    },
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  th, td {
    padding: 10px;
    border: 1px solid #ddd;
  }
  th {
    background-color: #f4f4f4;
  }
  </style>
  