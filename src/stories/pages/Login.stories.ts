import type { Meta, StoryObj } from '@storybook/vue3'
import { within, userEvent, expect } from '@storybook/test'
import Login from '../../views/Login.vue'

const meta = {
  title: 'Example/Page',
  component: Login,
  render: () => ({
    components: { MyPage: Login },
    template: '<my-page />'
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs']
} satisfies Meta<typeof Login>

export default meta
type Story = StoryObj<typeof meta>

export const LoggedIn: Story = {}
