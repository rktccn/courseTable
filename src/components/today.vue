<template>
    <div class="course-list relative text-base overflow-y-scroll h-full">
        <!-- 天气 -->
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
                <span class="text-3xl text-primary">{{
                    $t('today.title')
                }}</span>
                <span class="text-2xl text-muted">
                    <!-- {{ $d(new Date(), 'short') }} -->
                </span>
            </header>

            <span
                v-if="courseList.length > 0"
                class="pr-1 relative"
                ref="courseListEL"
            >
                <!-- 课程进度条 -->
                <div
                    class="pointer absolute duration-1000 ease-out flex flex-col items-end w-full z-10"
                    :style="timeProgress"
                    ref="timeProgressEL"
                >
                    <span class="w-full h-0.5 bg-primary opacity-75"></span>
                    <div class="detail flex justify-between">
                        <span
                            v-if="timeLeft === -1"
                            class="mr-3 text-primary opacity-90 text-sm"
                        >
                            {{ currentTime }}
                        </span>
                        <span
                            v-if="timeLeft !== -1"
                            class="mr-3 text-primary opacity-90 text-sm"
                        >
                            {{
                                currentIndex % 1 === 0
                                    ? $t('today.fromEnd')
                                    : $t('today.fromStart')
                            }}
                            {{ timeLeft }}{{ $t('today.minutes') }}
                        </span>
                    </div>
                </div>

                <article
                    v-for="(course, index) in courseList"
                    class="grow flex flex-col relative overflow-hidden p-4 pl-8 my-2 shadow-md rounded-lg bg-off-base text-xl font-semibold duration-150 ease-out"
                    :class="{
                        grayscale: index < currentIndex,
                        'brightness-90': index > currentIndex
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
                {{ $t('today.noCourse') }}
            </section>
        </section>

        <section class="relative flex flex-col">
            <header
                class="sticky top-0 left-0 z-10 bg-base border-b-2 text-2xl font-semibold"
            >
                {{ $t('today.tommrowTitle') }}
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
            <span v-else class="pr-1 text-md text-center py-3 opacity-70">
                {{ $t('today.noCourse') }}
            </span>
        </section>
    </div>
</template>
<script lang="ts">
import { useCourseStore } from '@/store/course'
import { useAppStore } from '@/store/app'
import { defineComponent, computed, ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

export default defineComponent({
    name: 'Today',
    setup(context) {
        const courseStore = useCourseStore()
        const appStore = useAppStore()

        const date = computed(() => {
            return new Date()
        })

        const courseListEL = ref<HTMLDivElement | null>(null)
        const timeProgressEL = ref<HTMLDivElement | null>(null)

        let currentDate = ref(new Date())
        setInterval(() => {
            currentDate.value = new Date()
        }, 500)

        const currentTime = computed(() => {
            let date = currentDate.value
            return date.toTimeString().substr(0, 5)
        })

        // 获取课程列表
        const { todayCourse: courseList, tomorrowCourse: courseListTomorrow } =
            storeToRefs(appStore)

        // 当前课程index
        const currentIndex = computed(() => {
            const now = currentDate.value
            let nowTime =
                now.getHours() * 60 * 60 +
                now.getMinutes() * 60 +
                now.getSeconds()
            const courseList = courseStore.getDayCourse(new Date())
            for (let i = 0; i < courseList.length; i++) {
                const course = courseList[i]
                const startTime = course.start
                    .split(':')
                    .map((item: string) => parseInt(item))

                const endTime = course.end
                    .split(':')
                    .map((item: string) => parseInt(item))
                const start = startTime[0] * 60 * 60 + startTime[1] * 60
                const end = endTime[0] * 60 * 60 + endTime[1] * 60
                if (nowTime >= start && nowTime <= end) {
                    return i
                } else if (nowTime < end && nowTime < start) {
                    return i - 1 + 0.5
                }
            }

            return courseList.length - 1 + 0.5
        })

        // 课程剩余时间/距离上课时间
        const timeLeft = ref(0)

        // 时间进度条
        const timeProgress = computed(() => {
            let style = {
                Transform: ''
            }
            let offset = 0

            if (courseListEL.value) {
                let now = currentDate.value
                let nowTime =
                    now.getHours() * 60 * 60 +
                    now.getMinutes() * 60 +
                    now.getSeconds()
                let current = Math.floor(currentIndex.value)

                let element = courseListEL.value.children[
                    current + 1
                ] as HTMLElement

                if (!element) return

                if (currentIndex.value % 1 === 0) {
                    const course = courseList.value[current]
                    const startTime = course.start
                        .split(':')
                        .map((item: string) => parseInt(item))

                    const endTime = course.end
                        .split(':')
                        .map((item: string) => parseInt(item))

                    const start = startTime[0] * 60 * 60 + startTime[1] * 60
                    const end = endTime[0] * 60 * 60 + endTime[1] * 60

                    let rate =
                        Math.floor(
                            ((nowTime - start) / (end - start)) * 10000
                        ) / 10000
                    offset = rate * element.offsetHeight

                    timeLeft.value = Math.ceil((end - nowTime) / 60)
                } else {
                    offset = current + 1 ? element.offsetHeight + 4 : 3
                    const course = courseList.value[current + 1] ?? null
                    if (course) {
                        const startTime = course.start
                            .split(':')
                            .map((item: string) => parseInt(item))
                        const start = startTime[0] * 60 * 60 + startTime[1] * 60

                        timeLeft.value = Math.ceil((start - nowTime) / 60)
                    } else {
                        timeLeft.value = -1
                    }
                }

                style.Transform = `translateY(${element.offsetTop + offset}px)`
            }

            return style
        })

        onMounted(() => {})

        return {
            date,
            currentTime,
            courseList,
            courseListTomorrow,
            currentIndex,
            timeProgress,
            timeLeft,
            courseListEL,
            timeProgressEL
        }
    },
    components: {}
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
