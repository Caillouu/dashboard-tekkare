<script setup lang="ts">
  defineProps({
    level: {
      type: String,
      required: true
    }
  })
</script>

<template>
  <div class="relative bg-slate-200 w-full h-full">
    <div class="absolute duration-500 bg-primary w-full h-full bottom-0 left-0" :style="{ height: `${level}` }"></div>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">{{ level }}</div>
  </div>
</template>

<style>

</style>