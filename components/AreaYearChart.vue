<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from 'vue'
import { AreaChart } from '@/components/ui/chart-area'

const props = defineProps({
  data: {
    type: Array as () => Array<{ month: string; year: number; value: number }>,
    required: true,
    default: () => []
  }
})

const chartData = ref<{ [key: string]: string | number; name: string }[]>([]);
const years = ref<string[]>([])

const processData = computed(() => {
  const yearSet = new Set<string>()
  const monthlyData = props.data.reduce((acc, item) => {
    if (!acc[item.month]) {
      acc[item.month] = { name: item.month };
    }
    acc[item.month][item.year.toString()] = item.value;
    yearSet.add(item.year.toString());
    return acc;
  }, {} as Record<string, { name: string; [key: string]: number | string }>);

  years.value = Array.from(yearSet).sort();

  const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return Object.values(monthlyData).sort((a, b) => 
    monthOrder.indexOf(a.name as string) - monthOrder.indexOf(b.name as string)
  );
});

watchEffect(() => {
  chartData.value = processData.value;
});
</script>

<template>
  <AreaChart 
    :data="chartData"
    index="name"
    :categories="years"
  />
</template>