<template>
    <div class="home-layout">
      <HeaderMinimal />
      <main class="content">
        <slot /> <!-- To tutaj trafia dynamiczna zawartość -->
      </main>
      <FooterMain />
    </div>
</template>
  
  <script>
  import HeaderMinimal from "@/components/HeaderMinimal.vue";
  import FooterMain from "@/components/Footer.vue";
  
  export default {
    name: "HomeLayout",
    components: {
      HeaderMinimal,
      FooterMain,
    },
  };
  </script>
  
  <style scoped>
  .home-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .content {
    flex: 1;
    display: flex;
    justify-content:center;
    align-items: flex-start;
  }
  </style>
  