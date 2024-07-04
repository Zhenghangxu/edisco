<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import LayoutPage from './LayoutPage.vue'
import { Icon } from '@iconify/vue/dist/iconify.js'
import Button from 'primevue/button'
import type { requirementItem } from '@/components/courseDetail/EligibilityDisplay.vue'
import SessionSelect from '@/components/signUp/SessionSelect.vue'
import CourseCalendar from '@/components/signUp/courseCalendar.vue'

import Stepper from 'primevue/stepper'
import StepperPanel from 'primevue/stepperpanel'
import { calendarPropsDefault } from '@/utils/event-utils'
import Panel from 'primevue/panel'
import Divider from 'primevue/divider'

const selectedSessions = ref(null)
const termCode = ref('')
const campusCode = ref('')
const primarySessionCode = ref('')
const subSessionCode = ref('')
let existingSessionCodeList = reactive([])
const isCurrentStepLoading = ref(false)
const fetchedCampusOfferings: any = ref(null)
const fetchedPrimarySessionOfferings: any = ref(null)
const fetchedSubSessionOfferings: any = ref(null)
const fetchedTermOfferings: any = ref(null)
let sessionObj: any = reactive({})
const FCData = ref<Record<string, any>>({})
const totalSteps = 4
const formRef = ref()
const currentStep: any = ref(0)
const isScheduleReady = ref(false)
const isSubmitPending = ref(false);

// Form Data
// TODO: sync with reactive
const handleSelectedTerm = (selectedTerm: any) => {
  if (selectedTerm !== null) {
    termCode.value = selectedTerm.termCode
  } else {
    termCode.value = ''
  }
}

const handleSelectedCampus = (selectedCampus: any) => {
  if (!selectedCampus) {
    campusCode.value = ''
    return
  }
  campusCode.value = selectedCampus.campusCode
}
const handleSelectedPrimarySession = (selectedPrimarySession: any) => {
  if (!selectedPrimarySession) {
    primarySessionCode.value = ''
    return
  }
  primarySessionCode.value = selectedPrimarySession.sessionID
}

const handleSelectedSubSession = (selectedSubSession: any) => {
  if (!selectedSubSession) {
    subSessionCode.value = ''
    return
  }
  subSessionCode.value = selectedSubSession.sessionID
}

// Watch Step Change
watch(currentStep, (newVal: any) => {
  onActiveStepChange(newVal)
})

// Watch selection changes: termCode, campusCode, primarySessionCode, subSessionCode
watch([primarySessionCode, subSessionCode, existingSessionCodeList], (newVal) => {
  isCurrentStepLoading.value = true
  updateScheduleData()
  isCurrentStepLoading.value = false
})

const submitForm = async (formEle:any, data:any) => {
  isSubmitPending.value = true
  // timer for 1s
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log('submitSuccess')
  isSubmitPending.value = false
}

const onActiveStepChange = async (activeStep: number) => {
  if (activeStep === 0) {
    console.log('Term Selected')
  } else if (activeStep === 1) {
    if (fetchedCampusOfferings.value) return
    isCurrentStepLoading.value = true
    const offerObj = await getOfferings(props.courseCode, termCode.value)
    fetchedCampusOfferings.value = offerObj.offering || []
    isCurrentStepLoading.value = false
  } else if (activeStep === 2) {
    if (fetchedPrimarySessionOfferings.value) return
    isCurrentStepLoading.value = true
    sessionObj = await getSessions(campusCode.value, termCode.value, props.courseCode, false)
    fetchedPrimarySessionOfferings.value = sessionObj.filter(
      (session: any) => session.type === 'Lecture'
    )
    isCurrentStepLoading.value = false
  } else if (activeStep === 3) {
    if (fetchedSubSessionOfferings.value) return
    isCurrentStepLoading.value = true
    fetchedSubSessionOfferings.value = sessionObj.filter(
      (session: any) => session.type === 'Tutorial' || session.type === 'Lab'
    )
    console.log('Sub Session Selected')
    isCurrentStepLoading.value = false
  } else if (activeStep === 4) {
    console.log('Review Selected')
  }
}

export interface signUpProps {
  courseTitle: string
  subtitle: string
  description: string
  availability: number
  semesters: string[]
  campuses: string[]
  requirements: eligibilityInfo
  skills: string[]
  recommendedCourses: courseRecommendation[]
  reviews: review[]
  moreInfo: string
  courseCode?: string
  signUpAction: () => void
  nextStepEnabled: boolean
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

const nextStep = () => {
  currentStep.value++
  if (currentStep.value === 5) {
    submitForm(formRef.value, {
      termCode: termCode.value,
      campusCode: campusCode.value,
      primarySessionCode: primarySessionCode.value,
      subSessionCode: subSessionCode.value
    });
  }
}

const formatTime = (sessionCode: string) => {
  if (sessionObj.length === 0 || !sessionObj) return 'Time Not Available'
  console.log('Session Obj', sessionObj)
  const session = sessionObj.filter((session: any) => session.sessionID === sessionCode)[0]
  // we also need to convert the ISO string into time format
  // e.g. 2022-02-05T10:00:00Z => 10:00AM
  return `${session.start.toDateString()} ${session.start.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })} - ${session.end.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })}`
}

const prevStep = () => {
  if (currentStep.value === 0) {
    if (window.history.length > 1) {
      window.history.back()
    }
    return
  }
  currentStep.value--
}

// Async Request

const getTerms = async (courseCode: string) => {
  // wait 1s
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [
    {
      termCode: '00102',
      title: 'Spring 2022',
      subTitle: 'January to April',
      avatar: '/images/spring.svg'
    },
    {
      termCode: '00103',
      title: 'Fall 2022',
      subTitle: 'September to December',
      avatar: '/images/fall.svg'
    }
  ]
}

const updateScheduleData = () => {
  isScheduleReady.value = false
  // use the code to get the selected sessions
  selectedSessions.value = sessionObj.filter((session: any) => {
    return (
      session.sessionID === primarySessionCode.value ||
      session.sessionID === subSessionCode.value ||
      session.type === 'Exsiting'
    )
  })
  console.log('Selected Sessions')
  FCData.value = convertToFCData(selectedSessions.value)
}

const getOfferings = async (courseCode: string, termCode: string) => {
  // wait 1s
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    termCode: '00102',
    termName: 'Spring 2022',
    termDuration: 'January to April',
    offering: [
      {
        title: 'Main Campus',
        subTitle: 'Waterloo',
        campusCode: '001',
        disabled: true,
        alertMessage: 'This campus requires on-site attendance.'
      },
      {
        title: 'Downtown Campus',
        subTitle: 'Toronto',
        campusCode: '002'
      },
      {
        title: 'Online',
        subTitle: 'Global - Eastern Time Zone',
        campusCode: '003'
      }
    ]
  }
}

const getSessions = async (
  campusCode: any,
  termCode: any,
  courseCode: any,
  isExisting: boolean = false
) => {
  // wait 1s
  await new Promise((resolve) => setTimeout(resolve, 500))
  const existingList = [
    {
      title: 'Dr Jonathan R. Vincent',
      subTitle: 'Thursday, 11:30AM - 1:30PM',
      sessionID: '006',
      type: 'Exsiting',
      alertMessageType: 'info',
      // start from 2022-02-05, 10:00AM, end at 2022-02-05, 12:00PM
      start: new Date('2024-06-20T16:00:00Z'),
      end: new Date('2022-06-20T18:00:00Z'),
      recurring: {
        frequency: 'weekly',
        days: ['Monday', 'Wednesday']
      }
    },
    {
      title: 'Dr Sarah Jane Smith',
      subTitle: 'Friday, 11:30AM - 1:30PM',
      sessionID: '007',
      type: 'Exsiting',
      start: new Date('2024-06-21T15:00:00Z'),
      end: new Date('2024-06-21T17:00:00Z'),
      recurring: {
        frequency: 'weekly',
        days: ['Tuesday', 'Thursday']
      }
    }
  ]
  const filterResult = [
    {
      title: 'Dr Jonathan R. Vincent',
      subTitle: 'Monday & Wednesday, 11:30AM - 1:30PM',
      sessionID: '001',
      avatar: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
      type: 'Tutorial',
      alertMessageType: 'info',
      // start from 2022-02-05, 10:00AM, end at 2022-02-05, 12:00PM
      start: new Date('2024-06-17T16:00:00Z'),
      end: new Date('2022-06-17T18:00:00Z'),
      recurring: {
        frequency: 'weekly',
        days: ['Monday', 'Wednesday']
      }
    },
    {
      title: 'Dr Sarah Jane Smith',
      subTitle: 'Tuesday & Thursday, 11:30AM - 1:30PM',
      sessionID: '002',
      type: 'Tutorial',
      start: new Date('2024-06-18T15:00:00Z'),
      end: new Date('2024-06-18T17:00:00Z'),
      recurring: {
        frequency: 'weekly',
        days: ['Tuesday', 'Thursday']
      }
    },
    {
      title: 'Dr Sarah Jane Smith',
      subTitle: 'Tuesday & Thursday, 11:30AM - 1:30PM',
      alertMessage: '',
      sessionID: '003',
      type: 'Lecture',
      start: new Date('2024-06-19T16:00:00Z'),
      end: new Date('2024-06-19T19:00:00Z'),
      recurring: {
        frequency: 'weekly',
        days: ['Tuesday', 'Thursday']
      }
    },
    {
      title: 'Dr Sarah Jane Smith',
      subTitle: 'Tuesday & Thursday, 11:30AM - 1:30PM',
      alertMessage: 'This session has conflict with your current schedule',
      sessionID: '004',
      type: 'Tutorial',
      disabled: true,
      start: new Date('2024-06-20T20:00:00Z'),
      end: new Date('2024-06-20T23:00:00Z'),
      recurring: {
        frequency: 'weekly',
        days: ['Tuesday', 'Thursday']
      }
    }
  ]

  if (isExisting) {
    return existingList
  } else {
    return filterResult.concat(existingList)
  }
}

const convertToFCData = (data: any) => {
  if (!data) return
  isScheduleReady.value = false
  // get the event date that is the earliest
  const eventDate = data.map((item: any) => {
    return item.start
  })
  // eventDate format: new Date()
  const minDate = new Date(Math.min.apply(null, eventDate))
  const eventData = data.map((item: any) => {
    return {
      id: item.sessionID,
      start: item.start,
      end: item.end,
      backgroundColor:
        item.type === 'Lecture'
          ? 'var(--primary-color)'
          : item.type === 'Exsiting'
            ? 'var(--uncertain-muted)'
            : 'var(--secondary-color)'
    }
  })
  isScheduleReady.value = true
  return {
    ...calendarPropsDefault,
    initialDate: minDate,
    events: eventData
  }
}

// if eligibility is eligible => headerClass = 'secondary-muted'
// if eligibility is uneligible => headerClass = 'error-muted'
// if eligibility is uncertain => headerClass = 'uncertain-muted
const props = withDefaults(defineProps<signUpProps>(), {
  courseTitle: 'CBSE 122',
  rating: 4.5,
  courseCode: 'CBSE122',
  subSessionType: 'Tutorial',
  imagePath:
    'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  subtitle: 'Physics for class 12 students',
  nextStepEnabled: true,
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
  isScheduleReady.value = false
  isCurrentStepLoading.value = true
  const existingCourse = await getSessions('', '', '', true)
  existingSessionCodeList = existingCourse.map((session: any) => session.sessionID)
  FCData.value = convertToFCData(existingCourse)
  const termObj = await getTerms(props.courseCode)
  fetchedTermOfferings.value = termObj
  isCurrentStepLoading.value = false
})

// onMounted(async () => {
//   isCurrentStepLoading.value = true
//   const offerObj = (await getTerms(props.courseCode)) || {}
//   fetchedTermOfferings.value = offerObj || []
//   isCurrentStepLoading.value = false
// })
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
      className="items-center md:items-start scroll-smooth w-full md:w-auto"
    >
      <div class="flex flex-col gap-4 items-start w-full">
        <Button
          class="text-gray-800 bg-transparent hover:bg-slate-200 border-none font-sans py-3 px-6 text-xl font-base flex flex-row gap-2"
          style="width: fit-content"
          @click="prevStep"
        >
          <Icon icon="ph:caret-left" width="25" height="25" class="text-gray-800" />
          <span>{{ currentStep === 0 ? 'Cancel Sign Up' : 'Back' }}</span>
        </Button>
        <br />
        <div class="card flex justify-content-center w-full">
          <form action="https://www.google.com" method="POST" ref="formRef" class="w-full">
            <Stepper
              orientation="vertical"
              linear
              :activeStep="currentStep"
              class="w-[90vw] md:w-[30rem]"
            >
              <StepperPanel header="Confirm Term">
                <template #content="{ highlighted, option }">
                  <div class="flex flex-column h-12rem">
                    <div
                      class="flex-auto flex justify-content-center align-items-center font-medium"
                    >
                      <SessionSelect
                        :isLoading="isCurrentStepLoading"
                        :fetchedOfferings="fetchedTermOfferings"
                        @update:selectedSession="handleSelectedTerm"
                        name="sessionSelect"
                      />
                    </div>
                  </div>
                </template>
              </StepperPanel>
              <StepperPanel header="Confirm Campus">
                <template #content="{ highlighted }">
                  <div class="flex flex-column h-12rem">
                    <div
                      class="flex-auto flex justify-content-center align-items-center font-medium"
                    >
                      <SessionSelect
                        :isLoading="isCurrentStepLoading"
                        :fetchedOfferings="fetchedCampusOfferings"
                        @update:selectedSession="handleSelectedCampus"
                        name="sessionSelect"
                      />
                    </div>
                  </div>
                </template>
              </StepperPanel>
              <StepperPanel header="Lecture">
                <template #content="{ highlighted }">
                  <div class="flex flex-column h-12rem">
                    <div
                      class="flex-auto flex justify-content-center align-items-center font-medium"
                    >
                      <SessionSelect
                        :isLoading="isCurrentStepLoading"
                        :fetchedOfferings="fetchedPrimarySessionOfferings"
                        @update:selectedSession="handleSelectedPrimarySession"
                        name="primarySessionSelect"
                      />
                    </div>
                  </div>
                </template>
              </StepperPanel>
              <StepperPanel :header="subSessionType">
                <template #content="{ nextCallback }">
                  <div class="flex flex-column h-12rem">
                    <div
                      class="flex-auto flex justify-content-center align-items-center font-medium"
                    >
                      <SessionSelect
                        :isLoading="isCurrentStepLoading"
                        :fetchedOfferings="fetchedSubSessionOfferings"
                        @update:selectedSession="handleSelectedSubSession"
                        name="subSessionSelect"
                      />
                    </div>
                  </div>
                </template>
              </StepperPanel>
              <StepperPanel header="Review">
                <Panel
                  :pt="{
                    header: (options) => ({
                      class: ['justify-center']
                    })
                  }"
                >
                  <template #header>
                    <div class="flex flex-col gap-2 py-5">
                      <div class="review-section flex flex-row gap-2">
                        <Icon
                          icon="ph:book-duotone"
                          width="35"
                          height="35"
                          class="text-secondary"
                        />
                        <div>
                          <h5 class="m-0 text-lg">Course</h5>
                          <p class="m-0">{{ courseTitle }}: {{ subtitle }}</p>
                          <Divider />
                        </div>
                      </div>
                      <div class="review-section flex flex-row gap-2">
                        <Icon
                          icon="ph:clock-duotone"
                          width="35"
                          height="35"
                          class="text-secondary"
                        />
                        <div>
                          <h5 class="m-0 text-lg">Time</h5>
                          <p class="m-0">Lecture: {{ subtitle }}</p>
                          <p class="m-0">{{ subSessionType }}: time</p>
                          <Divider />
                        </div>
                      </div>
                      <div class="review-section flex flex-row gap-2">
                        <Icon
                          icon="ph:map-pin-duotone"
                          width="35"
                          height="35"
                          class="text-secondary"
                        />
                        <div>
                          <h5 class="m-0 text-lg">Campus</h5>
                          <p class="m-0" v-if="campusCode">{{ campusCode }}</p>
                        </div>
                      </div>
                    </div>
                  </template>
                </Panel>
                <div class="md:hidden">
                  <CourseCalendar
                    :calendarOptions="FCData"
                    :state="isScheduleReady ? 'default' : 'loading'"
                  />
                </div>
              </StepperPanel>
            </Stepper>
            <div class="flex flex-row w-full justify-end ">
              <Button
                class="py-3 px-6 mt-10 rounded-md md:hidden w-[200px] justify-center"
                @click="nextStep"
                :loading="isSubmitPending"
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
          </form>
        </div>
      </div>
    </LayoutPage>
    <LayoutPage
      type="third"
      internalLayout="vertical"
      gap="0"
      padding="0"
      className="justify-between hidden md:block"
    >
      <!-- <Video/> -->
      <!-- <BasicInfo/> -->
      <div class="flex flex-col gap-4 scale-column">
        <!-- Inject title, rating, subtitle, credit, description into BasicStat -->
        <div>
          <span class="title font-serif text-2xl font-bold text-slate-800">{{ courseTitle }}</span>
          :
          <span class="subtitle font-sans text-xl text-slate-600">
            {{ subtitle }}
          </span>
        </div>

        <!-- Button -->
      </div>
      <CourseCalendar :calendarOptions="FCData" :state="isScheduleReady ? 'default' : 'loading'" />
      <div class="flex flex-row justify-end">
        <!-- disable the button  if not eligible -->
        <Button
          type="submit"
          class="py-3 px-6 mt-10 rounded-md"
          style="width: fit-content"
          :loading="isSubmitPending"
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
</style>
