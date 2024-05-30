<script setup lang="ts">
import CourseCard from './CourseCard.vue'
import { ref } from 'vue'
import courseCardProps from './CourseCard.vue'
import Carousel from 'primevue/carousel'
const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1
  }
])
const props = withDefaults(
  defineProps<{
    courseList: (typeof courseCardProps)[]
  }>(),
  {
    courseList: exampleContentList as any
  }
)
</script>

<script lang="ts">
export const exampleContentList = [
  {
    instructor: 'Dr. Jonathan R. Vincent',
    courseName: 'CHEM 101: Introduction to Chemistry',
    rating: 4.5,
    image: {
      src: '/images/hans-reniers-lQGJCMY5qcM-unsplash.jpg',
      alt: 'Course Image'
    },
    widget: null,
    subject: 'chemistry',
    link: '#',
    eligibility: 'eligible',
    capacity: 100,
    availability: 57
  },
  {
    instructor: 'Dr. Sarah Jane Smith',
    courseName: 'HIS 101: Introduction to History',
    rating: 4.2,
    image: {
      src: '/images/mr-cup-fabien-barral-history-unsplash.jpg',
      alt: 'Course Image'
    },
    widget: null,
    subject: 'history',
    link: '#',
    eligibility: 'uneligible',
    capacity: 100,
    availability: 60
  },
  {
    instructor: 'Dr. Amy Pond',
    courseName: 'BIO 240: Cellular Biology',
    rating: 3,
    image: {
      src: '/images/scott-webb-Q3Hrvu9n3e8-unsplash.jpg',
      alt: 'Course Image'
    },
    widget: null,
    subject: 'biology',
    link: '#',
    eligibility: 'eligible',
    capacity: 100,
    availability: 35
  },
  {
    instructor: 'Dr. Sorenzo Artzi Lopez',
    courseName: 'MU 207: Violin Basics',
    rating: 4.8,
    image: {
      src: '/images/lucia-macedo-d9_2kPJBG0U-unsplash.jpg',
      alt: 'Course Image'
    },
    widget: null,
    subject: 'music',
    link: '#',
    eligibility: 'eligible',
    capacity: 100,
    availability: 2
  }
]
</script>

<template>
  <!-- tailwind 4 col in desktop; 3 in tablet; 2 in large mobile, 1 in small mobile-->
  <div class="hidden sm:grid gap-4 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 p-2">
    <CourseCard v-for="course in props.courseList" :key="course.courseName" v-bind="course" />
  </div>
  <Carousel
    :value="props.courseList"
    :numVisible="1"
    :numScroll="1"
    :pt="{
      root: (options) => ({
        class: ['sm:hidden']
      })
    }"
  >
    <template #item="slotProps">
      <CourseCard :key="slotProps.index" v-bind="slotProps.data" />
    </template>
  </Carousel>
</template>

<style scoped></style>
<style global>
.p-carousel-content .course-select:hover {
  transform: scale(1) !important;
}
</style>
