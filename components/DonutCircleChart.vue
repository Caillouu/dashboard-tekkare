<script setup lang="ts">
  import { DonutChart } from '@/components/ui/chart-donut'

  interface DataItem {
    label: string;
    value: number;
  }

  interface ChartDataItem {
    name: string;
    total: number;
  }

  interface Props {
    data: DataItem[];
  }

  const props = defineProps<Props>();

  const chartData: ChartDataItem[] = props.data ? props.data.map((item) => ({
    name: item.label,
    total: item.value
  })) : [];

  const totals = computed(() => {
    return chartData.reduce((acc, item) => acc + item.total, 0)
  })
  </script>

<template>
  <div class="relative">
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-10 text-2xl font-semibold">{{ totals }}</div>
    <DonutChart
      class="w-64"
      index="name"
      :category="'total'"
      :data="chartData"
    />
  </div>
</template>