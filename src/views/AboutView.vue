<template>
  <div>
    <BrotherA @update-time="updateTime" />
    <BrotherB :current-time="currentTime" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BrotherA from '../components/BrotherA.vue'
import BrotherB from '../components/BrotherB.vue'

const currentTime = ref('')

const updateTime = (time) => {
  currentTime.value = time
}
</script>
