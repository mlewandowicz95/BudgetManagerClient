<template>
  <div class="balance-per-month">
    <h3>Bilans miesięczny</h3>
    <canvas id="balanceChart"></canvas>
  </div>
</template>

<script>
import { getBalancePerMonth } from "@/api/api";
import Chart from "chart.js/auto";

export default {
  name: "BalancePerMonth",
  data() {
    return {
      balanceData: [], // Dane bilansu miesięcznego
    };
  },
  async created() {
    try {
      const data = await getBalancePerMonth();
      console.log("Dane bilansu miesięcznego:", data);
      this.balanceData = data;

      if (!this.balanceData.length) {
        console.warn("Brak danych do wyświetlenia na wykresie bilansu miesięcznego.");
        return;
      }

      // Inicjalizacja wykresu
      this.initChart();
    } catch (error) {
      console.error(
        "Wystąpił błąd podczas pobierania bilansu miesięcznego:",
        error.message
      );
    }
  },
  methods: {
    initChart() {
      const ctx = document.getElementById("balanceChart").getContext("2d");

      const labels = this.balanceData.map((item) => item.yearMonth || "Brak danych");
      const incomeData = this.balanceData.map((item) => item.income || 0);
      const expensesData = this.balanceData.map((item) => item.expenses || 0);

      new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Wpływy",
              data: incomeData,
              backgroundColor: "rgba(76, 175, 80, 0.7)", // Zielony
              borderWidth: 1,
            },
            {
              label: "Wydatki",
              data: expensesData.map((value) => -value), // Wydatki jako wartości ujemne
              backgroundColor: "rgba(244, 67, 54, 0.7)", // Czerwony
              borderWidth: 1,
            },
          ],
        },
        options: {
  responsive: true,
  maintainAspectRatio: false, // Wyłącz domyślne proporcje
  plugins: {
    legend: {
      position: "top",
    },
  },
  scales: {
    x: {
      stacked: true,
      title: {
        display: true,
        text: "Miesiące",
      },
    },
    y: {
      stacked: true,
      beginAtZero: true,
      suggestedMax: Math.max(...incomeData, ...expensesData.map((v) => Math.abs(v))) * 1.2,
      title: {
        display: true,
        text: "Kwota (PLN)",
      },
      ticks: {
        callback: function (value) {
          return `${value} zł`; // Formatowanie osi Y
        },
      },
    },
  },
},
      });
    },
  },
};
</script>

<style scoped>
.balance-per-month {
  margin-top: 20px;
  padding: 15px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 100%; /* Ustaw maksymalną szerokość */
  display: flex;
  flex-direction: column;
}

.balance-per-month h3 {
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
