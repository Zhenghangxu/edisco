<script setup lang="ts">
import LayoutPage from './LayoutPage.vue'
import Button from 'primevue/button'
import BasicPage from './BasicPage.vue'
import InterestSelect from '@/components/InterestSelect.vue'

defineProps<{
  selectedItems?: Array<string>
}>()
</script>

<template>
  <BasicPage>
    <LayoutPage
      type="full"
      internalLayout="vertical"
      gap="6"
      padding="0"
      className="max-w-[95vw] md:max-w-[900px] mx-auto"
    >
      text here
    </LayoutPage>
  </BasicPage>
</template>

<style scoped></style>

<!-- :ptOptions="{autocomplete:'one-time-code'}" -->
