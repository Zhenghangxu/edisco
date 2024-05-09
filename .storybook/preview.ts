import type { Preview } from '@storybook/vue3'
import PrimeVue from 'primevue/config'
import { setup } from '@storybook/vue3'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    chromatic: {
      viewports: [414, 834, 1400]
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

setup((app) => {
  app.use(PrimeVue, { unstyle: true })
})

export default preview
