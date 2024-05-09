<script setup lang="ts">
import BrandLogo from './icons/BrandLogo.vue'

defineProps<{
  title: string
}>()
</script>

<template>
  <div class="splash-lite flex flex-col lg:justify-center items-center">
    <div class="header lg:text-right">
      <h2 class="text-center mb-7 lg:mb-[74px] text-3xl md:text-6xl">{{ title }}</h2>
    </div>
    <div class="responsive-svg">
      <BrandLogo />
    </div>
  </div>
</template>
