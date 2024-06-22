<script setup lang="ts">
import Card from 'primevue/card'
import Avatar from 'primevue/avatar'
export interface InstructorProps {
  instructorName: string
  title: string
  desc: string
  link: string
  event?: () => void
  image?: string
}

const props = withDefaults(defineProps<InstructorProps>(), {
  instructorName: 'Dr. Jonathan R. Vincent',
  title: 'Associate Professor, Ph.D.',
  desc: 'Dr. Jonathan R. Vincent is a Professor of Chemistry at the University of California, Berkeley. He received his Ph.D. in Chemistry from the University of California, Berkeley, and his B.S. in Chemistry from the University of California, Los Angeles. Dr. Vincent has published over 100 research articles in the field of chemistry and has received numerous awards for his research. He is a Fellow of the American Chemical Society and a member of the National Academy of Sciences. Dr. Vincent has taught chemistry at the undergraduate and graduate levels for over 20 years and has mentored many students in his research laboratory. He is passionate about teaching and is dedicated to helping students succeed in their studies.',
  link: 'https://www.linkedin.com/in/jonathan-vincent-chemistry',
  image: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png'
})

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
    class="instructor-card"
    v-on:click="defaultEvent(link)"
    v-ripple="{
      pt: {
        root: { style: 'background: rgba(83,83,83, 0.1)' }
      }
    }"
    :pt="{
      header: () => ({
        class: ['flex', 'justify-center', 'items-center']
      }),
      root: () => ({
        class: ['flex', 'flex-row', 'flex-no-wrap', 'justify-center', 'items-start', 'gap-3', 'p-4']
      }),
      body: () => ({
        class: ['py-0']
      })
    }"
  >
    <template #header>
      <Avatar
        shape="circle"
        size="xlarge"
        alt="user header"
        :src="image"
      />
    </template>
    <template #title>{{ instructorName }}</template>
    <template #subtitle>{{ title }}</template>
    <template #content>
      <p class="m-0 desc">
        {{ desc }}
      </p>
    </template>
  </Card>
</template>
<style global>
.instructor-card {
  box-shadow: none;
  cursor: pointer;
  transition: all 0.3s;
  overflow: hidden;
}

.instructor-card:hover {
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  transform: scale(1.02);
}

.instructor-card .desc {
  /* text too long, truncate it at 100px height, display ecllips at the end */
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 100px;
}
</style>
