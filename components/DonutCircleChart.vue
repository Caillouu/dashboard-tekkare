<script setup lang="ts">
  import { DonutChart } from '@/components/ui/chart-donut'

  const props = defineProps({
    data: {
      type: Array,
      required: true,
      default: () => []
    }
  })

  const chartData = props.data ? props.data.map((item) => ({
    name: item.label,
    total: item.value
  })) : [];
</script>

<template>
  <DonutChart
    index="name"
    :category="'total'"
    :data="chartData"
  />
</template>