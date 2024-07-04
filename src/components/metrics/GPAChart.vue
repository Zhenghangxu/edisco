<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
import Chart from 'primevue/chart'
import { setChartOptions, defaultValues } from './chart-options'

export interface GPAChartProps {
  type?: string
  data?: any
  chartOptions?: any
  currentSemesterIndex?: number
}

const props = withDefaults(defineProps<GPAChartProps>(), {
  type: 'line',
  currentSemesterIndex: 3,
  data: {
    labels: ['', 'F 2019', 'W 2020', 'S 2020', 'F 2020'],
    datasets: [
      {
        label: 'GPA',
        borderColor: getComputedStyle(document.documentElement).getPropertyValue(
          '--secondary-color'
        ),
        data: defaultValues.defaultDataX,
        borderWidth: 2
      }
    ]
  },
  chartOptions: setChartOptions()
})

let filteredData = props.data.datasets[0].data.filter((value: any) => value)
</script>

<template>
  <div class="border-gray-200 border-[1px] border-solid rounded-md md:p-8 p-3 m-2 relative">
    <div
      class="absolute w-[120px] top-5 right-5 border-gray-200 shadow-sm border-[1px] border-solid md:p-5 p-2 bg-white z-10 rounded-md flex items-center justify-center"
    >
      <div class="text-content">
        <span class="text-secondary text-xl font-semibold">
          <!-- calculate Mean, two digits after the point -->
          {{ (filteredData.reduce((a: any, b: any) => a + b, 0) / filteredData.length).toFixed(2) }}
        </span>
        <span class="text-slate-500 text-xl font-semibold"> / 4</span>
      </div>
    </div>
    <Chart :type="type" :data="data" :options="chartOptions" />
  </div>
</template>

<style global></style>
