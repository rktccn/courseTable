import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => {
        return {
            currentWeek: 0, // 当前周次
            primaryColor: 'fuchsia',

            lang: 'zh-CN'
        }
    },
    actions: {
        // 设置当前周次
        setCurrentWeek(week: number) {
            this.currentWeek = week
        }
    },
    getters: {}
})
