<!-- BarChart.vue -->
<template>
  <Bar :data="chartData" />
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale)

const props = defineProps({
  chartData: Object
})
</script>
