import { createApp } from 'vue'
import App from './App.vue'
import useStore from './store/index'
import router from '@/router'
import 'tailwindcss/tailwind.css'
import '@/styles/normalize.scss'

const app = createApp(App)
app.use(useStore)
app.use(router)
app.mount('#app')
