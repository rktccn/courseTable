import { defineStore } from 'pinia'

export const useAppStore =  defineStore('app', {
    state: () => {
        return {
            currentWeek: 1 // 当前周次
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
