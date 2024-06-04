import type { Meta, StoryObj } from '@storybook/vue3'
import CourseDetailPage from '../../views/CourseDetailPage.vue'

const meta = {
  title: 'Pages/CourseDetailsFull',
  component: CourseDetailPage,
  render: () => ({
    components: { MyPage: CourseDetailPage },
    template: '<my-page />'
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
} satisfies Meta<typeof CourseDetailPage>

export default meta
type Story = StoryObj<typeof meta>

export const LoggedInHomePage: Story = {}
