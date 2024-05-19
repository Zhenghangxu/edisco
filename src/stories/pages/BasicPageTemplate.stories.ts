import type { Meta, StoryObj } from '@storybook/vue3'
import { within, userEvent, expect } from '@storybook/test'
import BasicPage from '../../views/BasicPage.vue'

const meta = {
  title: 'Containers/BasicPageContainer',
  component: BasicPage,
  render: () => ({
    components: { MyPage: BasicPage },
    template: '<my-page />'
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof BasicPage>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}
