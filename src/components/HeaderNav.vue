<script setup lang="ts">
import { ref } from 'vue'
import Menubar from 'primevue/menubar'
import Badge from 'primevue/badge'
import InputText from 'primevue/inputtext'
import Avatar from 'primevue/avatar'
import BrandLogoLite from '@/components/icons/BrandLogoLite.vue'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { Icon } from '@iconify/vue/dist/iconify.js'
import Card from 'primevue/card';

const menuItems = ref([
  {
    label: 'Explore'
  },
  {
    label: 'Metrics'
  },
  // {
  //   label: 'Projects',
  //   items: [
  //     {
  //       label: 'Core',
  //       shortcut: '⌘+S'
  //     },
  //     {
  //       label: 'Blocks',
  //       shortcut: '⌘+B'
  //     },
  //     {
  //       label: 'UI Kit',
  //       shortcut: '⌘+U'
  //     },
  //     {
  //       separator: true
  //     },
  //     {
  //       label: 'Templates',
  //       items: [
  //         {
  //           label: 'Apollo',
  //           badge: 2
  //         },
  //         {
  //           label: 'Ultima',
  //           badge: 3
  //         }
  //       ]
  //     }
  //   ]
  // },
  {
    label: 'Portals'
  }
])
</script>
<template>
  <nav class="main-nav">
    <Menubar
      :model="menuItems"
      class="gap-6"
      :pt="{
        root: {
          class: ['border-none']
        },
        menu: {
          class: ['md:w-full md:justify-end md:gap-4']
        },
        menuItem: {
          class: ['nav-menu-hover-effect']
        }
      }"
    >
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
        <div class="flex items-center justify-center gap-2 md:gap-[20vw]">
          <div class="flex flex-row gap-2 items-center">
            <!-- <Icon icon="ph:magnifying-glass-duotone" width="30" height="30" class="text-slate-500"/> -->
            <InputText type="text" placeholder="Search" class="w-8rem sm:w-auto simple-search" />
          </div>
          <div class="user-profile">
            <Avatar
              image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
              shape="circle"
              size="large"
            />
          </div>
        </div>
      </template>
    </Menubar>
  </nav>
</template>
