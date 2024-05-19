import type { Meta, StoryObj } from '@storybook/vue3'
import Home from '../../views/LoggedInHomeView.vue'

const meta = {
  title: 'Pages/LoggedIn',
  component: Home,
  render: () => ({
    components: { MyPage: Home },
    template: '<my-page />'
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
} satisfies Meta<typeof Home>

export default meta
type Story = StoryObj<typeof meta>

export const LoggedInHomePage: Story = {}
