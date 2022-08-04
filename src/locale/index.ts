// import { useAppStore } from '@/store/app'
import { createI18n } from 'vue-i18n'

// const appStore = useAppStore()
import datetimeFormats from './dataFormats.json'

import zhCN from './zh-CN.json'
import en from './en.json'

const messages = {
    'zh-CN': zhCN,
    en
}

const i18n = createI18n({
    silentTranslationWarn: true,
    legacy: false,
    locale: localStorage.getItem('lang') || 'zh-CN',
    messages,
    datetimeFormats
})

export default i18n

// export default function (app: App) {
//     app.use(i18n)
// }
