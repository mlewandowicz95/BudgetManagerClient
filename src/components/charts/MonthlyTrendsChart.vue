<template>
    <div class="chart-container">
      <h3>Trendy miesięczne</h3>
      <canvas id="monthlyTrendsChart"></canvas>
    </div>
  </template>
  
  <script>
  import { getBalancePerMonth } from "@/api/api";
  import Chart from "chart.js/auto";
  
  export default {
    name: "MonthlyTrendsChart",
    async created() {
      try {
        const data = await getBalancePerMonth();
        const ctx = document.getElementById("monthlyTrendsChart").getContext("2d");
  
        const labels = data.map((item) => item.yearMonth); // Miesiące
        const balances = data.map((item) => item.income - item.expenses); // Bilans
  
        new Chart(ctx, {
          type: "line",
          data: {
            labels,
            datasets: [
              {
                label: "Bilans miesięczny",
                data: balances,
                borderColor: "#2196f3",
                backgroundColor: "rgba(33, 150, 243, 0.2)",
                borderWidth: 2,
                pointBackgroundColor: "#2196f3",
                pointBorderColor: "#fff",
                pointHoverRadius: 6,
                pointRadius: 4,
                tension: 0.3, // Krzywizna linii
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false, // Wyłączenie domyślnego stosunku proporcji
            plugins: {
              legend: {
                position: "top",
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const value = context.raw;
                    return `Bilans: ${value.toLocaleString("pl-PL", {
                      style: "currency",
                      currency: "PLN",
                    })}`;
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Miesiące",
                },
              },
              y: {
                beginAtZero: false,
                title: {
                  display: true,
                  text: "Kwota (PLN)",
                },
                ticks: {
                  callback: function (value) {
                    return `${value} zł`;
                  },
                },
              },
            },
          },
        });
      } catch (error) {
        console.error("Błąd przy pobieraniu trendów miesięcznych:", error.message);
      }
    },
  };
  </script>
  
  <style scoped>
  .chart-container {
    margin-top: 20px;
    padding: 20px;
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    height: 400px; /* Stała wysokość */
    max-width: 100%; /* Szerokość dopasowana do kontenera */
    overflow: hidden; /* Ukrycie nadmiarowego elementu */
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* Rozkłada zawartość równomiernie */
  }
  
  .chart-container h3 {
    margin-bottom: 10px;
    font-size: 18px;
    text-align: center;
  }
  
  canvas {
    display: block;
    width: 100%;
    height: calc(100% - 40px); /* Ustal wysokość płótna bez nagłówka */
  }
  </style>
  