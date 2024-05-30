import type { Meta, StoryObj } from '@storybook/vue3'

import CourseCardGrid from '@/components/CourseCardGrid.vue'

const meta = {
  title: 'Molecules/CourseCardGrid',
  component: CourseCardGrid,
  render: () => ({
    components: { MyPage: CourseCardGrid },
    template: '<my-page />'
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof CourseCardGrid>

export default meta
type Story = StoryObj<typeof meta>


export const Default: Story = {
  args: {
  }
}
