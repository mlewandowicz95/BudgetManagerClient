<template>
  <div>
    <h1>Welcome to Budget Manager!</h1>
    <MenuView />
  </div>
</template>

<script>
import MenuView from '@/views/MenuView.vue'; // Importuj MenuView

export default {
  name: 'HomeView',
  components: {
    MenuView, // Zarejestruj MenuView jako komponent
  }
};
</script>
