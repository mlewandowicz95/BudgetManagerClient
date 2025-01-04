<template>
    <div class="admin-panel">
      <AdminSidebar @changeView="changeView" />
      <div class="admin-content">
        <AdminUsersView v-if="currentView === 'users'" />
        <AdminCategoriesView v-if="currentView === 'categories'" />
      </div>
    </div>
  </template>

<script>
import AdminSidebar from "@/components/Admin/AdminSidebar.vue";
import AdminUsersView from "@/components/Admin/AdminUsersView.vue";
import AdminCategoriesView from "@/components/Admin/AdminCategoriesView.vue";

export default {
  components: { AdminSidebar, AdminUsersView, AdminCategoriesView },
  data() {
    return {
      currentView: "users",
    };
  },
  methods: {
    changeView(view) {
      this.currentView = view;
    },
  },
};
</script>

<style scoped>
.admin-panel {
  display: flex;
}
.admin-content {
  flex: 1;
  padding: 20px;
}
</style>