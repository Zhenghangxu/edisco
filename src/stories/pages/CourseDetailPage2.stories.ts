import type { Meta, StoryObj } from '@storybook/vue3'
import SelectCampus from '../../views/SelectCampusTerm.vue'

// TODO: change this back to courseDetail After testing
const meta = {
  title: 'Pages/CourseDetailsFull',
  component: SelectCampus,
  render: () => ({
    components: { MyPage: SelectCampus },
    template: '<my-page />'
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
} satisfies Meta<typeof SelectCampus>

export default meta
type Story = StoryObj<typeof meta>

export const LoggedInHomePageTest: Story = {}
