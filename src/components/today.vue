<template>
    <div class="text-base">
        <section class="flex justify-between font-semibold mb-2">
            <div class="title flex flex-col">
                <span class="text-3xl text-primary">今日</span>
                <span class="text-2xl text-muted">7月8日 星期五</span>
            </div>
            <div class="weather flex items-center">
                <span class="mr-3">icon</span>
                <div class="info flex flex-col">
                    <span class="text-xl">多云</span>
                    <span class="text-thin">21-23℃</span>
                </div>
            </div>
        </section>

        <section class="flex relative flex-col mb-6">
            <article
                class="grayscale brightness-90 grow flex flex-col relative overflow-hidden my-1 p-4 pl-8 rounded-lg shadow-md bg-base text-xl text-primary font-semibold before:block before:absolute before:left-0 before:top-0 before:w-2 before:h-full before:bg-orange-400"
            >
                <span class="flex text-sm text-muted-hover">
                    <span>8:00 AM</span>
                    <em class="mx-1">-</em>
                    <span>9:15 AM</span>
                </span>
                <p class="text-xl overflow-hidden truncate text-primary">
                    算法与数据结构课程设计结构课程设计
                </p>
                <span class="text-base text-primary">C101</span>
            </article>

            <article
                class="grow flex flex-col relative overflow-hidden p-4 pl-8 my-1 shadow-md rounded-lg bg-off-base text-xl font-semibold before:block before:absolute before:left-0 before:top-0 before:w-2 before:h-full before:bg-sky-400"
            >
                <span class="flex text-sm text-muted-hover">
                    <span>8:00</span>
                    <em class="mx-1">-</em>
                    <span>9:15</span>
                </span>
                <span class="text-2xl overflow-hidden truncate text-primary"
                    >英语</span
                >
                <span class="text-base text-primary">C101</span>
            </article>

            <article
                class="grow flex flex-col relative overflow-hidden p-4 pl-8 my-1 shadow-md rounded-lg bg-off-base text-xl font-semibold before:block before:absolute before:left-0 before:top-0 before:w-2 before:h-full before:bg-amber-400"
            >
                <span class="flex text-sm text-muted-hover">
                    <span>8:00</span>
                    <em class="mx-1">-</em>
                    <span>9:15</span>
                </span>
                <span class="text-2xl overflow-hidden truncate text-primary"
                    >数学</span
                >
                <span class="text-base text-primary">C101</span>
            </article>

            <article
                v-for="(course, index) in courseList"
                class="grow flex flex-col relative overflow-hidden p-4 pl-8 my-1 shadow-md rounded-lg bg-off-base text-xl font-semibold before:block before:absolute before:left-0 before:top-0 before:w-2 before:h-full before:bg-sky-400"
            >
                <span class="flex text-sm text-muted-hover">
                    <span>{{ course.start }}</span>
                    <em class="mx-1">-</em>
                    <span>{{ course.end }}</span>
                </span>
                <span class="text-2xl overflow-hidden truncate text-primary">{{
                    course.name
                }}</span>
                <span class="text-base text-primary">{{
                    course.classroom
                }}</span>
            </article>

            <div
                class="pointer absolute flex flex-col items-end w-full"
                :style="{ top: '150px', left: '0' }"
            >
                <span class="mr-3 text-primary opacity-90 text-sm">8:25</span>
                <span class="w-full h-0.5 bg-primary opacity-75"></span>
            </div>
        </section>

        <section class="flex flex-col">
            <span class="text-2xl font-semibold">明日</span>
            <span class="text-md">没有课程</span>
        </section>
    </div>
</template>
<script lang="ts">
import { useCourseStore } from '@/store/course'
import { defineComponent, computed } from 'vue'

export default defineComponent({
    name: 'Today',
    setup() {
        const courseStore = useCourseStore()
        const courseList = computed(() => {
            return courseStore.getDayCourse(new Date())
        })

        return {
            courseList
        }
    }
})
</script>
