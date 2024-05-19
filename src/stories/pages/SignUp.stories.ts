import type { Meta, StoryObj } from '@storybook/vue3'
import { within, userEvent, expect } from '@storybook/test'
import SignUpPage from '../../views/SignUpPage.vue'

const meta = {
  title: 'Pages/Login',
  component: SignUpPage,
  render: () => ({
    components: { MyPage: SignUpPage },
    template: '<my-page />'
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
} satisfies Meta<typeof SignUpPage>

export default meta
type Story = StoryObj<typeof meta>

export const SignUp: Story = {}
