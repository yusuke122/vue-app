<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th v-for="(col, index) in columnCount" :key="index">Col {{ index + 1 }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in normalizedData" :key="rowIndex">
          <td v-for="(cell, colIndex) in row" :key="colIndex">{{ cell }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

// 最大列数（行ごとに異なる列数を揃えるため）
const columnCount = computed(() =>
  Math.max(...props.data.map(row => row.length))
)

// 各行を最大列数に揃える（足りない列は空白で埋める）
const normalizedData = computed(() =>
  props.data.map(row =>
    Array.from({ length: columnCount.value }, (_, i) => row[i] ?? '')
  )
)
</script>

<style scoped>
.table-container {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #aaa;
  padding: 4px 8px;
  text-align: center;
}
</style>
