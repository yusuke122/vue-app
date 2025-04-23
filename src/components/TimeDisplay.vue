<template>
  <div>
    <p>現在の時刻: {{ currentTime }}</p>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted,defineEmits  } from 'vue'
const emit = defineEmits(['update'])
const currentTime = ref('')
// 時間を更新する関数
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString()
  emit('update', currentTime.value)
}

onMounted(() => {
  updateTime()
  const interval = setInterval(updateTime, 1000)
  onUnmounted(() => clearInterval(interval))
})
</script>