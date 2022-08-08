<template>
    <div
        class="backdrop-blur-md backdrop-brightness-75 z-20 w-full h-full flex items-center justify-center"
        @click.self="cancel"
    >
        <div
            class="text-base px-8 py-4 bg-off-base shadow-lg rounded-lg w-2/3 max-w-md flex flex-col"
        >
            <header class="flex justify-between">
                <h6 class="text-xl font-semibold">
                    {{ $t('editTime.title') }}
                </h6>
                <svg
                    @click="cancel"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-muted cursor-pointer hover:text-muted-hover"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </header>

            <!-- <section class="mt-3 flex justify-between items-center">
                <span>上课时长</span>
                <span>
                    <input
                        class="w-10 h-7 px-1 outline outline-2 bg-base rounded-md text-center text-primary font-semibold"
                        type="number"
                        name=""
                        id=""
                    />
                    <span class="text-base opacity-90 ml-2">分钟</span>
                </span>
            </section> -->

            <section class="mt-3">
                <header class="text-sm text-muted-hover">
                    {{ $t('editTime.morning') }}
                </header>
                <section class="time-list p-1 max-h-48 overflow-scroll">
                    <span
                        v-for="section in courseSection[0]"
                        :key="section"
                        class="my-2 flex justify-between"
                    >
                        <span class="">
                            {{ $t('editTime.section', { index: section }) }}
                        </span>
                        <div class="flex">
                            <input
                                class="time text-base bg-base pl-2 rounded-md outline outline-2"
                                type="time"
                                name=""
                                id=""
                                :min="timeList[section - 2]?.end ?? '00:00'"
                                :max="timeList[section - 1]?.end ?? '24:00'"
                                v-model="timeList[section - 1].start"
                            />
                            <em class="mx-3"> - </em>
                            <input
                                class="time text-base bg-base pl-2 rounded-md outline outline-2"
                                type="time"
                                name=""
                                id=""
                                :min="timeList[section - 1]?.start ?? '00:00'"
                                :max="timeList[section]?.start ?? '24:00'"
                                v-model="timeList[section - 1].end"
                            />
                        </div>
                    </span>
                </section>
            </section>

            <section class="time-list mt-3">
                <header class="text-sm text-muted-hover">
                    {{ $t('editTime.afternoon') }}
                </header>
                <section class="time-list p-1 max-h-48 overflow-scroll">
                    <span
                        v-for="section in courseSection[1]"
                        :key="section"
                        class="my-2 flex justify-between"
                    >
                        <span class="">
                            {{ $t('editTime.section', { index: section }) }}
                        </span>
                        <div class="flex">
                            <input
                                class="time text-base bg-base pl-2 rounded-md outline outline-2"
                                type="time"
                                name=""
                                id=""
                                :min="
                                    timeList[section - 2 + courseSection[0]]
                                        ?.end ?? '00:00'
                                "
                                :max="
                                    timeList[section - 1 + courseSection[0]]
                                        ?.end ?? '24:00'
                                "
                                v-model="
                                    timeList[section - 1 + courseSection[0]]
                                        .start
                                "
                            />
                            <em class="mx-3"> - </em>
                            <input
                                class="time text-base bg-base pl-2 rounded-md outline outline-2"
                                type="time"
                                name=""
                                id=""
                                :min="
                                    timeList[section - 1 + courseSection[0]]
                                        ?.start ?? '00:00'
                                "
                                :max="
                                    timeList[section + courseSection[0]]
                                        ?.start ?? '24:00'
                                "
                                v-model="
                                    timeList[section - 1 + courseSection[0]].end
                                "
                            />
                        </div>
                    </span>
                </section>
            </section>

            <section class="control flex justify-between mt-4 font-semibold">
                <button
                    class="control__item px-3 py-1 rounded-md outline outline-0 duration-150 ease-in-out bg-off-base text-base hover:text-base hover:outline-2"
                    @click="cancel"
                >
                    {{ $t('cancel') }}
                </button>
                <RoButton
                    class="control__item"
                    type="default"
                    @click="submitTime"
                >
                    {{ $t('confirm') }}
                </RoButton>
            </section>
        </div>
    </div>
</template>
<script lang="ts">
import { useCourseStore } from '@/store/course'
import { storeToRefs } from 'pinia'
import { defineComponent, ref } from 'vue'
import { RoCourseTimeType } from '@/types/course'
import RoButton from './roButton.vue'
import { klona } from 'klona'

export default defineComponent({
    name: 'EidtTime',
    props: {
        isShow: {
            type: Boolean,
            require: true
        }
    },
    emits: ['update:isShow'],
    setup(props, context) {
        const courseStore = useCourseStore()
        const { courseTimeList, courseSection } = storeToRefs(courseStore)
        const timeList = ref<RoCourseTimeType[]>([
            { start: null, end: null },
            { start: null, end: null },
            { start: null, end: null },
            { start: null, end: null },
            { start: null, end: null },
            { start: null, end: null },
            { start: null, end: null },
            { start: null, end: null }
        ])
        const initData = () => {
            timeList.value = klona(courseTimeList.value)
        }
        initData()
        const check = () => {
            let time = timeList.value
            let flag = true
            for (let i = 0; i < time.length; i++) {
                if (time[i].start === null || time[i].end === null) {
                    flag = false
                    break
                } else if (time[i].start! > time[i].end!) {
                    flag = false
                    break
                } else if (time[i].end! > time[i + 1]?.end! ?? '24:00') {
                    flag = false
                    break
                }
            }
            return flag
        }
        const cancel = () => {
            context.emit('update:isShow', false)
        }
        const submitTime = () => {
            if (check()) {
                let time: RoCourseTimeType[] = timeList.value
                time.forEach((item, index) => {
                    courseStore.setSection(index + 1, item)
                })
                cancel()
            }
        }
        return { timeList, courseTimeList, courseSection, submitTime, cancel }
    },
    components: { RoButton }
})
</script>

<style lang="scss">
.time {
    &:invalid {
        outline-color: var(--color-danger-text);
    }

    &:valid {
        outline-color: var(--color-success-text);
    }
}

.time-list {
    -webkit-overflow-scrolling: touch;
    user-select: none;
    &::-webkit-scrollbar {
        display: none;
    }
}
</style>
