import type { Meta, StoryObj } from '@storybook/vue3'
import CourseCard from '../../components/CourseCard.vue'

const meta = {
  title: 'Molecules/CourseCard',
  component: CourseCard,
  render: () => ({
    components: { MyPage: CourseCard },
    template: '<my-page />'
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof CourseCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    instructor: 'Dr. John Doe',
    courseName: 'CHEM 101: Introduction to Chemistry',
    rating: 4.5,
    image: {
      src: 'https://via.placeholder.com/400x250',
      alt: 'Course Image'
    },
    widget: null,
    subject: 'engineering',
    link: 'https://www.google.com',
    eligibility: 'eligible',
  }
}
