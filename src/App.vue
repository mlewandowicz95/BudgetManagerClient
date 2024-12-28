<template>
  <div id="app">
    <router-view /> <!-- Renderuje odpowiedni układ na podstawie trasy -->
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-height: 100vh; /* Całkowita wysokość dla aplikacji */
  display: flex;
  flex-direction: column;

}



h3 {
  font-size: 33px;
}

input::placeholder {
  font-size: 24px;
  font-family:'Times New Roman', Times, serif;
}

</style>
