<template>
    <nav class="admin-sidebar">
        <ul>
            <li @click="selectView('users')">Użytkownicy</li>
            <li @click="selectView('categories')">Kategorie</li>
        </ul>
    </nav>
</template>

<script>
export default {
    methods: {
        selectView(view) {
            this.$emit("changeView", view);
        }
    }
}
</script>

<style scoped>
.admin-sidebar {
  width: 200px;
  background: #f4f4f4;
  padding: 10px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
li:hover {
  background: #ddd;
}
</style>