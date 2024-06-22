<script setup lang="ts">
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import { Icon } from '@iconify/vue/dist/iconify.js'

export interface EnrollmentStatsProps {
  availability: number
  capacity: number
  daysLeftForSignup: number
}

const props = withDefaults(defineProps<EnrollmentStatsProps>(), {
  availability: 57,
  capacity: 100,
  daysLeftForSignup: 30
})
</script>

<template>
  <div class="stats font-sans text-base grid grid-cols-2 md:flex-row gap-x-1 gap-y-2 mt-3">
    <div class="flex col-span-1 flex-row">
      <div class="flex flex-row items-center gap-1">
        <span class="font-semibold font-sans text-2xl text-primary">{{ availability }}</span>
        <span class="text-gray-500">/{{ capacity }} seats left</span>
      </div>
    </div>
    <div class="flex col-span-1 flex-row">
      <div class="flex flex-row items-center gap-1">
        <span class="font-semibold font-sans text-2xl text-primary">{{ daysLeftForSignup }}</span>
        <span class="text-gray-500">Days Left</span>
      </div>
    </div>
    <div class="flex col-span-1 flex-row gap-1 items-center">
      <Icon icon="ph:building-duotone" width="25" height="25" class="text-secondary" />
      <span class="text-md font-sans">Bradford, Toronto, Online</span>
    </div>
    <div class="flex col-span-1 flex-row gap-1 items-center">
      <Icon icon="ph:calendar-duotone" width="25" height="25" class="text-secondary" />
      <span class="text-md font-sans">Fall 2021, Spring 2022</span>
    </div>
  </div>
</template>

<style scoped></style>
