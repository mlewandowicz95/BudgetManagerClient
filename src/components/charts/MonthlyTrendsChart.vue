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
  layout: {
    padding: {
      bottom: 30, // Dodaj dodatkowe miejsce na etykiety osi X
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Miesiące",
      },
      ticks: {
        maxRotation: 45, // Ustaw maksymalny kąt obrotu etykiet
        minRotation: 0,
        padding: 15, // Dodaj przestrzeń między osią a etykietami
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
}

,
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
  padding: 15px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 400px; /* Ustaw wysokość kontenera */
  max-width: 100%; /* Dopasowanie do szerokości */
  overflow: hidden; /* Ukrycie nadmiarowych elementów */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
  
  .chart-container h3 {
    margin-bottom: 10px;
    text-align: center;
  }
  
  canvas {
  display: block;
  width: 100%;
  height: calc(100% - 40px); /* Zarezerwuj więcej miejsca na etykiety osi X */
}
  @media (max-width: 768px) {
      canvas {
        aspect-ratio: 1 / 1; /* Kwadratowy wykres na mniejszych ekranach */
      }
    }
  </style>
