<template>
    <footer class="app-footer">
      <p>&copy; {{ currentYear }} Budget Manager. Wszelkie prawa zastrzeżone.</p>
    </footer>
  </template>
  
  <script>
  export default {
    name: "FooterMain",
    data() {
      return {
        currentYear: new Date().getFullYear(),
      };
    },
  };
  </script>
  
  <style scoped>
  .app-footer {
    background-color: #f9f9f9;
    border-top: 1px solid #ddd;
    padding: 15px;
    text-align: center;
    font-size: 14px;
    color: #666;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  }
  </style>
  