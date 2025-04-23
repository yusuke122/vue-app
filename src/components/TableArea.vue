<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const data = ref([])
const columns = ref([])

onMounted(async () => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_BASE_URL + '/table',
    )
    const result = response.data

    if (result.length > 0) {
      columns.value = Object.keys(result[0])
    }

    data.value = result
  } catch (error) {
    console.error('API取得エラー:', error)
  }
})
</script>

<template>
  <div class="tableArea">
    <table class="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col" :class="`col-${col}`">
            {{ col }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex">
          <td v-for="col in columns" :key="col" :class="`col-${col}`">
            {{ row[col] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* 必要なところだけ個別スタイル上書き */
.col-type1 {
  background-color: #f9f9f9;
}
.col-type4 {
  font-weight: bold;
  color: #007bff;
}
</style>
