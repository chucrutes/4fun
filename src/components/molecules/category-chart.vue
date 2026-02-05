<script setup lang="ts">
import { computed } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  type ChartOptions,
} from "chart.js";

const props = defineProps<{
  data: Record<string, number>;
  label: string;
}>();

ChartJS.register(Title, Tooltip, BarElement, CategoryScale, LinearScale);

const chartData = computed(() => ({
  labels: Object.keys(props.data),

  datasets: [
    {
      data: Object.values(props.data),
      backgroundColor: "#0561b2",
      borderRadius: 8,
      barPercentage: 0.15,
      categoryPercentage: 0.7,
    },
  ],
}));

const chartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#000000",
      },
    },
    y: {
      beginAtZero: true,
      type: "linear",
      ticks: {
        stepSize: 4,
        color: "#000000",
      },
      grid: {
        display: false,
      },
    },
  },
};
</script>

<template>
  <div class="h-96 w-100 md:w-140 space-y-4">
    <h2>{{ label }}</h2>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
