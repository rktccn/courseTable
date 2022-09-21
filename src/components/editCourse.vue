<template>

    <div>
        <div class="edit-course">
            <div
                class="edit-course__box px-8 py-4 bg-off-base shadow-lg rounded-lg select-none text-base"
            >
                <div class="flex flex-col my-2">
                    <span class="item text-xs opacity-70"
                        >{{ $t('editCourse.base.title')
                        }}<em class="text-xs ml-1 text-red-600">{{
                            $t(error.base)
                        }}</em></span
                    >
                    <input
                        class="item px-2 rounded-md text-primary"
                        type=" text"
                        v-model="courseName"
                        :placeholder="$t('editCourse.base.courseName')"
                    />
                    <div class="item flex items-center justify-between">
                        <span> {{ $t('editCourse.base.color') }}</span>
                        <span class="relative">
                            <button
                                class="h-5 rounded aspect-square block duration-150 ease-in-out outline outline-2 hover:brightness-110"
                                :class="`bg-${color}-200 outline-${color}-400`"
                                @click.self="isColorShow = !isColorShow"
                            ></button>

                            <transition name="drop-b">
                                <div
                                    v-if="isColorShow"
                                    class="color-list z-10 absolute mt-1 px-3 py-2 bg-off-base shadow-md rounded-md"
                                    ref="colorList"
                                >
                                    <button
                                        v-for="item in courseColorKey"
                                        :class="getColor(item)"
                                        class="h-5 rounded outline outline-2 aspect-square block hover:brightness-110"
                                        @click="selectColor(item)"
                                    ></button>
                                </div>
                            </transition>
                        </span>
                    </div>
                </div>

                <div class="flex flex-col my-2">
                    <span class="item text-xs opacity-70"
                        >{{ $t('editCourse.timeAndLocation.title')
                        }}<em class="text-xs ml-1 text-red-600">{{
                            $t(error.timeList)
                        }}</em></span
                    >

                    <div class="time-list">
                        <div
                            class="item time-list__item flex flex-col my-1 text-sm bg-secondary p-2 rounded-md leading-7 cursor-pointer"
                            v-for="time in timeList"
                            @click="editTime(time)"
                        >
                            <div class="time flex justify-between text-primary">
                                <span
                                    >{{
                                        $t(`base.weekList.${time.day}`)
                                    }},&nbsp;{{
                                        $t(
                                            'editCourse.timeAndLocation.weekLength',
                                            {
                                                length: time.weeks.length
                                            }
                                        )
                                    }}</span
                                >
                                <span class="ml-3">
                                    {{
                                        $t(
                                            'editCourse.timeAndLocation.section',
                                            {
                                                section: `${time.startSection}-${time.endSection}`
                                            }
                                        )
                                    }}
                                </span>
                            </div>

                            <div
                                class="location flex justify-between text-primary"
                            >
                                <span>{{ time.classroom }}</span>
                                <span>{{ time.teacher }}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        class="item outline rounded mt-2"
                        @click="addTimeShow = true"
                    >
                        {{ $t('editCourse.timeAndLocation.addTime') }}
                    </button>
                </div>
                <!-- 删除课程 -->
                <section v-if="courseKey" class="item block">
                    <button
                        class="px-3 py-1 rounded-md outline outline-0 duration-150 ease-in-out bg-primary text-secondary hover:bg-secondary hover:text-primary hover:outline-2"
                        @click="deleteCourse"
                    >
                        {{ $t('editCourse.base.deleteCourse') }}
                    </button>
                </section>

                <div class="control flex justify-between mt-4 font-semibold">
                    <button
                        class="control__item px-3 py-1 rounded-md outline outline-0 duration-150 ease-in-out bg-off-base text-base hover:text-base hover:outline-2"
                        @click="closeFN()"
                    >
                        {{ $t('cancel') }}
                    </button>
                    <RoButton :type="state.baseButton" @click="addCourse">{{
                        $t('add')
                    }}</RoButton>

                    <!-- <button
                    class="control__item px-3 py-1 rounded-md outline outline-0 duration-150 ease-in-out bg-primary text-secondary hover:bg-secondary hover:text-primary hover:outline-2"
                >
                    添加
                </button> -->
                </div>
            </div>
        </div>
        <!-- 时间管理 -->
        <transition name="drop-b">
            <div class="edit-time backdrop-brightness-75" v-if="addTimeShow">
                <div
                    class="edit-time__box px-8 py-4 w-80 bg-off-base shadow-lg rounded-lg flex flex-col"
                    ref="addTimeEL"
                >
                    <section>
                        <h6 class="item font-semibold text-base">
                            {{ $t('editCourse.selectSection.title')
                            }}<em class="text-xs ml-1 text-red-600">{{
                                $t(error.selectSection)
                            }}</em>
                        </h6>

                        <div class="item flex justify-evenly items-center">
                            <div class="start flex flex-col items-center">
                                <input
                                    type="number"
                                    name="start-section"
                                    id=""
                                    class="w-8 h-8 bg-base text-base rounded-md text-center outline"
                                    :class="
                                        sectionState(time.startSection)
                                            ? 'text-success'
                                            : 'text-danger'
                                    "
                                    @mousewheel.prevent="scrollNumber('start')"
                                    v-model="time.startSection"
                                />
                                <span class="text-xs opacity-70 mt-1">
                                    {{
                                        $t(
                                            'editCourse.selectSection.startSection'
                                        )
                                    }}</span
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
                                            ? 'text-success'
                                            : 'text-danger'
                                    "
                                    @mousewheel.prevent="scrollNumber('end')"
                                    v-model="time.endSection"
                                />
                                <span class="text-xs opacity-70 mt-1">
                                    {{
                                        $t(
                                            'editCourse.selectSection.endSection'
                                        )
                                    }}</span
                                >
                            </div>
                        </div>
                    </section>

                    <!-- 星期 -->
                    <section>
                        <h6 class="item font-semibold text-base">
                            {{ $t('editCourse.selectDay.title')
                            }}<em class="text-xs ml-1 text-red-600">{{
                                $t(error.selectDay)
                            }}</em>
                        </h6>
                        <div class="item flex justify-between">
                            <button
                                v-for="item in 7"
                                class="flex items-center justify-center w-8 h-8 rounded-full ease-in-out duration-150 hover:bg-primary hover:text-secondary active:brightness-110"
                                @click="time.day = item - 1"
                                :class="[
                                    time.day === item - 1
                                        ? 'bg-primary text-secondary'
                                        : 'bg-off-base text-base'
                                ]"
                            >
                                {{
                                    $t(
                                        `editCourse.selectDay.weekList.${
                                            item - 1
                                        }`
                                    )
                                }}
                            </button>
                        </div>
                    </section>

                    <section>
                        <h6 class="item font-semibold text-base">
                            {{ $t('editCourse.selectWeek.title')
                            }}<em class="text-xs ml-1 text-red-600">
                                {{ $t(error.selectWeek) }}</em
                            >
                        </h6>
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
                        <h6 class="item font-semibold text-base">
                            {{ $t('editCourse.otherInfo.title') }}
                        </h6>
                        <div class="item flex flex-col">
                            <div class="item flex justify-between">
                                <span>{{
                                    $t('editCourse.otherInfo.place')
                                }}</span>
                                <input
                                    type="text"
                                    class="px-2 rounded-md text-primary"
                                    :placeholder="
                                        $t('editCourse.otherInfo.place')
                                    "
                                    v-model="time.classroom"
                                />
                            </div>
                            <div class="item flex justify-between">
                                <span>{{
                                    $t('editCourse.otherInfo.teacher')
                                }}</span>
                                <input
                                    type="text"
                                    class="px-2 rounded-md text-primary"
                                    :placeholder="
                                        $t('editCourse.otherInfo.teacher')
                                    "
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
                            @click="closeAddTime"
                        >
                            {{ $t('cancel') }}
                        </button>
                        <RoButton :type="state.addTimeButton" @click="addTime">
                            {{ $t('add') }}</RoButton
                        >
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
import { courseColorKey } from '@/types/course'
import { klona } from 'klona'
import { installI18n } from '@/locale'

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
        courseKey: { type: String, default: undefined },
        closeFN: { type: Function, default: () => {} }
    },
    setup(props, context) {
        const { locale, t } = installI18n().global

        const courseStore = useCourseStore()
        const addTimeEL = ref<HTMLDivElement | null>(null)
        onClickOutside(addTimeEL, () => {
            closeAddTime()
        })

        const colorList = ref<HTMLDivElement | null>(null)
        onClickOutside(colorList, () => {
            data.isColorShow = false
        })

        const { totalWeeks } = storeToRefs(courseStore)

        const data = reactive({
            courseName: '',
            color: 'orange',
            // icon: '',
            timeList: [] as time[],
            addTimeShow: false,
            isColorShow: false,
            isEditTime: false,
            currentEditTime: null as time | null, // 当前编辑的时间
            error: {
                base: 'null',
                timeList: 'null',
                selectSection: 'null',
                selectDay: 'null',
                selectWeek: 'null'
            },
            state: {
                baseButton: 'default',
                addTimeButton: 'default'
            }
        })

        const time = ref<time>({
            startSection: null,
            endSection: null,
            day: null,
            weeks: [],
            classroom: '',
            teacher: ''
        })

        const initCourse = () => {
            if (props.courseKey) {
                let course: RoCourse = klona(
                    courseStore.getCourse(props.courseKey)
                )
                if (!course) return
                data.courseName = course.courseName
                data.color = course.color
                let timeList: time[] = []
                course.duration.forEach(item => {
                    timeList.push({
                        startSection: item.section[0],
                        endSection: item.section[item.section.length - 1],
                        day: item.day,
                        weeks: item.weeks,
                        classroom: item.classroom,
                        teacher: item.teacher
                    })
                })
                data.timeList = timeList
            }
        }

        const getColor = (item: string) => {
            switch (item) {
                case 'sky':
                    return `bg-sky-200 text-sky-600 outline-sky-400`
                case 'red':
                    return `bg-red-200 text-red-600 outline-red-400`
                case 'orange':
                    return `bg-orange-200 text-orange-600 outline-orange-400`
                case 'yellow':
                    return `bg-yellow-200 text-yellow-600 outline-yellow-400`
                case 'green':
                    return `bg-green-200 text-green-600 outline-green-400`
                case 'teal':
                    return `bg-teal-200 text-teal-600 outline-teal-400`
                case 'indigo':
                    return `bg-indigo-200 text-indigo-600 outline-indigo-400`
                case 'purple':
                    return `bg-purple-200 text-purple-600 outline-purple-400`
                case 'pink':
                    return `bg-pink-200 text-pink-600 outline-pink-400`
            }
        }

        const selectColor = (item: string) => {
            data.color = item
            data.isColorShow = false
        }

        function getNumberArr(a: number, b: number): number[] {
            return Array.from(Array(b - a + 1)).map((e, i) => a + i)
        }

        const check = () => {
            let flag = true
            data.error.base = 'null'
            data.error.timeList = 'null'
            if (data.courseName.length === 0) {
                data.error.base = `editCourse.base.error.noName`
                flag = false
            }
            if (data.timeList.length === 0) {
                data.error.timeList = `editCourse.timeAndLocation.error.noTime`

                flag = false
            }

            return flag
        }

        const formatTime = (timeList: time[]): courseDuractionModel[] => {
            const temp = timeList.map(item => {
                const {
                    weeks,
                    day,
                    startSection,
                    endSection,
                    classroom,
                    teacher
                } = item

                if (
                    startSection &&
                    endSection &&
                    weeks.length > 0 &&
                    day !== null
                ) {
                    let section = getNumberArr(startSection, endSection)

                    return {
                        weeks,
                        day,
                        section,
                        classroom,
                        teacher
                    }
                } else {
                    return null
                }
            })

            return temp.filter(item => item !== null) as courseDuractionModel[]
        }

        const editTime = (val: time) => {
            time.value = val
            data.addTimeShow = true
            data.isEditTime = true
            data.currentEditTime = klona(val)
        }

        const addTime = () => {
            data.error.selectDay = 'null'
            data.error.selectSection = 'null'
            data.error.selectWeek = 'null'

            let flag = true
            let { startSection, endSection, day, weeks, classroom, teacher } =
                time.value

            time.value.weeks = time.value.weeks.filter(item =>
                AvailableWeek.value.includes(item)
            )

            if (!startSection && !endSection) {
                data.error.selectSection = `editCourse.selectSection.error.noSection`

                flag = false
            } else if (!startSection) {
                data.error.selectSection = `editCourse.selectSection.error.noStartSection`

                flag = false
            } else if (!endSection) {
                data.error.selectSection = `editCourse.selectSection.error.noEndSection`

                flag = false
            } else if (
                !sectionState(startSection) ||
                !sectionState(endSection)
            ) {
                data.error.selectSection = `editCourse.selectSection.error.noSectionRange`

                flag = false
            }

            if (day === null) {
                data.error.selectDay = `editCourse.selectDay.error.noDay`
                flag = false
            }

            if (weeks.length === 0) {
                data.error.selectWeek = `editCourse.selectWeek.error.noWeek`
                flag = false
            }

            if (flag) {
                data.isEditTime ? '' : data.timeList.push(time.value)
                data.state.addTimeButton = 'success'
                setTimeout(() => {
                    closeAddTime()
                }, 200)
            } else {
                data.state.addTimeButton = 'danger'
            }
        }

        const closeAddTime = () => {
            data.isEditTime = false
            data.addTimeShow = false
            time.value = {
                startSection: null,
                endSection: null,
                day: null,
                weeks: [],
                classroom: '',
                teacher: ''
            }
            data.state.addTimeButton = 'default'
        }

        const addCourse = () => {
            if (!check()) {
                data.state.baseButton = 'danger'
                return
            }

            let course: RoCourse = {
                key: props?.courseKey ?? '0',
                courseName: data.courseName, // 课程名称
                courseTeacher: '王老师', // 授课教师
                duration: formatTime(data.timeList),
                color: data.color // 颜色
            }

            if (props.courseKey) {
                courseStore.updateCourse(course)
            } else {
                courseStore.insertCourse(course)
            }
            data.state.baseButton = 'success'

            setTimeout(() => {
                context.emit('update:isShow', false)
            }, 500)
        }

        const deleteCourse = () => {
            courseStore.deleteCourse(props.courseKey)
            context.emit('update:isShow', false)
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
            } else if (val < 1 || val > courseStore.getMaxSection) {
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

            let availableTime: courseDuractionModel[] | null = null
            if (props.courseKey) {
                availableTime = courseStore.getCourse(props.courseKey).duration
            }

            if (
                day !== null &&
                sectionState(startSection) &&
                sectionState(endSection)
            ) {
                let section = getNumberArr(startSection!, endSection!)
                return courseStore.getAbleWeek(day, section, availableTime)
            } else {
                return []
            }
        })

        initCourse()

        return {
            ...toRefs(data),
            time,
            AvailableWeek,
            totalWeeks,
            courseColorKey,
            sectionState,
            addCourse,
            deleteCourse,
            addTime,
            editTime,
            closeAddTime,
            scrollNumber,
            getColor,
            selectColor,
            addTimeEL,
            colorList
        }
    }
})
</script>

<style lang="scss" scoped>
.edit-course,
.edit-time {
    &__box {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}

.item {
    margin-bottom: 4px;
}
.color-list {
    top: 100%;
    right: 0;

    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 8px;
    justify-content: center;
    align-items: center;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input[type='number'] {
    -moz-appearance: textfield;
}
</style>
