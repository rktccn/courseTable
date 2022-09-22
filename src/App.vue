<template>
    <div class="app">
        <router-view v-slot="{ Component, route }">
            <transition
                :name="`${route.meta.transitionName}` || 'zoom-in'"
                mode="out-in"
            >
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>

<script lang="ts" setup>
import { useCourseStore } from '@/store/course'
import { computed, watchEffect, ref } from 'vue'
import { useAppStore } from './store/app'
import { RoCourseDay, RoMessageList } from './types/course'
import { installI18n } from '@/locale'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const courseStore = useCourseStore()
const appStore = useAppStore()
courseStore.initCourse()
document.documentElement.classList.value = `theme-${appStore.primaryColor}`

const { startNoticeTime, endNoticeTime } = storeToRefs(appStore)

const router = useRouter()

let date = ref(new Date())

// 每天0点更新时间信息,获取课程列表
function timeRefresh() {
    let nowTime = new Date().getTime()
    let tommrowTime = new Date(
        date.value.getFullYear(),
        date.value.getMonth(),
        date.value.getDate() + 1
    ).getTime()
    let restTime = tommrowTime - nowTime + 3000

    setTimeout(() => {
        date.value = new Date()
        timeRefresh()
    }, restTime)
}

timeRefresh()

// 获取当日课程列表和课程通知
watchEffect(() => {
    let todayCourseList: RoCourseDay[] = courseStore.getDayCourse(date.value)
    let tomorrowCourseList: RoCourseDay[] = courseStore.getDayCourse(
        new Date(date.value.getTime() + 24 * 60 * 60 * 1000)
    ) // 获取明日课程

    let nowTime = date.value
    let year = nowTime.getFullYear()
    let month = nowTime.getMonth()
    let day = nowTime.getDate()

    let res: RoMessageList[] = []
    const getLang = (val: string, param?: any): string => {
        const { t } = installI18n().global

        return t(`${val}`, param)
    }

    // 设置提醒和今日课程列表
    todayCourseList.forEach(item => {
        let start = new Date(`${year}, ${month + 1}, ${day}, ${item.start}`)
        let end = new Date(`${year}, ${month + 1}, ${day}, ${item.end}`)

        // 开始提醒, key 为1代表上课提醒
        let startNotice = {
            key: 1,
            date: new Date(
                start.getTime() + 1000 - startNoticeTime.value * 60 * 1000
            ),
            title: getLang(`notice.start.title`),
            body: getLang(`notice.start.body`, {
                course: item.name,
                time: startNoticeTime.value,
                place: item.classroom
            })
        }

        // key为2代表下课提醒
        let endNotice = {
            key: 2,
            date: new Date(
                end.getTime() - endNoticeTime.value * 60 * 1000 - 1000
            ),
            title: getLang(`notice.end.title`),
            body: getLang(`notice.end.body`, {
                course: item.name,
                time: endNoticeTime.value,
                place: item.classroom
            })
        }

        if (startNoticeTime.value === 0 && endNoticeTime.value === 0) {
            return
        } else if (startNoticeTime.value === 0) {
            res.push(endNotice)
        } else if (endNoticeTime.value === 0) {
            res.push(startNotice)
        } else {
            res.push(startNotice)
            res.push(endNotice)
        }
    })

    appStore.setMessageList(res)

    appStore.todayCourse = todayCourseList
    appStore.tomorrowCourse = tomorrowCourseList
})

// appStore.tommrowCourse = computed(() => {
//     return courseStore.getDayCourse(
//         new Date(date.getTime() + 24 * 60 * 60 * 1000)
//     )
// })
</script>

<style lang="scss">
.app {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
</style>
