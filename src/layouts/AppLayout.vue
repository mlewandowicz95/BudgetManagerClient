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
  flex: 1;
  padding: 20px;
  padding-top: 70px; /* Dostosuj do wysokości headera */
  overflow-y: auto; /* Przewijanie treści */
  box-sizing: border-box;
}
  </style>
  