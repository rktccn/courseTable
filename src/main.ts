import { createApp } from 'vue'
import App from './App.vue'
import useStore from './store/index'
import router from '@/router/index'
// import 'tailwindcss/tailwind.css'
import '@/styles/normalize.scss'
// import vueI18n from '@/locale/index'
import { installI18n } from './locale'
import setList from './utils/notice'

import 'virtual:svg-icons-register'
import svgIcon from './components/svg-icon.vue'
import RoButton from './components/roButton.vue'
import { useAppStore } from './store/app'

const app = createApp(App)
app.use(useStore)
app.use(router)
// app.use(vueI18n)
const i18n = installI18n(app)
setList()
app.component('svg-icon', svgIcon)
app.component('RoButton', RoButton)
app.mount('#app')

const appStore = useAppStore()
appStore.$subscribe((_: any, state: any) => {
    i18n.global.locale = state.lang
})
