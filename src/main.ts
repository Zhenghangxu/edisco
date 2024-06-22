import './assets/main.css'
import PrimeVue from 'primevue/config'
// import 'theme/theme.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, { ripple: true})

app.mount('#app')
