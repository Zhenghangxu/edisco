import type { Meta, StoryObj } from '@storybook/vue3'
import Layout from '../../views/LayoutPage.vue'

const meta = {
  title: 'Layout/Basic Page',
  component: Layout,
  decorators: [() => ({ template: '<div class="content-borders"><story/></div>' })],
  argTypes: {
    type: {
      options: ['full', 'side', 'contained', 'contentWithSideBar', 'half', 'third'],
      control: { type: 'select' }
    },
    internalLayout: {
      options: ['vertical', 'horizontal'],
      control: { type: 'select' }
    },
    gap: {
      options: ['1', '2', '3', '4', '5', '6'],
      control: { type: 'select' }
    },
    padding: {
      options: ['1', '2', '3', '4', '5', '6'],
      control: { type: 'select' }
    }
  },
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
} as Meta<typeof Layout>

export default meta
type Story = StoryObj<typeof meta>

export const PageTemplate: Story = {
  args: {
    type: 'full',
    internalLayout: 'vertical',
    gap: '1',
    padding: '1'
    // @ts-ignore
  }
}
