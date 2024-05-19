import type { Meta, StoryObj } from '@storybook/vue3'
import { within, userEvent, expect } from '@storybook/test'
import SelectInterestPage from '../../views/SelectInterest.vue'

const meta = {
  title: 'Pages/Login',
  component: SelectInterestPage,
  render: () => ({
    components: { MyPage: SelectInterestPage },
    template: '<my-page />'
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
} satisfies Meta<typeof SelectInterestPage>

export default meta
type Story = StoryObj<typeof meta>

export const SelectInterest: Story = {}
