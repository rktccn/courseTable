<template>
    <div class="course-list text-base overflow-y-scroll h-full pr-1">
        <section class="flex justify-between font-semibold mb-2">
            <div class="title flex flex-col">
                <span class="text-3xl text-primary">今日</span>
                <span class="text-2xl text-muted"
                    >{{ date.getMonth() + 1 }}月{{ date.getDate() }}日 星期{{
                        numToChinese[date.getDay()]
                    }}</span
                >
            </div>
            <div class="weather flex items-center">
                <span class="mr-3">icon</span>
                <div class="info flex flex-col">
                    <span class="text-xl">多云</span>
                    <span class="text-thin">21-23℃</span>
                </div>
            </div>
        </section>

        <section
            class="flex relative flex-col mb-6"
            v-if="courseList.length > 0"
        >
            <article
                v-for="(course, index) in courseList"
                class="grow flex flex-col relative overflow-hidden p-4 pl-8 my-1 shadow-md rounded-lg bg-off-base text-xl font-semibold before:block before:absolute before:left-0 before:top-0 before:w-2 before:h-full before:bg-sky-400"
                :class="{
                    grayscale: checkCourse(course) === 0,
                    'brightness-90': checkCourse(course) === 2
                }"
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

            <!-- <div
                class="pointer absolute flex flex-col items-end w-full"
                :style="{ top: '150px', left: '0' }"
            >
                <span class="mr-3 text-primary opacity-90 text-sm">8:25</span>
                <span class="w-full h-0.5 bg-primary opacity-75"></span>
            </div> -->
        </section>
        <section v-else class="text-md">没有课程</section>

        <section class="flex flex-col">
            <span class="text-2xl font-semibold">明日</span>
            <span
                class="flex relative flex-col mb-6"
                v-if="courseListTomorrow.length > 0"
            >
                <article
                    v-for="(course, index) in courseListTomorrow"
                    class="grow flex flex-col relative overflow-hidden p-4 pl-8 my-1 shadow-md rounded-lg bg-off-base text-xl font-semibold before:block before:absolute before:left-0 before:top-0 before:w-2 before:h-full before:bg-sky-400"
                >
                    <span class="flex text-sm text-muted-hover">
                        <span>{{ course.start }}</span>
                        <em class="mx-1">-</em>
                        <span>{{ course.end }}</span>
                    </span>
                    <span
                        class="text-2xl overflow-hidden truncate text-primary"
                        >{{ course.name }}</span
                    >
                    <span class="text-base text-primary">{{
                        course.classroom
                    }}</span>
                </article>
            </span>
            <span v-else class="text-md">没有课程</span>
        </section>
    </div>
</template>
<script lang="ts">
import { useCourseStore } from '@/store/course'
import { defineComponent, computed } from 'vue'
import { RoCourseDay, numToChinese } from '@/types/course'

export default defineComponent({
    name: 'Today',
    setup() {
        const courseStore = useCourseStore()
        const courseList = computed(() => {
            return courseStore.getDayCourse(new Date())
        })
        const date = computed(() => {
            return new Date()
        })

        const courseListTomorrow = computed(() => {
            return courseStore.getDayCourse(
                new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
            )
        })

        // 检查课程状态
        // 返回0: 已结束，1:正在进行,2未开始
        const checkCourse = (val: RoCourseDay) => {
            const now = new Date()
            const nowTime = now.getHours() * 60 + now.getMinutes()
            const course = val
            const startTime = course.start
                .split(':')
                .map(item => parseInt(item))

            const endTime = course.end.split(':').map(item => parseInt(item))
            const start = startTime[0] * 60 + startTime[1]
            const end = endTime[0] * 60 + endTime[1]
            if (nowTime < start) {
                return 2
            }
            if (nowTime > end) {
                return 0
            }
            return 1
        }

        return {
            date,
            courseList,
            courseListTomorrow,
            checkCourse,
            numToChinese
        }
    }
})
</script>

<style lang="scss" scoped>
.course-list {
    -webkit-overflow-scrolling: touch;
    user-select: none;
    &::-webkit-scrollbar {
        display: none;
    }
}
</style>
