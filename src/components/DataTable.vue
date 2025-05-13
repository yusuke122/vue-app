<template>
  <div class="table-container">
    <div v-if="showControls" class="controls">
      <button @click="resetSort">ソートリセット</button>
    </div>

    <table ref="tableRef">
      <thead>
        <!-- タイトル行 -->
        <tr>
          <th
            v-for="(title, index) in headers"
            :key="index"
            :data-sort-method="sortableColumns[index] ? 'basic' : 'none'"
          >
            {{ title }}
            <button
              v-if="sortableColumns[index]"
              class="sort-button"
              @click.prevent="sortByColumn(index)"
            >
              ソート
            </button>
          </th>
        </tr>
        <!-- フィルター入力行 -->
        <tr>
          <th v-for="(title, index) in headers" :key="'filter-' + index">
            <input
              v-if="filterableColumns[index]"
              type="text"
              v-model="filters[index]"
              @input="applyFilters"
              placeholder="フィルター"
              class="filter-input"
            />
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, rowIndex) in filteredData" :key="rowIndex">
          <td v-for="(cell, colIndex) in row" :key="colIndex">{{ cell }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import Tablesort from 'tablesort'

const props = defineProps({
  data: { type: Array, required: true },
  headers: { type: Array, required: true },
  sortableColumns: { type: Array, default: () => [] },
  filterableColumns: { type: Array, default: () => [] },
  showControls: { type: Boolean, default: true }
})

const tableRef = ref(null)
let sortInstance = null

const columnCount = computed(() =>
  Math.max(...props.data.map(row => row.length))
)

// 各行を列数に揃える（不足は空白）
const normalizedData = computed(() =>
  props.data.map(row =>
    Array.from({ length: columnCount.value }, (_, i) => row[i] ?? '')
  )
)

// フィルター入力保持用
const filters = ref(Array(columnCount.value).fill(''))

// フィルター処理（前方一致）
const filteredData = computed(() => {
  return normalizedData.value.filter((row) => {
    return row.every((cell, index) => {
      const filter = filters.value[index]
      if (!filter || !props.filterableColumns[index]) return true
      return String(cell).toLowerCase().startsWith(filter.toLowerCase())
    })
  })
})

// TableSort 初期化
const initSort = async () => {
  await nextTick()
  if (tableRef.value) {
    sortInstance = new Tablesort(tableRef.value)
  }
}

const sortByColumn = (colIndex) => {
  if (!tableRef.value) return
  const headers = tableRef.value.querySelectorAll('th')
  if (headers[colIndex]) headers[colIndex].click()
}

const resetSort = () => {
  filters.value = Array(columnCount.value).fill('')
  initSort()
}

const applyFilters = () => {
  // フィルターはリアクティブに反映されるので特別な処理は不要
}

onMounted(() => {
  filters.value = Array(columnCount.value).fill('')
  initSort()
})

watch(() => props.data, () => {
  filters.value = Array(columnCount.value).fill('')
  initSort()
})
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

.sort-button {
  margin-left: 6px;
  font-size: 0.8em;
  cursor: pointer;
}

.controls {
  margin-bottom: 10px;
}

.filter-input {
  width: 90%;
  padding: 2px 4px;
  font-size: 0.85em;
}
</style>
