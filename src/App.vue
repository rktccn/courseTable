<template>
    <div class="app">
        <!-- <transition name="zoom-in">
            <router-view></router-view>
        </transition> -->

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
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from './store/app'
import { RoCourseDay, RoMessageList } from './types/course'
import { installI18n } from '@/locale'

const { locale, t } = installI18n().global

const route = useRoute()
const courseStore = useCourseStore()
const appStore = useAppStore()
courseStore.initCourse()

// 获取当日课程列表和课程通知
watch(
    () => courseStore.getDayCourse(new Date()),
    val => {
        let l: RoCourseDay[] = val

        let nowTime = new Date()
        let year = nowTime.getFullYear()
        let month = nowTime.getMonth()
        let day = nowTime.getDate()

        let res: RoMessageList[] = []

        // 设置提醒
        l.forEach(item => {
            let start = new Date(`${year}, ${month + 1}, ${day}, ${item.start}`)
            let end = new Date(`${year}, ${month + 1}, ${day}, ${item.end}`)

            res.push(
                {
                    key: 1,
                    date: new Date(start.getTime() + 1000),
                    title: t(`notice.start.title`),
                    body: t(`notice.start.body`, {
                        course: item.name,
                        time: 0,
                        place: item.classroom
                    })
                },
                {
                    key: 2,
                    date: new Date(end.getTime() - 1000),
                    title: t(`notice.end.title`),
                    body: t(`notice.end.body`, {
                        course: item.name,
                        time: 0
                    })
                }
            )
        })

        appStore.setMessageList(res)

        appStore.todayCourse = l
    }
)

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
