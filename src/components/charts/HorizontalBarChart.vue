<template>
    <div>
        <BarChart v-if="chartData" :chart-data="chartData" :chart-options="chartOptions" />
    </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
    components: {
        BarChart: Bar,
    },
    props: {
        categories: {
            type: Array,
            required: true,
        },
        totals: {
            type: Array,
            required: true,
        },
    },
    computed: {
        chartData() {
            
            return {
                labels: this.categories.length ? this.categories : [], // Domyślna wartość to pusta tablica
                datasets: [
                    {
                        label: "Wydatki wg kategorii",
                        backgroundColor: "#4caf50",
                        data: this.totals.length ? this.totals : [], // Domyślna wartość to pusta tablica
                    },
                ],
            };
        },
        chartOptions() {
            return {
                indexAxis: "y",
                responsive: true,
                maintainAspectRatio: false,
            };
        },
    },
};
</script>
