<script setup lang="ts">
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import { Icon } from '@iconify/vue/dist/iconify.js'

export interface BasicStatsProps {
    title: string
    rating?: number
    subtitle: string
    credit?: number
    description: string
    descriptionLabel: string
}

const props = withDefaults(defineProps<BasicStatsProps>(), {
    title: 'CHEM 101: Introduction to Chemistry',
    subtitle: 'Dr. Jonathan R. Vincent',
    descriptionLabel: 'Description',
    description: 'This course is designed to introduce students to the basic concepts of chemistry. The course will cover the fundamental principles of chemistry, including atomic structure, chemical bonding, and chemical reactions. Students will also learn about the periodic table, chemical nomenclature, and stoichiometry. The course will include lectures, laboratory experiments, and problem-solving exercises. Students will develop critical thinking skills and learn how to apply the principles of chemistry to real-world problems.'
})
</script>

<template>
  <div class="flex flex-row items-center gap-6">
    <div class="title font-sans text-2xl font-bold text-slate-800">{{ title }}</div>
    <div class="rating flex flex-row gap-1 items-center">
      <Icon v-if="rating" width="20" height="20" icon="ph:star-fill" class="text-yellow"></Icon>{{ rating }}
    </div>
  </div>
  <div class="subtitle font-serif text-lg text-slate-600">
    {{ subtitle }} 
    <span v-if="credit" class="font-sans text-xl font-semibold text-primary"> • {{ credit }}</span> credit
  </div>
  <Accordion :activeIndex="0" class="mt-[-20px] desc-accordion">
    <AccordionTab
      :pt="{
        headerAction: (options) => ({
          class: [
            'text-base flex-row border-none font-light bg-transparent text-slate-500 text-base font-sans pl-0 justify-start gap-4'
          ]
        }),
        header: (options) => ({
          class: ['text-base','font-light']
        }),
        //   root: (options) => ({
        //     class: ['max-w-[80%]']
        //   }),
        content: (options) => ({
          class: ['text-sm pl-0 border-solid border-[1px] border-slate-200 rounded-lg !p-4 m-1']
        })
      }"
    >
      <template #header>
        <!-- get the first 110 wrds of desc -->
        <div class="font-semibold text-gray-600">{{ props.descriptionLabel }}</div>
      </template>
      <div class="desc text-sm">
        {{ props.description }}
      </div>
    </AccordionTab>
  </Accordion>
</template>

<style global>
.desc-accordion .p-accordion .p-accordion-header .p-accordion-header-link {
  flex-direction: row !important;
}
</style>
