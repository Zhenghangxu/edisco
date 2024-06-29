<script setup lang="ts">
import Skeleton from 'primevue/skeleton'
export interface SkeletonProps {
  type?: string
  // articles, card-horizontal, card-vertical, paragraph
}

const props = withDefaults(defineProps<SkeletonProps>(), {
  type: 'paragraph'
})
</script>

<template>
  <div v-if="type==='paragraph'">
    <Skeleton class="mb-2"></Skeleton>
    <Skeleton width="10rem" class="mb-2"></Skeleton>
    <Skeleton width="5rem" class="mb-2"></Skeleton>
    <Skeleton height="2rem" class="mb-2"></Skeleton>
    <Skeleton width="10rem" height="4rem"></Skeleton>
  </div>
  <div v-if="type==='sessionSelect'">
    <Skeleton width="11.8rem" height="29px" class="mb-2"></Skeleton>
    <Skeleton width="6.2rem" height="21px" class="mb-2"></Skeleton>
    <Skeleton width="16.4rem" height="14px" class="mb-2"></Skeleton>
  </div>
</template>

<style global></style>
