<template>
  <div>
    <teleport to="#teleport-target">
      <TimeDisplay @update="time => currentTime = time" />
    </teleport>
    <p>時刻: {{ currentTime }}</p>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import TimeDisplay from './TimeDisplay.vue'
// 子コンポーネントの時刻を保持
const currentTime = ref('')
// 親から子コンポーネントを受け取って、時間が変わるたびに反映
watch(() => currentTime.value, (newTime) => {
  //console.log('親で反映された:', newTime)
})
</script>