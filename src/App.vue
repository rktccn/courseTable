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
import { computed, watchEffect } from 'vue'
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

let date = new Date()

function timeRefresh() {
    let nowTime = new Date().getTime()
    let tommrowTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    ).getTime()
    let restTime = tommrowTime - nowTime

    setTimeout(() => {
        date = new Date()
        timeRefresh()
    }, restTime)
}

timeRefresh()

// 获取当日课程列表和课程通知
watchEffect(() => {
    let l: RoCourseDay[] = courseStore.getDayCourse(date)

    let nowTime = date
    let year = nowTime.getFullYear()
    let month = nowTime.getMonth()
    let day = nowTime.getDay()

    let res: RoMessageList[] = []
    const getLang = (val: string, param?: any): string => {
        const { t } = installI18n().global

        return t(`${val}`, param)
    }

    // 设置提醒
    l.forEach(item => {
        let start = new Date(`${year}, ${month + 1}, ${day}, ${item.start}`)
        let end = new Date(`${year}, ${month + 1}, ${day}, ${item.end}`)

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

    appStore.todayCourse = l
})

appStore.tommrowCourse = computed(() => {
    return courseStore.getDayCourse(
        new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
    )
})
</script>

<style lang="scss">
.app {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
</style>
