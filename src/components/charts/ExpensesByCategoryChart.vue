<template>
    <div class="chart-container">
      <h3>Wydatki według kategorii</h3>
      <canvas id="expensesByCategoryChart"></canvas>
    </div>
  </template>
  
  <script>
  import { getExpensesByCategory } from "@/api/api";
  import Chart from "chart.js/auto";
  
  export default {
    name: "ExpensesByCategoryChart",
    async created() {
      try {
        const data = await getExpensesByCategory();
  
        if (!data || !data.length) {
          console.warn("Brak danych do wyświetlenia na wykresie wydatków według kategorii.");
          return;
        }
  
        const ctx = document.getElementById("expensesByCategoryChart").getContext("2d");
  
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: data.map((item) => item.category), // Nazwy kategorii
            datasets: [
              {
                label: "Wydatki (PLN)",
                data: data.map((item) => item.totalAmount), // Kwoty wydatków
                backgroundColor: data.map(() => this.getRandomColor()), // Kolory dynamiczne
                borderWidth: 1,
              },
            ],
          },
          options: {
            indexAxis: "y", // Wykres słupkowy poziomy
            responsive: true,
            plugins: {
              legend: {
                display: false, // Ukryj legendę, ponieważ każda kategoria ma własny kolor
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return `${context.raw} PLN`; // Formatowanie wartości w tooltipie
                  },
                },
              },
            },
            scales: {
              x: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Kwota (PLN)",
                },
                ticks: {
                  callback: function (value) {
                    return `${value} zł`; // Formatowanie osi X
                  },
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Kategorie",
                },
              },
            },
          },
        });
      } catch (error) {
        console.error("Błąd przy pobieraniu danych wydatków według kategorii:", error.message);
      }
    },
    methods: {
      getRandomColor() {
        // Generowanie losowego koloru
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      },
    },
  };
  </script>
  
  <style scoped>
  .chart-container {
    margin-top: 20px;
    padding: 15px;
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    max-width: 100%; /* Ustaw maksymalną szerokość */
    display: flex;
    flex-direction: column;
  }

  .chart-container h3 {
    margin-bottom: 20px;
    text-align: center;
  }
  
  canvas {
    display: block;
    width: 100%; /* Zajmuje całą szerokość kontenera */
    height: 100%; /* Automatyczna wysokość */
    aspect-ratio: 2 / 1; /* Proporcja szerokości do wysokości */
  }

  @media (max-width: 768px) {
    canvas {
      aspect-ratio: 1 / 1; /* Kwadratowy wykres na mniejszych ekranach */
    }
  }
  </style>
