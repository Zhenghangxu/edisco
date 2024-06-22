<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js'
import Panel from 'primevue/panel'
import { computed } from 'vue'

export interface requirementItem {
  requirementText: string
  isRequirementMet: boolean
}
export interface BasicStatsProps {
  requirements: {
    eligibility: 'eligible' | 'uneligible' | 'uncertain'
    eligibilityRequirements: requirementItem[]
  }
}

const headerClass: any = computed(() => {
  return {
    'bg-success-muted': props.requirements.eligibility === 'eligible',
    'bg-error-muted': props.requirements.eligibility === 'uneligible',
    'bg-uncertain-muted': props.requirements.eligibility === 'uncertain'
  }
})

const props = withDefaults(defineProps<BasicStatsProps>(), {
  requirements: () => {
    return {
      eligibility: 'eligible',
      eligibilityRequirements: [
        {
          requirementText: 'Must have a high school diploma',
          isRequirementMet: false
        },
        {
          requirementText: 'Must have a high school diploma',
          isRequirementMet: true
        },
        {
          requirementText: 'Must have a high school diploma',
          isRequirementMet: true
        }
      ]
    }
  }
})
</script>

<template>
  <Panel
    toggleable
    :collapsed="true"
    :pt="{
      header: (options) => ({
        class: ['text-xl py-2 font-semibold border-0 eligibility-panel-header', headerClass]
      }),
      root: (options) => ({
        class: ['border-solid border-[1px] border-slate-200 rounded-lg']
      }),
      content: (options) => ({
        class: ['border-0 eligibility-panel-content p-3']
      })
    }"
  >
    <template #header>
      <!-- convert to capital case -->
      <div class="font-semibold capitalize flex flex-row items-center gap-2">
        <Icon
          v-show="requirements.eligibility === 'eligible'"
          icon="ph:check-circle"
          width="25"
          height="25"
          class="text-secondary"
        />
        <Icon
          v-show="requirements.eligibility === 'uneligible'"
          icon="ph:x-circle"
          width="25"
          height="25"
          class="text-error"
        />
        <Icon
          v-show="requirements.eligibility === 'uncertain'"
          icon="ph:question"
          width="25"
          class="text-uncertain"
          height="25"
        />
        <span>{{ requirements.eligibility }}</span>
      </div>
    </template>
    <div class="flex flex-col gap-2">
      <ul class="list-disc pl-5 leading-6">
        <li
          v-for="requirement in requirements.eligibilityRequirements"
          :key="requirement.requirementText"
          class="flex flex-row items-start gap-2"
        >
          <Icon
            v-if="requirement.isRequirementMet"
            icon="ph:check-circle-fill"
            width="20"
            class="text-secondary"
          />
          <Icon
            v-if="!requirement.isRequirementMet"
            icon="ph:x-circle-fill"
            width="20"
            class="text-error"
          />
          <span class="block icon-container">{{ requirement.requirementText }}</span>
        </li>
      </ul>
    </div>
  </Panel>
</template>

<style scoped>
.icon-container {
  width: 100%;
}
</style>
