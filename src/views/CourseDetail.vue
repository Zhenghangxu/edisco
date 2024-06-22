<script setup lang="ts">
import { computed } from 'vue'
import LayoutPage from './LayoutPage.vue'
import { Icon } from '@iconify/vue/dist/iconify.js'
import Button from 'primevue/button'
import Image from 'primevue/image'
import Panel from 'primevue/panel'
import BasicStats from '@/components/courseDetail/BasicStats.vue'
import EnrollmentStats from '@/components/courseDetail/EnrollmentStats.vue'
import EligibilityDisplay from '@/components/courseDetail/EligibilityDisplay.vue'
import type { requirementItem } from '@/components/courseDetail/EligibilityDisplay.vue'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import InstructorCard from '@/components/courseDetail/InstructorCard.vue'

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
// if eligibility is eligible => headerClass = 'secondary-muted'
// if eligibility is uneligible => headerClass = 'error-muted'
// if eligibility is uncertain => headerClass = 'uncertain-muted
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
      title: 'Professor, Ph.D.',
      description: "Dr. Jonathan R. Vincent is a Professor of Chemistry at the University of California, Berkeley. He received his Ph.D. in Chemistry from the University of California, Berkeley, and his B.S. in Chemistry from the University of California, Los Angeles. Dr. Vincent has published over 100 research articles in the field of chemistry and has received numerous awards for his research. He is a Fellow of the American Chemical Society and a member of the National Academy of Sciences. Dr. Vincent has taught chemistry at the undergraduate and graduate levels for over 20 years and has mentored many students in his research laboratory. He is passionate about teaching and is dedicated to helping students succeed in their studies.",
      url: '#'
    },
    {
      name: 'Dr. Sarah Jane Smith',
      image: '/images/mr-cup-fabien-barral-history-unsplash.jpg',
      title: 'Associate Professor, Ph.D.',
      description: "Dr. Sarah Jane Smith is an Associate Professor of History at the University of California, Berkeley. She received her Ph.D. in History from the University of California, Berkeley, and her B.A. in History from the University of California, Los Angeles. Dr. Smith's research focuses on the history of the United States in the 20th century, with an emphasis on social movements and political activism. She has published two books and numerous articles on these topics. Dr. Smith has taught history at the undergraduate and graduate levels for over 10 years and has won several teaching awards. She is committed to helping students develop critical thinking skills and engage with the past in meaningful ways.",
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
      <!-- <LocationAndTime /> -->
      <!-- <Instructors /> -->
      <!-- <Requirements /> -->
      <!-- <Skills /> -->
      <!-- <RecommendedCourses /> -->
      <!-- <Reviews /> -->
      <div class="flex flex-col gap-4 items-end">
        <Image
          :src="imagePath"
          width="100%"
          :pt="{
            image: (options) => ({
              class: ['rounded-lg']
            })
          }"
        ></Image>
        <div class="mt-3 md:mt-[80px]"></div>
        <div class="card">
          <TabView
            :pt="{
              root: (options) => ({
                class: ['w-full']
              })
            }"
          >
            <TabPanel header="Instructors">
              <p class="mb-4">
                Meet the instructors for this course:
              </p>
              <div class="flex flex-col gap-4">
                <InstructorCard
                  v-for="instructor in instructors"
                  :key="instructor.name"
                  :instructorName="instructor.name"
                  :title="instructor.title"
                  :desc="instructor.description"
                  :image="instructor.image"
                />
              </div>
            </TabPanel>
            <TabPanel header="Skills">
              <p class="m-0">
                Students are expected to learn a wide-range of skills in this course (Please note that this is not an exhaustive list):

              </p>
            </TabPanel>
            <TabPanel header="More Information">
              <p class="mb-4">
                More information about the course can be found here:
              </p>
              <Panel
                class="details-left-panel"
                :pt="{
                  header: (options) => ({
                    class: ['border-0 bg-transparent']
                  }),
                  content: (options) => ({
                    class: ['border-0 bg-transparent']
                  })
                }"
              >
                <template #header>
                  <div class="font-bold text-2xl font-serif">Textbook</div>
                </template>
                <p class="m-0">
                  This course uses the textbook "Chemistry: The Central Science" by Brown, LeMay. We also use the online platform Mastering Chemistry for homework assignments and quizzes. The textbook and online platform are available for purchase at the campus bookstore or online.
                  To get the most out of this course, we recommend that you read the assigned chapters before each lecture and complete the homework assignments on time. The textbook and online platform are valuable resources that will help you succeed in this course.
                  To purchase the textbook and access the online platform, please check with the campus bookstore or visit the publisher's website. 
                  Please check with the instructor for the most up-to-date information on the required textbook and online platform.
                </p>
              </Panel>
              <Panel
                class="details-left-panel"
                :pt="{
                  header: (options) => ({
                    class: ['border-0 bg-transparent']
                  }),
                  content: (options) => ({
                    class: ['border-0 bg-transparent']
                  })
                }"
              >
                <template #header>
                  <div class="font-bold text-2xl font-serif">Syllabus</div>
                </template>
                <p class="m-0">
                  The syllabus for this course is available online. Please check the course website for the most up-to-date information on the course schedule, assignments, and exams. The syllabus will outline the topics covered in each lecture, the reading assignments, and the due dates for homework assignments and exams. The syllabus is a valuable resource that will help you stay organized and on track throughout the semester. Please review the syllabus carefully and contact the instructor if you have any questions or concerns.
                </p>
              </Panel>
              <Panel
                class="details-left-panel"
                :pt="{
                  header: (options) => ({
                    class: ['border-0 bg-transparent']
                  }),
                  content: (options) => ({
                    class: ['border-0 bg-transparent']
                  })
                }"
              >
                <template #header>
                  <div class="font-bold text-2xl font-serif">Contact</div>
                </template>
                <p class="m-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                </p>
              </Panel>
            </TabPanel>
          </TabView>
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
          :rating="rating"
          :subtitle="subtitle"
          :credit="credit"
          :description="description"
        />
        <EnrollmentStats
          :availability="availability"
          :capacity="capacity"
          :daysLeftForSignup="daysLeftForSignup"
        />
        <EligibilityDisplay :requirements="requirements" />

        <!-- Button -->
      </div>
      <div class="flex flex-row justify-end">
        <!-- disable the button  if not eligible -->
        <Button
          type="submit"
          class="py-3 px-6 mt-10 rounded-md"
          style="width: fit-content"
          :disabled="requirements.eligibility === 'uneligible'"
        >
          <div class="flex flex-row gap-2 items-center text-lg font-sans">
            <span>{{
              requirements.eligibility === 'eligible'
                ? 'Sign Up'
                : requirements.eligibility === 'uneligible'
                  ? 'Not Eligible'
                  : 'Contact Us'
            }}</span>
            <Icon
              v-show="requirements.eligibility !== 'uneligible'"
              :icon="
                requirements.eligibility === 'eligible' ? 'ph:arrow-right' : 'ph:phone-call-fill'
              "
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
