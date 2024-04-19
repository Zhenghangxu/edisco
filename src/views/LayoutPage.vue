<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  type: 'full' | 'side' | 'contained' | 'contentWithSideBar' | 'half' | 'third'
  internalLayout: 'vertical' | 'horizontal'
  gap: string
}>()

const widthClasses = {
  full: 'w-full',
  side: 'w-3/10',
  contained: 'container',
  contentWithSideBar: 'w-7/10 sm:w-full sm:container',
  half: 'w-1/2',
  third: 'w-1/3'
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

const classes = computed(() => {
  return `${"d-flex"} ${layoutClasses[props.internalLayout]} ${gapClass[props.gap as keyof typeof gapClass]} ${widthClasses[props.type]}`
})
</script>

<template>
  <div :class="classes"><slot></slot></div>
</template>

<style scoped></style>
