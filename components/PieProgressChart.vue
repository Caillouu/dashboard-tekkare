<script setup lang="ts">
  import { ref, defineProps } from 'vue'
  import { DonutChart } from '@/components/ui/chart-donut'
  import { Progress } from '@/components/ui/progress'

  interface Props {
    data: Array<{
      specialty: string
      numberOfDoctors: number
      satisfactionRate: string
    }>
  }

  const props = defineProps<Props>()

  const chartData = ref(props.data ? props.data.map((item) => ({
    name: item.specialty,
    total: item.numberOfDoctors,
    rate: item.satisfactionRate,
    color: getRandomColor()
  })) : [])

  function getRandomColor(): string {
    const letters = '0123456789ABCDEF'
    let color = '#14'
    for (let i = 0; i < 4; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  const chartColors = chartData.value.map(() => getRandomColor())
</script>

<template>
  <div class="flex justify-center items-center flex-wrap">
    <DonutChart
      class="w-64"
      index="name"
      :category="'total'"
      :data="chartData"
      :type="'pie'"
      :colors="chartColors"
    />
    <div class="flex-1 min-w-72">
      <span class="float-right text-xs w-32 text-center">Satisfaction</span>
      <ul class="clear-right">
        <li v-for="(item, index) in chartData" :key="index" :style="{ color: item.color }">
          <div class="flex items-center">
            <div class="shrink-0 w-2 h-2 rounded-full mr-2" :style="{ backgroundColor: chartColors[index] }"></div>
            <div class="shrink-0 font-medium" :style="{ color: chartColors[index] }">{{ item.name }}</div>
            <div class="relative ml-auto">
              <Progress class="w-32" v-bind:modelValue="parseFloat(item.rate.replace('%', ''))" />
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs">{{ item.rate }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>