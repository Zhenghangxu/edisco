<script setup lang="ts">
import Card from 'primevue/card'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { subjectAssetMapping } from '@/utils/subjectAssetMapping'

export interface imageProps {
  alt?: string
  src: string
}

const props = withDefaults(
  defineProps<{
    courseName: string
    image: imageProps
    instructor?: string
    rating?: number
    textContent?: string
    widget?: any
    subject: string
    link?: string
    event?: () => void
  }>(),
  {
    instructor: 'Dr. John Doe',
    courseName: 'CHEM 101: Introduction to Chemistry',
    rating: 4.5,
    image: () => ({
      src: 'https://via.placeholder.com/400x250',
      alt: 'Course Image'
    }),
    widget: null,
    subject: 'engineering',
    link: 'https://www.google.com',
  }
)
const iconAsset = subjectAssetMapping.find((item) => item.value === props.subject)
const defaultEvent = (url: string) => {
  if (!props.event) {
    window.location.href = url
  } else {
    props.event() 
  }
}
</script>

<template>
  <Card
    style="width: 25rem; overflow: hidden; cursor: pointer"
    v-on:click="defaultEvent(link)"
    class="course-card"
  >
    <template #header>
      <div class="p-card-body">
        <img :src="image.src" :alt="image.alt" class="w-full rounded-md" />
      </div>
    </template>
    <template #title>
      <div class="flex flex-row gap-2 items-start">
        <Icon :icon="iconAsset?.icon as string" width="40" height="40" class="text-primary" />
        <span>{{ courseName }}</span>
      </div>
    </template>
    <template #subtitle>
      <div class="flex flex-row">
        <div class="flex flex-row mr-3 items-center gap-1 ml-[38px]">
          <Icon icon="ph:user-circle" width="25" height="25" />
          <span>{{ instructor }}</span>
        </div>
        <div class="flex flex-row items-center gap-1">
          <Icon icon="ph:star-duotone" width="25" height="25" />
          <span>{{ rating }}</span>
        </div>
      </div>
    </template>
  </Card>
</template>
