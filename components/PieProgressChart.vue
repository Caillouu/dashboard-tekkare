<script setup lang="ts">
  import { DonutChart } from '@/components/ui/chart-donut'
  import { Progress } from '@/components/ui/progress'

  const props = defineProps({
    data: {
      type: Array,
      required: true,
      default: () => []
    }
  })

  const chartData = props.data ? props.data.map((item) => ({
    name: item.specialty,
    total: item.numberOfDoctors,
    rate: item.satisfactionRate,
  })) : [];

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const chartColors = chartData.map(() => getRandomColor());
</script>

<template>
  <DonutChart
    index="name"
    :category="'total'"
    :data="chartData"
    :type="'pie'"
    :colors="chartColors"
  />
  <div class="w-80 m-auto">
    <h2 class="float-right w-32 text-center">Satisfaction</h2>
    <ul class="clear-right">
      <li v-for="(item, index) in chartData" :key="index" :style="{ color: item.color }">
        <div class="flex items-center">
          <div class="w-2 h-2 rounded-full mr-2" :style="{ backgroundColor: chartColors[index] }"></div>
          <strong :style="{ color: chartColors[index] }">{{ item.name }}</strong>
          <div class="relative ml-auto">
            <Progress class="w-32" v-bind:modelValue="parseFloat(item.rate.replace('%', ''))" />
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs">{{ item.rate }}</div>
          </div>
        </div>
        
      </li>
    </ul>
  </div>
</template>