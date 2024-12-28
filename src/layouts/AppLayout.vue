<template>
    <div class="app-layout">
      <Header />
      <main class="content">
       <router-view />
      </main>
      <FooterMain />
    </div>
  </template>
  
  <script>
  import Header from "@/components/Header.vue";
  import FooterMain from "@/components/Footer.vue";
  
  export default {
    name: "AppLayout",
    components: {
     Header,
     FooterMain,
    },
  };
  </script>
  
  <style scoped>
  .app-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .content {
  flex: 1; /* Dynamicznie zajmuje pozostałą przestrzeń */
  padding: 20px; /* Opcjonalne wypełnienie */
  overflow-y: auto; /* Dodaj przewijanie, jeśli zawartość przekracza miejsce */
  box-sizing: border-box; /* Upewnij się, że padding nie zwiększa wielkości elementu */
}
  </style>
  