import { defineStore } from 'pinia'
import { RoMessageList, RoCourseDay } from '@/types/course'
import { klona } from 'klona'
import setList from '@/utils/notice'
import { computed } from 'vue'
import { useCourseStore } from './course'

export const useAppStore = defineStore('app', {
    state: () => {
        return {
            currentWeek: 0, // 当前周次
            primaryColor: 'fuchsia',
            todayCourse: <RoCourseDay[]>[],
            tommrowCourse: <RoCourseDay[]>[],

            lang: 'zh-CN',

            // 通知队列
            messageList: <RoMessageList[]>[]
        }
    },
    actions: {
        // 设置当前周次
        setCurrentWeek(week: number) {
            this.currentWeek = week
        },

        setMessageList(val: RoMessageList[]) {
            this.messageList = klona(val)

            setList()
        }
    },
    getters: {
        getMessageList(state: any) {
            return klona(state.messageList)
        }
    }
})
