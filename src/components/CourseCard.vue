<script setup lang="ts">
import Card from 'primevue/card'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { subjectAssetMapping } from '@/utils/subjectAssetMapping'
import ProgressBar from 'primevue/progressbar'

export interface imageProps {
  alt?: string
  src: any
}

export interface courseCardProps {
  courseName: string
  image: imageProps
  instructor?: string
  rating?: number
  textContent?: string
  widget?: any
  subject: string
  link?: string
  event?: () => void
  capacity?: number
  availability?: number
  eligibility?: 'eligible' | 'uneligible' | 'uncertain'
  showIcon?: boolean
}

const props = withDefaults(defineProps<courseCardProps>(), {
  instructor: 'Dr. Jonathan R. Vincent',
  courseName: 'CHEM 101: Introduction to Chemistry',
  rating: 4.5,
  image: () => ({
    src: 'https://via.placeholder.com/400x250',
    alt: 'Course Image'
  }),
  widget: null,
  subject: 'chemistry',
  link: '#',
  eligibility: 'eligible',
  availability: 60,
  capacity: 100,
  showIcon: false
})
const percentageFull = Math.round(((props.capacity - props.availability) / props.capacity) * 100)
const iconAsset = subjectAssetMapping.find((item) => item.value === props.subject)
const marginLeft = '38px'
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
    style="overflow: hidden; cursor: pointer"
    v-on:click="defaultEvent(link)"
    class="course-card p-ripple"
    v-ripple="{
      pt: {
        root: { style: 'background: rgba(83,83,83, 0.1)' }
      }
    }"
    :pt="{
      root: (options) => ({
        class: ['course-select']
      }),
      content: (options) => ({
        style: {
          padding: '0',
          height: '48px'
        }
      }),
      body: (options) => ({
        style: {
          paddingTop: '0'
        }
      })
    }"
  >
    <template #header>
      <div class="pb-2">
        <img :src="image.src" :alt="image.alt" class="w-full" />
      </div>
    </template>
    <template #title>
      <div class="flex flex-row gap-2 items-center">
        <Icon v-if="showIcon" :icon="iconAsset?.icon as string" width="40" height="40" class="text-primary" />
        <span>{{ courseName }}</span>
      </div>
    </template>
    <template #subtitle>
      <div class="flex flex-row subtit">
        <div :class="`flex flex-row mr-3 items-center gap-1 ml-[${marginLeft}]`">
          <span>{{ instructor }}</span>
        </div>
        <div class="flex flex-row items-center gap-1">
          <Icon icon="ph:star" width="25" height="25" />
          <span>{{ rating }}</span>
        </div>
      </div>
    </template>
    <template #content>
      <div class="flex flex-row items-center gap-2">
        <ProgressBar
          :value="percentageFull"
          class="w-full"
          :pt="{
            root: (options) => ({
              class: ['my-3 sign-up-progress rounded-md']
            }),
            label: (options) => ({
              class: ['progress-label']
            })
          }"
          >{{ availability }} left</ProgressBar
        >
      </div>

      <div :class="`flex flex-row items-center ml-[${marginLeft}] gap-2 eligibility`">
        <Icon
          v-show="eligibility === 'eligible'"
          icon="ph:check-circle"
          width="25"
          height="25"
          class="text-secondary"
        />
        <Icon
          v-show="eligibility === 'uneligible'"
          icon="ph:x-circle"
          width="25"
          height="25"
          class="text-error"
        />
        <Icon
          v-show="eligibility === 'uncertain'"
          icon="ph:question"
          width="25"
          class="text-uncertain"
          height="25"
        />
        <div class="message">
          {{
            eligibility === 'eligible'
              ? 'You can sign up in this semester'
              : eligibility === 'uneligible'
                ? "You can't sign up in this semester"
                : 'You may be eligible this semester'
          }}
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped>
/* use container queries to define responsize font size and icon sizes */
/* container width > 0px, title font size 0.86 rem */
/* container width > 354px, title font size 1.3 rem */
/* container width > 768px, title font size 1.5 rem */

@container (min-width: 0px) {
  /* title */
  .course-card .p-card-title span {
    font-size: 0.86rem;
  }
  /* subtitle */
  .course-card .subtit {
    font-size: 0.78rem;
  }
}

@container (min-width: 354px) {
  .course-card .p-card-title span {
    font-size: 1.3rem;
  }
  /* subtitle */
  .course-card .subtit {
    font-size: 0.91rem;
  }
}

@container (min-width: 768px) {
  .course-card .p-card-title span {
    font-size: 1.5rem;
  }
  /* subtitle */
  .course-card .subtit {
    font-size: 1.05rem;
  }
}

.course-select {
  border: 1px solid var(--gray-line-color);
  box-shadow: none;
  transition: all 0.3s;
  container-type: inline-size;
}
.course-select:hover {
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  transform: scale(1.01);
}
.course-select .eligibility {
  display: none;
}
.course-select .sign-up-progress {
  transition: all 0.3s;
}
.course-select:hover .eligibility {
  display: flex;
}
.course-select:hover .sign-up-progress {
  margin-top: 0;
  margin-bottom: 8px;
  height: 10px;
}
</style>
<style global>
.course-select:hover .sign-up-progress .p-progressbar-label {
  display: none;
}
</style>
