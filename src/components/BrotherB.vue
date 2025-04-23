<template>
  <div>
    <p>受け取った時刻: {{ currentTime }}</p>
  </div>
</template>

<script setup>
defineProps({
  currentTime: String
})
</script>
