<script setup lang="ts">
  import { Progress } from '@/components/ui/progress'

  defineProps({
    level: {
      type: String,
      required: true
    }
  })
</script>

<template>
  <div class="relative w-32 shrink-0 md:ml-auto">
    <Progress class="w-full" v-bind:modelValue="parseFloat(level.replace('%', ''))" />
    <div class="absolute top-0 left-0 right-0 w-full text-white text-xs text-center">{{ level }}</div>
  </div>
</template>