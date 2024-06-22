<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LayoutPage from './LayoutPage.vue'
import { Icon } from '@iconify/vue/dist/iconify.js'
import Button from 'primevue/button'
import BasicStats from '@/components/courseDetail/BasicStats.vue'
import EnrollmentStats from '@/components/courseDetail/EnrollmentStats.vue'
import EligibilityDisplay from '@/components/courseDetail/EligibilityDisplay.vue'
import type { requirementItem } from '@/components/courseDetail/EligibilityDisplay.vue'

import loadingSkeleton from '@/components/signUp/loadingSkeleton.vue'
import Listbox from 'primevue/listbox'
import Stepper from 'primevue/stepper'
import StepperPanel from 'primevue/stepperpanel'

const selectedSession = ref(null)
const nextButton = ref()
const prevButton = ref(null)
const isNextStepLoading = ref(false)
const isPrevStepLoading = ref(false)
const isCurrentStepLoading = ref(false)
const fetchedOfferings: any = ref([])
const totalSteps = 3

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
  courseCode?: string
  signUpAction: () => void
  nextStepEnabled: boolean
  goBack: () => void
  subSessionType?: string
}

interface simpleInstructor {
  name: string
  image: string
  url: string
  description: string
  title: string
}

interface eligibilityInfo {
  eligibility: 'eligible' | 'uneligible' | 'uncertain'
  eligibilityRequirements: requirementItem[]
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

const currentStep = ref(0)

const nextStep = () => {
  isNextStepLoading.value = true
  setTimeout(() => {
    console.log('next step')
  }, 500)
  currentStep.value++
  isNextStepLoading.value = false
}

const prevStep = () => {
  isPrevStepLoading.value = true
  if (currentStep.value === 0) {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      isPrevStepLoading.value = false
    }
    return
  }
  currentStep.value--
  isPrevStepLoading.value = false
}

// Async Request

const getOfferings = async (courseCode: string) => {
  // wait 1s
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    termCode: '00102',
    termName: 'Spring 2022',
    termDuration: 'January to April',
    offering: [
      {
        campus: 'Main Campus',
        subTitle: 'Waterloo',
        campusCode: '001',
        alertMessage: 'This campus requires on-site attendance.'
      },
      {
        campus: 'Downtown Campus',
        subTitle: 'Toronto',
        campusCode: '002'
      },
      {
        campus: 'Online',
        subTitle: 'Global - Eastern Time Zone',
        campusCode: '003'
      }
    ]
  }
}

const getSessions = async (campusCode: any) => {
  // wait 1s
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [
    {
      id: '001',
      type: 'Tutorial',
      title: 'Tutorial Session',
      instructor: 'Dr Jonathan R. Vincent',
      start: new Date('2022-01-01T10:00:00Z'),
      end: new Date('2022-01-01T12:00:00Z'),
      recurring: {
        frequency: 'weekly',
        days: ['Monday', 'Wednesday']
      }
    },
    {
      id: '002',
      type: 'Lecture',
      title: 'Lecture Session',
      instructor: 'Dr Sarah Jane Smith',
      start: new Date('2022-02-01T10:00:00Z'),
      end: new Date('2022-02-01T12:00:00Z'),
      recurring: {
        frequency: 'weekly',
        days: ['Tuesday', 'Thursday']
      }
    }
  ]
}

// if eligibility is eligible => headerClass = 'secondary-muted'
// if eligibility is uneligible => headerClass = 'error-muted'
// if eligibility is uncertain => headerClass = 'uncertain-muted
const props = withDefaults(defineProps<courseDetailProps>(), {
  title: 'CBSE 122',
  rating: 4.5,
  courseCode: 'CBSE122',
  subSessionType: 'Tutorial',
  imagePath:
    'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  subtitle: 'Physics for class 12 students',
  nextStepEnabled: true,
  goBack: () => {
    window.history.back()
  },
  description:
    'This course is designed for students who are preparing for their class 12 board exams. The course covers all the topics in the CBSE syllabus for class 12 physics.',
  instructors: () => [
    {
      name: 'Dr. Jonathan R. Vincent',
      image: '/images/hans-reniers-lQGJCMY5qcM-unsplash.jpg',
      title: 'Professor, Ph.D.',
      description:
        'Dr. Jonathan R. Vincent is a Professor of Chemistry at the University of California, Berkeley. He received his Ph.D. in Chemistry from the University of California, Berkeley, and his B.S. in Chemistry from the University of California, Los Angeles. Dr. Vincent has published over 100 research articles in the field of chemistry and has received numerous awards for his research. He is a Fellow of the American Chemical Society and a member of the National Academy of Sciences. Dr. Vincent has taught chemistry at the undergraduate and graduate levels for over 20 years and has mentored many students in his research laboratory. He is passionate about teaching and is dedicated to helping students succeed in their studies.',
      url: '#'
    },
    {
      name: 'Dr. Sarah Jane Smith',
      image: '/images/mr-cup-fabien-barral-history-unsplash.jpg',
      title: 'Associate Professor, Ph.D.',
      description:
        "Dr. Sarah Jane Smith is an Associate Professor of History at the University of California, Berkeley. She received her Ph.D. in History from the University of California, Berkeley, and her B.A. in History from the University of California, Los Angeles. Dr. Smith's research focuses on the history of the United States in the 20th century, with an emphasis on social movements and political activism. She has published two books and numerous articles on these topics. Dr. Smith has taught history at the undergraduate and graduate levels for over 10 years and has won several teaching awards. She is committed to helping students develop critical thinking skills and engage with the past in meaningful ways.",
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
      eligibility: 'uncertain',
      eligibilityRequirements: [
        {
          requirementText: 'Must have a high school diploma',
          isRequirementMet: false
        },
        {
          requirementText: 'Must complete the prerequisite course CBSE Class 11 Physics',
          isRequirementMet: true
        },
        {
          requirementText: 'Must have a basic understanding of mathematics',
          isRequirementMet: true
        }
      ]
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

onMounted(async () => {
  isCurrentStepLoading.value = true
  const offerObj = (await getOfferings(props.courseCode)) || {}
  fetchedOfferings.value = offerObj.offering || []
  isCurrentStepLoading.value = false
})
</script>

<template>
  <LayoutPage
    type="full"
    internalLayout="vertical"
    gap="0"
    padding="0"
    className="relative bg-background flex-nowrap flex-col-reverse justify-around gap-8 lg:gap-[20px] md:flex-row md:items-start items-center p-2 my-8 md:my-[150px] md:mb-[300px] px-[15px] md:px-[5%]"
  >
    <LayoutPage
      type="half"
      internalLayout="vertical"
      gap="0"
      padding="0"
      className="items-center md:items-start scroll-smoo th"
    >
      <div class="flex flex-col gap-4 items-start">
        <Button
          class="text-gray-800 bg-transparent hover:bg-slate-200 border-none font-sans py-3 px-6 text-xl font-base flex flex-row gap-2"
          style="width: fit-content"
          :loading="isPrevStepLoading"
          @click="prevStep"
        >
          <Icon icon="ph:caret-left" width="25" height="25" class="text-gray-800" />
          <span>{{ currentStep === 0 ? 'Cancel Sign Up' : 'Back' }}</span>
        </Button>
        <br />
        <div class="card flex justify-content-center">
          <loadingSkeleton type="paragraph" v-if="isCurrentStepLoading" />
          <Stepper
            orientation="vertical"
            linear
            :activeStep="currentStep"
            v-if="!isCurrentStepLoading"
            class="w-full md:w-[40rem]"
          >
            <StepperPanel header="Confirm Term & Campus">
              <template #content="{ highlighted }">
                <div class="flex flex-column h-12rem">
                  <div class="flex-auto flex justify-content-center align-items-center font-medium">
                    <Listbox
                      v-model="selectedSession"
                      v-if="fetchedOfferings"
                      :options="fetchedOfferings"
                      optionLabel="name"
                      class="w-full md:w-full"
                      listStyle="max-height:450px"
                      :pt="{
                        list: (options) => ({
                          class: ['flex', 'flex-col', 'gap-4']
                        }),
                        root: (options) => ({
                          class: ['border-none', 'shadow-none']
                        }),
                        item: (options) => ({
                          class: ['p-6', 'rounded-md']
                        })
                      }"
                    >
                      <template #option="slotProps">
                        <div class="flex flex-row justify-between items-center">
                          <div class="flex flex-col align-items-center gap-3">
                            <div class="text-xl font-serif font-semibold text-slate-800">
                              {{ slotProps.option.campus }}
                            </div>
                            <div class="text-md font-sans text-slate-700">
                              {{ slotProps.option.subTitle }}
                            </div>
                            <div
                              class="text-sm font-sans font-light flex flex-row items-center gap-2"
                              v-if="slotProps.option.alertMessage"
                            >
                              <Icon
                                icon="ph:warning-circle-bold"
                                width="20"
                                height="20"
                                class="text-black-500"
                              />
                              {{ slotProps.option.alertMessage }}
                            </div>
                          </div>
                          <Icon
                            icon="ph:check-circle-fill"
                            width="27"
                            height="27"
                            class="text-secondary opacity-65 item-check"
                          />
                        </div>
                      </template>
                    </Listbox>
                  </div>
                </div>
              </template>
            </StepperPanel>
            <StepperPanel header="Lecture">
              <template #content="{ highlighted }">
                <div class="flex flex-column h-12rem">
                  <div
                    class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium"
                  >
                    Content II
                  </div>
                </div>
              </template>
            </StepperPanel>
            <StepperPanel :header="subSessionType">
              <template #content="{ nextCallback }">
                <div class="flex flex-column h-12rem">
                  <div
                    class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium"
                  >
                    Content III
                  </div>
                </div>
              </template>
            </StepperPanel>
            <StepperPanel header="Review">
              <template>
                <div class="flex flex-column h-12rem">
                  <div
                    class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium"
                  >
                    Content III
                  </div>
                </div>
              </template>
            </StepperPanel>
          </Stepper>
        </div>
      </div>
    </LayoutPage>
    <LayoutPage
      type="side"
      internalLayout="vertical"
      gap="0"
      padding="0"
      className="justify-between"
    >
      <!-- <Video/> -->
      <!-- <BasicInfo/> -->
      <div class="flex flex-col gap-4 scale-column">
        <!-- Inject title, rating, subtitle, credit, description into BasicStat -->
        <BasicStats
          :title="title"
          :subtitle="subtitle"
          :description="description"
          descriptionLabel="Summary"
        />
        <!-- Button -->
      </div>
      <div class="flex flex-row justify-end">
        <!-- disable the button  if not eligible -->
        <Button
          type="submit"
          class="py-3 px-6 mt-10 rounded-md"
          style="width: fit-content"
          :disabled="!nextStepEnabled"
          :loading="isNextStepLoading"
          @click="nextStep"
        >
          <div class="flex flex-row gap-2 items-center text-lg font-sans">
            <span>{{ currentStep < totalSteps ? 'Next Step' : 'Submit' }}</span>
            <Icon
              v-show="nextStepEnabled"
              :icon="nextStepEnabled ? 'ph:arrow-right' : 'ph:phone-call-fill'"
              width="25"
              height="25"
              class="text-white"
            />
          </div>
        </Button>
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
.details-left-panel {
  margin-bottom: 20px;
  @apply leading-6;
}
</style>

<style scoped>
.scale-column {
  container-type: inline-size;
}
/* If container < 292px, become one column */
@container (max-width: 292px) {
  .scale-column .stats {
    grid-template-columns: 1fr !important;
  }
}

.item-check {
  display: none;
}
.p-highlight .item-check {
  display: block;
}
</style>
