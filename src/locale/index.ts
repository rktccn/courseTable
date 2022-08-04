// import { useAppStore } from '@/store/app'
import { createI18n } from 'vue-i18n'

// const appStore = useAppStore()

import zhCN from './zh-CN.json'
import en from './en.json'

const messages = {
    'zh-CN': zhCN,
    en
}

const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('lang') || 'zh-CN',
    messages
})

export default i18n

// export default function (app: App) {
//     app.use(i18n)
// }
