<template>
    <div class="flex w-screen h-screen relative">
        <section class="week basis-4/12 grow pl-8 pr-4 py-8 overflow-hidden xl:basis-5/12">
            <todayVue></todayVue>
        </section>

        <section
            class="day flex flex-col basis-8/12 grow pl-4 pr-8 py-8 overflow-hidden xl:basis-7/12"
        >
            <TableFunction></TableFunction>
            <div class="table grow h-full relative my-3">
                <transition :name="animationTag">
                    <component
                        :week="currentWeekIndex"
                        :is="$options.components?.CourseTable"
                        class="h-full w-full absolute top-0 left-0"
                        :key="currentWeekIndex"
                    ></component>
                </transition>
            </div>
            <WeekList></WeekList>
        </section>

        <div class="hidden">
            {{ currentWeekInfo }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, computed } from 'vue'
import { useCourseStore } from '@/store/course'
import { useAppStore } from '@/store/app'
import { onClickOutside } from '@vueuse/core'

import todayVue from '@/components/today.vue'
import CourseTable from '@/components/courseTable.vue'
import WeekList from '@/components/weekList.vue'
import TableFunction from '@/components/tableFunction.vue'
import EditCourse from '@/components/editCourse.vue'

export default defineComponent({
    name: 'Home',
    setup() {
        const courseStore = useCourseStore()

        const appStore = useAppStore()
        appStore.currentWeek = 1

        const data = reactive({
            currentWeekIndex: 0,
            animationTag: '',
            editCoursePosition: [0, 0]
        })

        const editCourse = ref(null)
        onClickOutside(editCourse, () => {
            // data.showEditCourse = false
        })

        let currentWeekInfo = computed({
            get: () => {
                if (data.currentWeekIndex < appStore.currentWeek) {
                    data.animationTag = 'slide-right'
                }
                if (data.currentWeekIndex > appStore.currentWeek) {
                    data.animationTag = 'slide-left'
                }

                data.currentWeekIndex = appStore.currentWeek
                return courseStore.getCourseTable(data.currentWeekIndex)
            },
            set: () => {}
        })

        return {
            ...toRefs(data),
            currentWeekInfo,
            editCourse
        }
    },
    components: {
        todayVue,
        CourseTable,
        WeekList,
        TableFunction,
        EditCourse
    }
})
</script>

<style lang="scss" scoped>
.slide-left-enter-from {
    transform: translateX(-100%);
    opacity: 0;
}

.slide-left-enter-to {
    transform: translateX(0);
    opacity: 1;
}

.slide-left-enter-active {
    transition: all 0.3s ease-out;
}

.slide-right-enter-from {
    transform: translateX(100%);
    opacity: 0;
}

.slide-right-enter-to {
    transform: translateX(0);
    opacity: 1;
}

.slide-right-enter-active {
    transition: all 0.3s ease-out;
}

.slide-right-leave-to,
.slide-left-leave-to {
    opacity: 0;
    transform: scale(0.8);
}

.slide-right-leave-from,
.slide-left-leave-from {
    opacity: 1;
    transform: scale(1);
}

.slide-right-leave-active,
.slide-left-leave-active {
    transition: all 0.3s ease-out;
}
</style>
