<script setup lang="ts">
import LayoutPage from './LayoutPage.vue'
import BasicPage from './BasicPage.vue'
import CourseCardGrid, { exampleContentList } from '@/components/CourseCardGrid.vue'
import type { courseCardProps } from '@/components/CourseCard.vue'

export interface contentGroup {
  title?: string
  content?: courseCardProps[]
}

const props = withDefaults(
  defineProps<{
    contentGroups?: contentGroup[]
  }>(),
  {
    contentGroups: [
      { title: 'Summer 2020 Collections', content: exampleContentList },
      { title: 'Popular Among Business Student', content: exampleContentList },
      { title: 'Last Minute Rush!', content: exampleContentList }
    ] as any
  }
)
</script>

<template>
  <BasicPage>
    <LayoutPage
      type="full"
      internalLayout="vertical"
      gap="6"
      padding="0"
      className="max-w-[95vw] md:max-w-[1200px] mx-auto py-[82px]"
    >
      <div
        v-for="(group, index) in contentGroups"
        :key="index"
        :content="group.content"
      >
        <h2 class="px-2 font-sans font-medium text-xl text-center md:text-left md:text-3xl font-serif text-slate-800">{{ group.title }}</h2>
        <CourseCardGrid :courseList="group.content as any" />
      </div>
    </LayoutPage>
  </BasicPage>
</template>

<style scoped></style>

<!-- :ptOptions="{autocomplete:'one-time-code'}" -->
