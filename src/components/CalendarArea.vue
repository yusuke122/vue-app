<script setup>
import { ref } from 'vue'
const date = ref(new Date())
</script>
<template><VDatePicker v-model="date" mode="date" /></template>
