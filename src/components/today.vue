<template>
    <div class="course-list relative text-base overflow-y-scroll h-full">
        <!-- <section
            class="sticky top-0 left-0 flex justify-between font-semibold mb-2"
        >
            <div class="title flex flex-col">
                <span class="text-3xl text-primary">今日</span>
                <span class="text-2xl text-muted"
                    >{{ date.getMonth() + 1 }}月{{ date.getDate() }}日 星期{{
                        numToChinese[date.getDay()]
                    }}</span
                >
            </div>
            <div class="flex items-center">
                <section
                    class="weather flex px-2 py-1 items-center duration-150 ease-in-out rounded-md text-muted-hover shadow-md bg-off-base outline outline-1"
                >
                    <span class="mr-2 text-base" @click="submit">新加坡</span>
                    <span class="mr-2">
                        <svg-icon
                            name="312"
                            class="text-base"
                            size="24"
                        ></svg-icon>
                    </span>
                    <span class="text-thin text-xl text-base">21℃</span>
                </section>
            </div>
        </section> -->

        <section class="flex relative flex-col mb-6">
            <header
                class="title sticky top-0 left-0 flex flex-col z-10 bg-base border-b-2 font-semibold mb-2"
            >
                <span class="text-3xl text-primary">今日</span>
                <span class="text-2xl text-muted"
                    >{{ date.getMonth() + 1 }}月{{ date.getDate() }}日 星期{{
                        numToChinese[date.getDay()]
                    }}</span
                >
            </header>

            <span v-if="courseList.length > 0" class="pr-1">
                <article
                    v-for="(course, index) in courseList"
                    class="grow flex flex-col relative overflow-hidden p-4 pl-8 my-1 shadow-md rounded-lg bg-off-base text-xl font-semibold"
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
                    <span
                        class="text-2xl overflow-hidden truncate"
                        :class="`text-${course.color}-600`"
                        >{{ course.name }}</span
                    >
                    <span
                        class="text-base"
                        :class="`text-${course.color}-600`"
                        >{{ course.classroom }}</span
                    >

                    <span
                        class="block absolute left-0 top-0 w-2 h-full"
                        :class="`bg-${course.color}-200`"
                    ></span>
                </article>
            </span>
            <section v-else class="text-md text-center pr-1 py-3 opacity-70">
                今日没有课程！
            </section>

            <!-- <div
                class="pointer absolute flex flex-col items-end w-full"
                :style="{ top: '150px', left: '0' }"
            >
                <span class="mr-3 text-primary opacity-90 text-sm">8:25</span>
                <span class="w-full h-0.5 bg-primary opacity-75"></span>
            </div> -->
        </section>

        <section class="relative flex flex-col">
            <header
                class="sticky top-0 left-0 z-10 bg-base border-b-2 text-2xl font-semibold"
            >
                明日
            </header>
            <span
                class="flex relative flex-col mb-6 pr-1"
                v-if="courseListTomorrow.length > 0"
            >
                <article
                    v-for="(course, index) in courseListTomorrow"
                    class="grow flex flex-col relative overflow-hidden p-4 pl-8 my-1 shadow-md rounded-lg bg-off-base text-xl font-semibold"
                >
                    <span class="flex text-sm text-muted-hover">
                        <span>{{ course.start }}</span>
                        <em class="mx-1">-</em>
                        <span>{{ course.end }}</span>
                    </span>
                    <span
                        class="text-2xl overflow-hidden truncate"
                        :class="`text-${course.color}-600`"
                        >{{ course.name }}</span
                    >
                    <span
                        class="text-base"
                        :class="`text-${course.color}-600`"
                        >{{ course.classroom }}</span
                    >

                    <span
                        class="block absolute left-0 top-0 w-2 h-full"
                        :class="`bg-${course.color}-200`"
                    ></span>
                </article>
            </span>
            <span v-else class="pr-1 text-md text-center py-3 opacity-70"
                >明日没有课程！</span
            >
        </section>
    </div>
</template>
<script lang="ts">
import { useCourseStore } from '@/store/course'
import { defineComponent, computed } from 'vue'
import { RoCourseDay, numToChinese } from '@/types/course'

export default defineComponent({
    name: 'Today',
    setup(context) {
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
