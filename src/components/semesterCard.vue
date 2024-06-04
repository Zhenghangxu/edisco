<script setup lang="ts">
import Card from 'primevue/card'
import { Icon } from '@iconify/vue/dist/iconify.js'
import Avatar from 'primevue/avatar'

interface avatarProps {
  src: string
  alt: string
}

const props = withDefaults(
  defineProps<{
    title: string
    avatars: avatarProps[]
    campus: string
  }>(),
  {
    title: 'Fall 2020',
    avatars: () => [
      { src: 'https://via.placeholder.com/150', alt: 'Avatar 1' },
      { src: 'https://via.placeholder.com/150', alt: 'Avatar 2' }
    ],
    campus: 'Brandford Campus'
  }
)
</script>

<template>
  <Card
    :pt="{
      root: () => {
        return {
          style: 'box-shadow: none;',
          class: 'border-solid border-0 border-[1px] border-gray-200 p-3'
        }
      },
      body: {
        class: 'p-0'
      }
    }"
  >
    <template #header>
      <div class="text-lg font-bold">
        {{ title }}
      </div>
    </template>

    <template #content>
      <div class="avatar-section flex flex-row gap-2 py-2">
        <Avatar
          shape="circle"
          size="large"
          v-for="(avatar, index) in avatars"
          :key="index"
          :image="avatar.src"
          :alt="avatar.alt"
        />
      </div>
      <div class="campus flex flex-row gap-2 items-center text-sm">
        <span>{{ campus }}</span>
      </div>
    </template>
  </Card>
</template>
