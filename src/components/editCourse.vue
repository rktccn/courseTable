<template>
    <div
        class="px-8 py-4 bg-off-base shadow-lg rounded-lg select-none text-base"
    >
        <div class="flex flex-col my-2">
            <span class="item text-xs opacity-70">基础信息</span>
            <input
                class="item px-2 rounded-md text-primary"
                type=" text"
                v-model="courseName"
                placeholder="课程名称"
            />
            <div class="item flex items-center justify-between">
                <span> 颜色和图标</span>
                <span
                    class="h-5 rounded bg-primary aspect-square block cursor-pointer"
                ></span>
            </div>
        </div>

        <div class="flex flex-col my-2">
            <span class="item text-xs opacity-70">时间与地点</span>

            <div class="time-list">
                <div
                    class="item time-list__item flex flex-col my-1 text-sm bg-secondary p-2 rounded-md leading-7 cursor-pointer"
                    v-for="time in timeList"
                >
                    <div class="time flex justify-between text-primary">
                        <span
                            >周{{ time.day }}，共{{ time.weeks.length }}周</span
                        >
                        <span
                            >{{ time.startSection }}-{{
                                time.endSection
                            }}节</span
                        >
                    </div>

                    <div class="location flex justify-between text-primary">
                        <span>{{ time.classroom }}</span>
                        <span>{{ time.teacher }}</span>
                    </div>
                </div>
            </div>

            <button
                class="item outline rounded mt-2"
                @click="addTimeShow = true"
            >
                添加时间段
            </button>
        </div>

        <div class="control flex justify-between mt-4 font-semibold">
            <button
                class="control__item px-3 py-1 rounded-md outline outline-0 duration-150 ease-in-out bg-off-base text-base hover:text-base hover:outline-2"
                @click="$emit('update:showEditCourse', false)"
            >
                取消
            </button>
            <button
                class="control__item px-3 py-1 rounded-md outline outline-0 duration-150 ease-in-out bg-primary text-secondary hover:bg-secondary hover:text-primary hover:outline-2"
                @click="addCourse"
            >
                添加
            </button>
        </div>

        <transition name="drop-b">
            <div
                class="edit-time backdrop-blur-md backdrop-brightness-75"
                v-if="addTimeShow"
            >
                <div
                    class="edit-time__box px-8 py-4 w-80 bg-off-base shadow-lg rounded-lg flex flex-col"
                    ref="addTimeEL"
                >
                    <section>
                        <h6 class="item font-semibold text-base">选择节次</h6>

                        <div class="item flex justify-evenly items-center">
                            <div class="start flex flex-col items-center">
                                <input
                                    type="number"
                                    name="start-section"
                                    id=""
                                    class="w-8 h-8 bg-base text-base rounded-md text-center outline"
                                    :class="
                                        sectionState(time.startSection)
                                            ? 'outline-sky-400'
                                            : 'outline-red-400'
                                    "
                                    @mousewheel.prevent="scrollNumber('start')"
                                    v-model="time.startSection"
                                />
                                <span class="text-xs opacity-70 mt-1"
                                    >开始节次</span
                                >
                            </div>
                            <span class="pb-4 font-semibold">→</span>
                            <div class="end flex flex-col items-center">
                                <input
                                    type="number"
                                    name="start-section"
                                    id=""
                                    class="w-8 h-8 bg-base text-base rounded-md text-center outline"
                                    :class="
                                        sectionState(time.endSection)
                                            ? 'outline-sky-400'
                                            : 'outline-red-400'
                                    "
                                    @mousewheel.prevent="scrollNumber('end')"
                                    v-model="time.endSection"
                                />
                                <span class="text-xs opacity-70 mt-1"
                                    >结束节次</span
                                >
                            </div>
                        </div>
                    </section>

                    <!-- 星期 -->
                    <section>
                        <h6 class="item font-semibold text-base">选择星期</h6>
                        <div class="item flex justify-between">
                            <button
                                v-for="item in 7"
                                class="flex items-center justify-center w-8 h-8 rounded-full ease-in-out duration-150 hover:bg-primary hover:text-secondary active:brightness-110"
                                @click="time.day = item"
                                :class="[
                                    time.day === item
                                        ? 'bg-primary text-secondary'
                                        : 'bg-off-base text-base'
                                ]"
                            >
                                {{ item }}
                            </button>
                        </div>
                    </section>

                    <section>
                        <h6 class="item font-semibold text-base">选择周次</h6>
                        <div class="item flex flex-wrap">
                            <div
                                class="basis-1/6 inline-block"
                                v-for="item in totalWeeks"
                            >
                                <button
                                    class="flex items-center mx-auto mb-0.5 justify-center w-8 h-8 rounded-full ease-in-out duration-150"
                                    :class="[
                                        !AvailableWeek.includes(item)
                                            ? 'bg-muted text-secondary hover:bg-muted hover:cursor-no-drop'
                                            : 'hover:bg-primary hover:text-secondary active:brigntness-110',
                                        time.weeks.includes(item)
                                            ? 'bg-primary text-secondary'
                                            : 'bg-off-base text-base'
                                    ]"
                                    @click="
                                        time.weeks.includes(item)
                                            ? time.weeks.splice(
                                                  time.weeks.indexOf(item),
                                                  1
                                              )
                                            : time.weeks.push(item)
                                    "
                                >
                                    {{ item }}
                                </button>
                            </div>
                        </div>
                    </section>
                    <section>
                        <h6 class="item font-semibold text-base">其他信息</h6>
                        <div class="item flex flex-col">
                            <div class="item flex justify-between">
                                <span>教室</span>
                                <input
                                    type="text"
                                    class="px-2 rounded-md text-primary"
                                    placeholder="教室"
                                    v-model="time.classroom"
                                />
                            </div>
                            <div class="item flex justify-between">
                                <span>教师</span>
                                <input
                                    type="text"
                                    class="px-2 rounded-md text-primary"
                                    placeholder="教师"
                                    v-model="time.teacher"
                                />
                            </div>
                        </div>
                    </section>

                    <section
                        class="control flex justify-between mt-4 font-semibold"
                    >
                        <button
                            class="control__item px-3 py-1 rounded-md outline outline-0 duration-150 ease-in-out bg-off-base text-base hover:text-base hover:outline-2"
                            @click="addTimeShow = false"
                        >
                            取消
                        </button>
                        <button
                            class="control__item px-3 py-1 rounded-md outline outline-0 duration-150 ease-in-out bg-primary text-secondary hover:bg-secondary hover:text-primary hover:outline-2"
                            @click="addTime"
                        >
                            添加
                        </button>
                    </section>
                </div>
            </div>
        </transition>
    </div>
</template>
<script lang="ts">
import { useCourseStore } from '@/store/course'
import { defineComponent, reactive, ref, toRefs, computed } from 'vue'
import { RoCourse, courseDuractionModel } from '@/types/course'
import { onClickOutside } from '@vueuse/core'
import { storeToRefs } from 'pinia'

interface time {
    startSection: number | null
    endSection: number | null
    day: number | null
    weeks: number[]
    classroom: string
    teacher: string
}

export default defineComponent({
    name: 'EditCourse',
    props: {
        showEditCourse: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:showEditCourse'],
    setup(props, context) {
        const courseStore = useCourseStore()
        const addTimeEL = ref<HTMLDivElement | null>(null)
        const { totalWeeks } = storeToRefs(courseStore)

        const data = reactive({
            courseName: '',
            color: 'amber',
            icon: '',
            timeList: <time[]>[],
            addTimeShow: false
        })

        const time = ref<time>({
            startSection: null,
            endSection: null,
            day: null,
            weeks: [],
            classroom: '',
            teacher: ''
        })

        function getNumberArr(a: number, b: number): number[] {
            return Array.from(Array(b - a + 1)).map((e, i) => a + i)
        }

        onClickOutside(addTimeEL, () => {
            data.addTimeShow = false
        })

        const check = () => {
            if (
                data.courseName.length === 0 ||
                // data.color.length === 0 ||
                // data.icon.length === 0 ||
                data.timeList.length === 0
            ) {
                return false
            }
            return true
        }

        const formatTime = (): courseDuractionModel[] => {
            const timeList = data.timeList.map<courseDuractionModel | null>(
                item => {
                    const { weeks, day, startSection, endSection, classroom } =
                        item

                    if (startSection && endSection && weeks.length > 0 && day) {
                        let section = getNumberArr(startSection, endSection)

                        return {
                            weeks,
                            day,
                            section,
                            classroom
                        }
                    } else {
                        return null
                    }
                }
            )
            const res: courseDuractionModel[] = <courseDuractionModel[]>(
                timeList.filter(item => item !== null)
            )
            return res
        }

        const addCourse = () => {
            if (!check()) {
                return
            }

            let course: RoCourse = {
                key: 0,
                courseName: data.courseName, // 课程名称
                courseTeacher: '王老师', // 授课教师
                duration: formatTime(),
                color: 'amber' // 颜色
            }

            courseStore.insertCourse(course)
            context.emit('update:showEditCourse', false)
        }

        const addTime = () => {
            let { startSection, endSection, day, weeks, classroom, teacher } =
                time.value

            time.value.weeks = time.value.weeks.filter(item =>
                AvailableWeek.value.includes(item)
            )

            if (
                startSection &&
                endSection &&
                day &&
                weeks.length > 0 &&
                classroom.length > 0 &&
                teacher.length > 0 &&
                sectionState(startSection) &&
                sectionState(endSection)
            ) {
                data.timeList.push(time.value)
                time.value = {
                    startSection: null,
                    endSection: null,
                    day: null,
                    weeks: [],
                    classroom: '',
                    teacher: ''
                }
                data.addTimeShow = false
            } else {
                console.log('startSection', startSection)
                console.log('endSection', endSection)
                console.log('day', day)
                console.log('weeks', weeks)
                console.log('classroom', classroom)
                console.log('teacher', teacher)

                console.log('请检查输入')
            }
        }

        // 滚轮切换数字
        const scrollNumber = (target: string) => {
            let event = window.event as WheelEvent
            if (target === 'start') {
                if (event?.deltaY > 0) {
                    if (time.value.startSection !== null) {
                        time.value.startSection =
                            time.value.startSection <= 1
                                ? 1
                                : --time.value.startSection
                    } else {
                        time.value.startSection = 1
                    }
                } else {
                    if (time.value.startSection !== null) {
                        time.value.startSection =
                            time.value.startSection > 98
                                ? 99
                                : ++time.value.startSection
                    } else {
                        time.value.startSection = 1
                    }
                }
            } else {
                if (event?.deltaY > 0) {
                    if (time.value.endSection !== null) {
                        time.value.endSection =
                            time.value.endSection <= 1
                                ? 1
                                : --time.value.endSection
                    } else {
                        time.value.endSection = 1
                    }
                } else {
                    if (time.value.endSection !== null) {
                        time.value.endSection =
                            time.value.endSection > 98
                                ? 99
                                : ++time.value.endSection
                    } else {
                        time.value.endSection = 1
                    }
                }
            }
        }

        // 检查节次信息是否合法
        const sectionState = (val: number | null): boolean => {
            if (val === null) {
                return false
            } else if (val < 1 || val > 99) {
                return false
            } else if (
                time.value.startSection &&
                time.value.endSection &&
                time.value.startSection > time.value.endSection
            ) {
                return false
            } else {
                return true
            }
        }

        // 可用周次
        const AvailableWeek = computed<number[]>(() => {
            const { day, startSection, endSection } = time.value

            if (day && sectionState(startSection) && sectionState(endSection)) {
                let section = getNumberArr(startSection!, endSection!)
                return courseStore.getAbleWeek(day, section)
            } else {
                return []
            }
        })

        return {
            ...toRefs(data),
            time,
            AvailableWeek,
            totalWeeks,
            sectionState,
            addCourse,
            addTime,
            scrollNumber,
            addTimeEL
        }
    }
})
</script>

<style lang="scss" scoped>
.item {
    margin-bottom: 4px;
}

.edit-time {
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

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input[type='number'] {
    -moz-appearance: textfield;
}
</style>
