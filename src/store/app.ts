import { defineStore } from 'pinia'
import { RoMessageList } from '@/types/course'
import { klona } from 'klona'

export const useAppStore = defineStore('app', {
    state: () => {
        return {
            currentWeek: 0, // 当前周次
            primaryColor: 'fuchsia',

            lang: 'zh-CN',

            // 通知队列
            messageList: <RoMessageList[]>[]
        }
    },
    actions: {
        // 设置当前周次
        setCurrentWeek(week: number) {
            this.currentWeek = week
        }
    },
    getters: {
        getMessageList(state: any) {
            return klona(state.messageList)
        }
    }
})
