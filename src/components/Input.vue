<script setup lang="ts">
defineProps<{
  inputType: string
  name: string
  value: string
  smallLabel?: string
}>()
</script>

<template>
  <div class="input-container">
    <input :type="inputType" :name="name" :value="value" />
    <span>{{ smallLabel }}</span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'InputDefault'
}
</script>
<style lang="scss">
.input-container {
  padding: 0.5rem;
  margin: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  span {
    color: red;
  }
}
</style>
