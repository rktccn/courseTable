import { createApp } from 'vue'
import App from './App.vue'
import useStore from './store/index'
import router from '@/router/index'
import 'tailwindcss/tailwind.css'
import '@/styles/normalize.scss'
import vueI18n from '@/locale/index'

import 'virtual:svg-icons-register'
import svgIcon from './components/svg-icon.vue'
import RoButton from './components/roButton.vue'

const app = createApp(App)
app.use(useStore)
app.use(router)
app.use(vueI18n)
app.component('svg-icon', svgIcon)
app.component('RoButton', RoButton)
app.mount('#app')
