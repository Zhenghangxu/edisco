import type { Meta, StoryObj } from '@storybook/vue3'
import { within, userEvent, expect } from '@storybook/test'
import InterestSelect from '../../components/InterestSelect.vue'

const meta = {
  title: 'Molecules/InterestSelect',
  component: InterestSelect,
  render: () => ({
    components: { MyPage: InterestSelect },
    template: '<my-page />'
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof BasicPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
