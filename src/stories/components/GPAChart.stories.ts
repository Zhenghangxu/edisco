import type { Meta, StoryObj } from '@storybook/vue3'
import GPAChart from '../../components/metrics/GPAChart.vue'

const meta = {
  title: 'Molecules/GPAChart',
  component: GPAChart,
  render: () => ({
    components: { MyPage: GPAChart },
    template: '<my-page />'
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof GPAChart>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}
