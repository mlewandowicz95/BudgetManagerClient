<template>
  <div id="app">
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
import apiClient from './services/api';

export default {
  data() {
    return {
      message: '',
    };
  },
  async created() {
    try {
      const response = await apiClient.get('/example-endpoint');
      this.message = response.data.message;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
