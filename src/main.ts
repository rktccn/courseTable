import { createApp } from 'vue'
import App from './App.vue'
import useStore from './store/index'
import router from '@/router/index'
import 'tailwindcss/tailwind.css'
import '@/styles/normalize.scss'


import "virtual:svg-icons-register";
import svgIcon from './components/svg-icon.vue'

const app = createApp(App)
app.use(useStore)
app.use(router)
app.component('svg-icon', svgIcon)
app.mount('#app')
