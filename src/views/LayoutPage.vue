<script setup lang="ts">
import { computed } from 'vue'
import LoginPage from './LoginPage.vue'
const props = defineProps<{
  type: 'full' | 'side' | 'contained' | 'contentWithSideBar' | 'half' | 'third'
  internalLayout: 'vertical' | 'horizontal'
  gap: string
  padding: string
}>()

const widthClasses = {
  full: 'w-full',
  side: 'md:w-[30%] sm:w-full sm:container',
  contained: 'container mx-auto',
  contentWithSideBar: 'md:w-[70%] sm:w-full sm:container',
  half: 'md:w-1/2 sm:w-full sm:container',
  third: 'md:w-1/3 sm:w-full sm:container'
}

const layoutClasses = {
  vertical: 'flex flex-col',
  horizontal: 'flex'
}

const gapClass = {
  '1': 'gap-1',
  '2': 'gap-2',
  '3': 'gap-3',
  '4': 'gap-4',
  '5': 'gap-5',
  '6': 'gap-6'
}

const paddingClass = {
  '1': 'p-1',
  '2': 'p-2',
  '3': 'p-3',
  '4': 'p-4',
  '5': 'p-5',
  '6': 'p-6'
}

const classes = computed(() => {
  return `${'d-flex'} ${paddingClass[props.padding as keyof typeof paddingClass]} ${layoutClasses[props.internalLayout]} ${gapClass[props.gap as keyof typeof gapClass]} ${widthClasses[props.type]}`
})
</script>

<template>
  <div :class="classes">
    <LoginPage email="jason.xu@nrg.com" />
  </div>
</template>

<style scoped></style>
