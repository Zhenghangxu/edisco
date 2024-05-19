<script setup lang="ts">
import LayoutPage from './LayoutPage.vue'
import HeaderNav from '@/components/HeaderNav.vue'
import FooterDefault from '@/components/FooterDefault.vue'
</script>
<template>
  <LayoutPage type="full" internalLayout="vertical" gap="0" padding="0" className="p-2">
    <HeaderNav />
  </LayoutPage>
  <slot></slot> 
  <FooterDefault />
</template>
