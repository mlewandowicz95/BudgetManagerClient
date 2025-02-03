<template>
  <div class="admin-panel">
    <AdminSidebar :currentView="currentView" @changeView="changeView" />
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
      currentView: "users", // Domyślny widok
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
  min-height: 100vh;
  background: #f9f9f9;
}


.admin-sidebar {
  width: 250px;
  background: #2c3e50;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
}


.admin-content {
  flex: 1;
  padding: 20px;
  background: white;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .admin-panel {
    flex-direction: column;
  }
  .admin-sidebar {
    width: 100%;
    text-align: center;
  }
}
</style>
