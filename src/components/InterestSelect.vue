<script setup>
import { ref } from 'vue'
import SelectButton from 'primevue/selectbutton'
import { Icon } from '@iconify/vue'
import { subjectAssetMapping } from '@/utils/subjectAssetMapping'

const value = ref(null)
const options = ref(subjectAssetMapping)
</script>

<template>
  <div class="card flex justify-content-center items-center">
    <SelectButton
      v-model="value"
      :options="options"
      optionLabel="name"
      multiple
      aria-labelledby="multiple"
      :pt="{
        root: (options) => ({
          class: ['interest-select']
        }),
        button: (options) => ({
          class: ['interest-select-button']
        })
      }"
    >
      <template #option="slotProps">
        <div
          class="interest-select-item max-w-[80px] flex flex-col justify-center items-center gap-2"
        >
          <Icon :icon="slotProps.option.icon" width="25" height="25" />
          <span class="text-center">{{ slotProps.option.name }}</span>
        </div>
      </template>
    </SelectButton>
  </div>
</template>
