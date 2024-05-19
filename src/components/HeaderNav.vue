<script setup lang="ts">
import { ref } from 'vue'
import Menubar from 'primevue/menubar'
import Badge from 'primevue/badge'
import InputText from 'primevue/inputtext'
import Avatar from 'primevue/avatar'
import BrandLogoLite from '@/components/icons/BrandLogoLite.vue'

const menuItems = ref([
  {
    label: 'Home'
  },
  {
    label: 'Features'
  },
  {
    label: 'Projects',
    items: [
      {
        label: 'Core',
        shortcut: '⌘+S'
      },
      {
        label: 'Blocks',
        shortcut: '⌘+B'
      },
      {
        label: 'UI Kit',
        shortcut: '⌘+U'
      },
      {
        separator: true
      },
      {
        label: 'Templates',
        items: [
          {
            label: 'Apollo',
            badge: 2
          },
          {
            label: 'Ultima',
            badge: 3
          }
        ]
      }
    ]
  },
  {
    label: 'Contact',
    badge: 3
  }
])
</script>
<template>
  <nav class="main-nav">
    <Menubar :model="menuItems" class="gap-2">
      <template #start>
        <BrandLogoLite />
      </template>
      <template #item="{ item, props, root }">
        <div class="mx-auto">
          <a v-ripple class="flex items-center justify-center" v-bind="props.action">
            <span :class="item.icon"></span>
            <span>{{ item.label }}</span>
            <Badge
              v-if="item.badge"
              :class="{ 'ml-auto': !root, 'ml-2': root }"
              :value="item.badge"
            />
            <span
              v-if="item.shortcut"
              class="ml-auto border-1 border-round surface-100 text-xs p-1"
              >{{ item.shortcut }}</span
            >
          </a>
        </div>
      </template>
      <template #end>
        <div class="flex items-center justify-center gap-2">
          <InputText placeholder="Search" type="text" class="w-8rem sm:w-auto" />
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            shape="circle"
          />
        </div>
      </template>
    </Menubar>
  </nav>
</template>
