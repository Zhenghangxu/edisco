<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: string
    color?: string
  }>(),
  {
    size: '3',
    color: '#000'
  }
)
</script>

<template>
  <div :class="'ic-container h-3 w-' + size">
    <slot></slot>
  </div>
</template>

<style scoped>
.ic-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.ic-container svg {
  max-width: 100%;
  height: auto;
}
</style>
