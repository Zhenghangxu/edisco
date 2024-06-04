import type { Meta, StoryObj } from '@storybook/vue3'
import CourseDetailPage from '../../views/CourseDetail.vue'

const meta = {
  title: 'Containers/BasicPageContainer',
  component: CourseDetailPage,
  render: () => ({
    components: { MyPage: CourseDetailPage },
    template: '<my-page />'
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof CourseDetailPage>

export default meta
type Story = StoryObj<typeof meta>

export const CourseDetail: Story = {}
