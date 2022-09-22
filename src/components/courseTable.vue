<template>
    <div class="flex flex-col h-full select-none text-base">
        <section
            class="shrink-0 grid grid-cols-8 mb-3 bg-off-base rounded-t-lg overflow-hidden"
        >
            <span
                class="py-3 backdrop-contrast-75 flex items-center justify-center font-semibold cursor-pointer"
                >{{ $t(`base.monthList.${month - 1}`) }}</span
            >
            <span
                v-for="(day, index) in dateList"
                :key="day"
                class="flex flex-col justify-center items-center"
            >
                <p class="text-base font-semibold">
                    {{ $t(`base.weekList.${index}`) }}
                </p>
                <p class="text-sm opacity-60 leading-3 text-primary">
                    {{ day }}
                </p>
            </span>
        </section>

        <section class="main-table overflow-y-scroll flex-grow p-1">
            <div
                class="grid grid-cols-8 gap-2 text-center min-h-full"
                :style="{ gridTemplateRows: 'repeat(8, minmax(0, 1fr))' }"
            >
                <span
                    v-for="(section, index) in courseTimeList"
                    :key="index"
                    class="section text-sm text-muted"
                    :style="{ gridArea: `${index + 1}/1/${index + 2}/2` }"
                    >{{ section.start }} <br />
                    {{ section.end }}</span
                >

                <template v-for="(day, index) in table" :key="day">
                    <span
                        v-for="course in day"
                        :key="course.name"
                        :class="`bg-${course.color}-200 text-${course.color}-600`"
                        class="flex flex-col justify-between rounded-md p-1 font-semibold ease-out duration-300 hover:outline hover:shadow-lg"
                        :style="{
                            gridArea: `${course.start}/${index + 2}/${
                                course.start + course.count
                            }/${index + 3}`
                        }"
                        @click="toggleEditcourse(course.key)"
                    >
                        <p class="overflow-hidden break-all truncate">
                            {{ course.name }}
                        </p>
                        <p class="font-thin text-sm">
                            {{ course.classroom }}
                        </p>
                    </span>
                </template>
            </div>
        </section>

        <transition name="drop-b">
            <div
                class="model z-20 text-left backdrop-blur-md backdrop-brightness-75"
                v-if="showEditcourse"
                @click.self="showEditcourse = false"
            >
                <EditCourse
                    class="model__box"
                    :courseKey="courseKey"
                    :closeFN="closeModel"
                ></EditCourse>
            </div>
        </transition>
    </div>
</template>
<script lang="ts">
import { useCourseStore } from '@/store/course'
import { defineComponent, computed, reactive, toRefs } from 'vue'
import { RoCourseTable } from '@/types/course'
import { storeToRefs } from 'pinia'

import EditCourse from './editCourse.vue'

export default defineComponent({
    name: 'CourseTable',
    props: {
        week: { type: Number, required: true }
    },

    setup(props) {
        const courseStore = useCourseStore()
        const data = reactive({
            showEditcourse: false,
            courseKey: undefined as string | undefined
        })

        const { dateList, month } = courseStore.getDateByWeek(props.week)

        let { courseTimeList } = storeToRefs(courseStore)

        let table = computed<RoCourseTable[][]>(() => {
            return courseStore.getCourseTable(props.week)
        })

        const toggleEditcourse = (key: string) => {
            data.showEditcourse = true
            data.courseKey = key
        }

        const closeModel = () => {
            data.showEditcourse = false
        }

        return {
            ...toRefs(data),
            table,
            courseTimeList,
            dateList,
            month,
            toggleEditcourse,
            closeModel
        }
    },
    components: {
        EditCourse
    }
})
</script>

<style lang="scss">
.main-table {
    -webkit-overflow-scrolling: touch;
    user-select: none;
    &::-webkit-scrollbar {
        display: none;
    }
}

.section {
    min-height: 1.75rem;
}

.model {
    position: fixed;
    top: 0;
    left: 0;

    width: 100vw;
    height: calc(100vh + 10px);

    &__box {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>
