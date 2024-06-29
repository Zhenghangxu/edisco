import type { Meta, StoryObj } from '@storybook/vue3'
import CourseCalendar from '@/components/signUp/courseCalendar.vue'

const meta = {
  title: 'Molecules/CourseCalendar',
  component: CourseCalendar,
  render: () => ({
    components: { MyPage: CourseCalendar },
    template: '<my-page />'
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof CourseCalendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
}