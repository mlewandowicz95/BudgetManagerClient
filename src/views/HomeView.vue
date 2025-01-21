<template>
  <HomeLayout>
    <div v-if="message" class="alert">
      {{ message }}
      </div>

    <div class="home-container">
      <div class="home-item">
        <h3>Jesteś już naszym użytkownikiem?</h3>
        <LoginView />
      </div>
      <div class="home-item register-view">
        <h3>Jesteś tu pierwszy raz?</h3>
        <RegisterView />
      </div>
    </div>

  </HomeLayout>
</template>

<script>
import HomeLayout from '@/layouts/HomeLayout.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';

export default {
  name: 'HomeView',
  components: {
    HomeLayout,
    LoginView,
    RegisterView,
  },
  computed: {
    message() {
      return this.$route.query.message || "";
    },
  },
};
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* Wysokość w obrębie HomeLayout */
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.home-item {
  flex: 0 0 50%;
  margin: 10px;
  text-align: center;
  font-size: 33px;
}

.register-view {
  background-color: #deeef6;
}
</style>
