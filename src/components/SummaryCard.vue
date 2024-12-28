<template>
    <div class="summary-card">
      <h3>{{ title }}</h3>
      <p>{{ value }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SummaryCard',
    props: {
      title: String,
      value: [String, Number],
    },
  };
  </script>
  
  <style scoped>
  .summary-card {
    text-align: center;
    background: #f9f9f9;
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 8px;
    margin: 10px 0;
  }
  </style>
  