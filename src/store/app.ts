import { defineStore } from 'pinia'
import { RoMessageList, RoCourseDay } from '@/types/course'
import { klona } from 'klona'
import setList from '@/utils/notice'

export const useAppStore = defineStore('app', {
    state: () => {
        return {
            currentWeek: 0, // 当前周次
            primaryColor: 'fuchsia',
            todayCourse: <RoCourseDay[]>[],
            tomorrowCourse: <RoCourseDay[]>[],

            lang: 'zh-CN',

            // 通知队列
            messageList: <RoMessageList[]>[],
            // 上课通知提前时间，单位：分钟
            startNoticeTime: 0,
            // 下课通知提前时间，单位：分钟
            endNoticeTime: 0
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
    },
    persist: {
        storage: localStorage,
        paths: ['lang', 'primaryColor', 'startNoticeTime', 'endNoticeTime']
    }
})
