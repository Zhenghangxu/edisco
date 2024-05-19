<script setup lang="ts">
import Card from 'primevue/card'
import { Icon } from '@iconify/vue/dist/iconify.js'

interface imageProps {
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
  }>(),
  {
    instructor: 'Dr. John Doe',
    courseName: 'Course Name',
    image: () => ({
      src: 'https://via.placeholder.com/150',
      alt: 'Course Image'
    }),
    textContent: 'This is a course description',
    widget: null
  }
)
</script>

<template>
  <Card style="width: 25rem; overflow: hidden">
    <template #header>
      <img :src="image.src" :alt="image.alt" />
    </template>
    <template #title>
      <div class="flex flex-row">
        <Icon icon="ph:book-duotone" width="25" height="25" />
        <span>{{ courseName }}</span>
      </div>
    </template>
    <template #subtitle>
      <div class="flex flex-row">
        <Icon icon="ph:user-circle-duotone" width="25" height="25" />
        <span>{{ instructor }}</span>
      </div>
    </template>
    <template #content>
      <p class="m-0">
        {{ textContent }}
      </p>
    </template>
    <template #footer>
      <div class="flex gap-3 mt-1">
        <Button label="Cancel" severity="secondary" outlined class="w-full" />
        <Button label="Save" class="w-full" />
      </div>
    </template>
  </Card>
</template>
