<script setup lang="ts">
import Divider from 'primevue/divider'
import BrandLogo from '@/components/icons/BrandLogo.vue'
import iconContainer from './icons/iconContainer.vue'
import { computed } from 'vue'
interface link {
  name: string
  url: string
}

interface socialLink {
  name?: string
  url?: string
  icon?: string
}
interface linkGroup {
  title?: string
  links: link[]
}
const props = withDefaults(
  defineProps<{
    navlinks: linkGroup[]
    logoImg?: string
    tagline?: string
    socialLinks?: socialLink[]
    copyRight?: string
  }>(),
  {
    navlinks: () => [{ title: 'Company', links: [{ name: '', url: '' }] }],
    logoImg: '',
    tagline: 'Master Your Future Now With Edisco',
    // @ts-expect-error
    // eslint-disable-next-line vue/require-valid-default-prop
    socialLinks: [],
    copyRight: 'Designed and Coded by @Jason Xu'
  }
)
const borderStyles = 'border-solid border-[1px] border-gray-200 rounded-lg'
const marginStyles = 'm-2'
const containerClass = computed(() => {
  return `${borderStyles} ${marginStyles}`
})
</script>

<template>
  <div :class="containerClass">
    <div class="card pt-16 md:pt-[8rem] px-6 md:px-8 pb-8 grid grid-cols-2 md:grid-cols-3">
      <div class="card col-span-2 md:col-span-1">
        <div class="flex items-center justify-start">
          <div class="w-24 h-24">
            <iconContainer size="3"> <BrandLogo /> </iconContainer>
          </div>
        </div>
        <div class="flex items-center justify-start mt-4">
          <p>{{ tagline }}</p>
        </div>
      </div>
      <div class="card col-span-2"></div>
    </div>
    <div class="px-6 md:px-8">
      <div
        class="card flex items-center justify-center pt-6 border-t-[1px] border-0 border-gray-200 border-solid"
      >
        <p>{{ copyRight }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
