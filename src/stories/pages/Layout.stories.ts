import type { Meta, StoryObj } from '@storybook/vue3'
import Layout from '../../views/LayoutPage.vue'

const meta = {
  title: 'Layout/Basic Page',
  component: Layout,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
} satisfies Meta<typeof Layout>

export default meta
type Story = StoryObj<typeof meta>

export const PageTemplate: Story = {
    args:{
        type: "full",
        internalLayout: "vertical",
        gap: "1",
    }
}
