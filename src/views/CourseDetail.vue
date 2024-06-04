<script setup lang="ts">
import { computed } from 'vue'
import LayoutPage from './LayoutPage.vue'
import { Icon } from '@iconify/vue/dist/iconify.js'
import AccordionTab from 'primevue/accordiontab'
import Accordion from 'primevue/accordion'
import semesterCard from '@/components/semesterCard.vue'
import Fieldset from 'primevue/fieldset'
import Button from 'primevue/button'
import Image from 'primevue/image'
import Panel from 'primevue/panel'

export interface courseDetailProps {
  title: string
  rating: number
  subtitle: string
  imagePath: string
  description: string
  instructors: simpleInstructor[]
  daysLeftForSignup: number
  capacity: number
  availability: number
  semesters: string[]
  campuses: string[]
  requirements: eligibilityInfo
  skills: string[]
  recommendedCourses: courseRecommendation[]
  reviews: review[]
  moreInfo: string
  credit?: number
  signUpAction: () => void
}

interface simpleInstructor {
  name: string
  image: string
  url: string
}

interface eligibilityInfo {
  eligibility: 'eligible' | 'uneligible' | 'uncertain'
  eligibilityRequirements: string[]
}

interface courseRecommendation {
  courseName: string
  courseLink: string
  capacity?: number
  availability?: number
}

interface review {
  reviewer: string
  review: string
  rating: number
}

const props = withDefaults(defineProps<courseDetailProps>(), {
  title: 'CBSE 122',
  rating: 4.5,
  imagePath:
    'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  subtitle: 'Physics for class 12 students',
  description:
    'This course is designed for students who are preparing for their class 12 board exams. The course covers all the topics in the CBSE syllabus for class 12 physics.',
  instructors: () => [
    {
      name: 'Dr. Jonathan R. Vincent',
      image: '/images/hans-reniers-lQGJCMY5qcM-unsplash.jpg',
      url: '#'
    },
    {
      name: 'Dr. Sarah Jane Smith',
      image: '/images/mr-cup-fabien-barral-history-unsplash.jpg',
      url: '#'
    }
  ],
  credit: 3,
  daysLeftForSignup: 30,
  capacity: 100,
  availability: 57,
  semesters: () => ['Spring 2022', 'Fall 2022'],
  campuses: () => ['Main Campus', 'Downtown Campus'],
  requirements: () => {
    return {
      eligibility: 'eligible',
      eligibilityRequirements: ['Class 11 Physics', 'Basic Math Skills']
    }
  },
  skills: () => ['Physics', 'Mathematics'],
  recommendedCourses: () => [
    { courseName: 'CBSE Class 12 Chemistry', courseLink: '#', capacity: 100, availability: 60 },
    { courseName: 'CBSE Class 12 Mathematics', courseLink: '#', capacity: 100, availability: 60 }
  ],
  reviews: () => [
    {
      reviewer: 'John Doe',
      review: 'This course was very helpful for my board exams.',
      rating: 4.5
    },
    { reviewer: 'Jane Doe', review: 'The instructors were very knowledgeable.', rating: 4.2 }
  ],
  moreInfo: 'lorem ipsum dolor sit amet '
})
</script>

<template>
  <LayoutPage
    type="full"
    internalLayout="vertical"
    gap="0"
    padding="0"
    className=" relative items-start flex-nowrap justify-around gap-8 lg:gap-[20px] lg:flex-row sm:items-start p-2 my-8 md:my-[50px] px-[15px] md:px-[5%]"
  >
    <LayoutPage type="half" internalLayout="vertical" gap="0" padding="0" className="items-end">
      <!-- <LocationAndTime /> -->
      <!-- <Instructors /> -->
      <!-- <Requirements /> -->
      <!-- <Skills /> -->
      <!-- <RecommendedCourses /> -->
      <!-- <Reviews /> -->
      <div class="max-w-[80%] flex flex-col gap-4 items-end">
        <Image
          :src="imagePath"
          width="100%"
          :pt="{
            image: (options) => ({
              class: ['rounded-lg']
            })
          }"
        ></Image>
        <Panel>
          <template #header>
            <div class="font-semibold text-xl">Instructors</div>
          </template>
          <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </Panel>
        <Panel>
          <template #header>
            <div class="font-semibold text-xl">Skills</div>
          </template>
          <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </Panel>
        <Panel>
          <template #header>
            <div class="font-semibold text-xl">Reviews</div>
          </template>
          <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </Panel>
        <Panel>
          <template #header>
            <div class="font-semibold text-xl">You Might Also Like</div>
          </template>
          <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </Panel>
      </div>
    </LayoutPage>
    <LayoutPage type="side" internalLayout="vertical" gap="0" padding="0" className="">
      <!-- <Video/> -->
      <!-- <BasicInfo/> -->
      <div class="flex flex-col gap-4">
        <div class="flex flex-row items-center gap-6">
          <div class="title font-sans text-2xl font-bold text-slate-800">{{ title }}</div>
          <div class="rating flex flex-row gap-1 items-center">
            <Icon width="20" height="20" icon="ph:star-fill" class="text-yellow"></Icon>{{ rating }}
          </div>
        </div>
        <div class="subtitle font-serif text-lg text-slate-600">
          {{ subtitle }} •
          <span class="font-sans text-xl font-semibold text-primary">{{ credit }}</span> credit
        </div>
        <Accordion :activeIndex="0" class="mt-[-20px]">
          <AccordionTab
            :pt="{
              headerAction: (options) => ({
                class: [
                  'text-base border-none font-light bg-transparent text-slate-500 text-base font-sans pl-0 justify-start gap-4'
                ]
              }),
              header: (options) => ({
                class: ['text-base font-light']
              }),
              //   root: (options) => ({
              //     class: ['max-w-[80%]']
              //   }),
              content: (options) => ({
                class: [
                  'text-sm pl-0 border-solid border-[1px] border-slate-200 rounded-lg !p-4 m-1'
                ]
              })
            }"
          >
            <template #header>
              <!-- get the first 110 wrds of desc -->
              <div class="font-semibold text-gray-600">Description</div>
            </template>
            <div class="desc text-sm">
              {{ props.description }}
            </div>
          </AccordionTab>
        </Accordion>
        <div class="stats font-sans text-base grid grid-cols-2 md:flex-row gap-x-1 gap-y-2">
          <div class="flex col-span-1 flex-row">
            <div class="flex flex-row items-center gap-1">
              <span class="font-semibold font-serif text-2xl text-primary">{{ availability }}</span>
              <span class="text-gray-500">/{{ capacity }} seats left</span>
            </div>
          </div>
          <div class="flex col-span-1 flex-row">
            <div class="flex flex-row items-center gap-1">
              <span class="font-semibold font-serif text-2xl text-primary">{{
                daysLeftForSignup
              }}</span>
              <span class="text-gray-500">Days Left for Signup</span>
            </div>
          </div>
          <div class="flex col-span-1 flex-row gap-1 items-center">
            <Icon icon="ph:building-duotone" width="25" height="25" class="text-secondary" />
            <span class="text-md font-sans">Bradford, Toronto, Online</span>
          </div>
          <div class="flex col-span-1 flex-row gap-1 items-center">
            <Icon icon="ph:calendar-duotone" width="25" height="25" class="text-secondary" />
            <span class="text-md font-sans">Fall 2021, Spring 2022</span>
          </div>
        </div>
        <Panel
          :pt="{
            header: (options) => ({
              class: ['text-xl font-semibold border-0 eligibility-panel-header']
            }),
            root: (options) => ({
              class: ['border-solid border-[1px] border-slate-200 rounded-lg']
            }),
            content: (options) => ({
              class: ['border-0 eligibility-panel-content p-3']
            })
          }"
        >
          <template #header>
            <!-- convert to capital case -->
            <div class="font-semibold capitalize flex flex-row items-center gap-2">
              <Icon
                v-show="requirements.eligibility === 'eligible'"
                icon="ph:check-circle"
                width="25"
                height="25"
                class="text-secondary"
              />
              <Icon
                v-show="requirements.eligibility === 'uneligible'"
                icon="ph:x-circle"
                width="25"
                height="25"
                class="text-error"
              />
              <Icon
                v-show="requirements.eligibility === 'uncertain'"
                icon="ph:question"
                width="25"
                class="text-uncertain"
                height="25"
              />
              <span>{{ requirements.eligibility }}</span>
            </div>
          </template>
          <p class="m-0 leading-6 text-lg">
            You met all requirements to sign up for this course.
            <br /><a href="">View Requirements</a>
          </p>
        </Panel>
        <div class="flex flex-row justify-end">
          <Button type="submit" class="py-3 px-6 mt-4 rounded-md" style="width: fit-content">
            <div class="flex flex-row gap-2 items-center text-lg font-sans">
              <span>Sign Up</span>
              <Icon icon="ph:arrow-right" width="25" height="25" class="text-white" />
            </div>
          </Button>
        </div>
      </div>
      <!-- title,rating,subtitle,desc -->
      <!-- <Stats/> -->
    </LayoutPage>
  </LayoutPage>
</template>

<style>
.eligibility-panel-header {
  border-radius: 0.5rem 0.5rem 0 0 !important;
}
.eligibility-panel-content {
  border-radius: 0 0 0.5rem 0.5rem !important;
}
</style>
