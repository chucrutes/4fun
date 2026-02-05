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
        autoSkip: true,
        maxRotation: 45,
        minRotation: 0,
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
  <div class="min-h-64 w-full">
    <h2 class="mb-2">{{ label }}</h2>

    <div class="h-full w-full overflow-x-auto overflow-y-hidden">
      <div class="h-full min-w-150">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>
