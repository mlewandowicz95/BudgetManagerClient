<template>
    <div class="summary-item">
      <h3 :style="{ color: color }">{{ title }}</h3>
      <p>{{ formattedValue }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      value: [Number, String], // Obsługujemy zarówno liczby, jak i tekst
      color: String,
    },
    computed: {
      formattedValue() {
        if (typeof this.value === "number") {
          return new Intl.NumberFormat("pl-PL", {
            style: "currency",
            currency: "PLN",
          }).format(this.value);
        }
        return this.value; // Dla tekstu zwracamy wartość bez zmian
      },
    },
  };
  </script>
  
  <style scoped>
  .summary-item {
    text-align: center;
    padding: 15px;
    border-radius: 8px;
    background: #f9f9f9;
    border: 1px solid #ddd;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .summary-item p {
    font-weight: bold;
  }
  </style>
  