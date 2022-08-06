import { useAppStore } from '@/store/app'
import { createI18n } from 'vue-i18n'

// const appStore = useAppStore()
import datetimeFormats from './dataFormats.json'

import zhCN from './zh-CN.json'
import en from './en.json'
import { App } from 'vue'

const messages = {
    'zh-CN': zhCN,
    en
}

export function installI18n(app?: App) {
    const i18n = createI18n({
        legacy: false,
        globalInjection: true,

        locale: useAppStore().lang,
        fallbackLocale: 'zh-CN',
        messages,
        datetimeFormats
    })
    if (app) {
        app.use(i18n)
    }
    return i18n
}
