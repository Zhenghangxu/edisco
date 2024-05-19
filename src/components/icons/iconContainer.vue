<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: string
    color?: string
  }>(),
  {
    size: '30px',
    color: '#000'
  }
)
</script>

<template>
  <div class="ic-container" :style="{'--icon-ms': size }">
    <slot></slot>
  </div>
</template>

<style>
.ic-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.ic-container > svg {
  height: var(--icon-ms) !important;
  overflow: hidden;
  width: auto;
}
</style>
