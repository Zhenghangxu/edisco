<script setup lang="ts">
import { computed } from 'vue'
const props = withDefaults(
  defineProps<{
    type?: 'full' | 'side' | 'contained' | 'contentWithSideBar' | 'half' | 'third'
    internalLayout?: 'vertical' | 'horizontal'
    gap?: string
    padding?: string
    className?: string
  }>(),
  {
    type: 'full',
    internalLayout: 'vertical',
    gap: '0',
    padding: '0',
    className: ''
  }
)

const widthClasses = {
  full: 'w-full',
  side: 'md:w-[30%] sm:w-full sm:container static md:sticky md:top-[120px]',
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
  '0': 'gap-0',
  '1': 'gap-1',
  '2': 'gap-2',
  '3': 'gap-3',
  '4': 'gap-4',
  '5': 'gap-5',
  '6': 'gap-6',
  '7': 'gap-7',
  '8': 'gap-8',
  '9': 'gap-9'
}

const paddingClass = {
  '0': 'p-0',
  '1': 'p-1',
  '2': 'p-2',
  '3': 'p-3',
  '4': 'p-4',
  '5': 'p-5',
  '6': 'p-6'
}

const classes = computed(() => {
  return `${'d-flex'} ${paddingClass[props.padding as keyof typeof paddingClass]} ${layoutClasses[props.internalLayout]} ${gapClass[props.gap as keyof typeof gapClass]} ${widthClasses[props.type]} ${props.className}`
})
</script>

<template>
  <div :class="classes">
    <slot></slot>
  </div>
  <div class="top top"></div>
</template>

<style scoped></style>
