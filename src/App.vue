<template>
    <div class="flex w-screen h-screen">
        <section
            class="week bg-slate-50 basis-5/12 grow pl-12 pr-8 py-8 overflow-hidden"
        >
            <todayVue></todayVue>
        </section>
        <section
            class="day flex flex-col basis-7/12 grow pl-8 pr-12 py-8 overflow-hidden"
        >
            <TableFunction></TableFunction>
            <div class="table grow h-full relative">
                <transition :name="data.animationTag">
                    <component
                        :week="data.currentWeekIndex"
                        :is="CourseTable"
                        class="h-full w-full absolute top-0 left-0"
                        :key="data.currentWeekIndex"
                    ></component>
                </transition>
            </div>
            <Weektable></Weektable>
        </section>

        <div class="hidden">
            {{ currentWeekInfo }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineComponent, reactive, toRefs, computed } from 'vue'
import { useCourseStore } from './store/course'
import { useAppStore } from './store/app'

import todayVue from './components/today.vue'
import CourseTable from './components/courseTable.vue'
import Weektable from './components/weektable.vue'
import TableFunction from './components/tableFunction.vue'

const courseStore = useCourseStore()
for (let i = 0; i < 20; i++) {
    courseStore.weekInfo.push([])
    for (let j = 0; j < 7; j++) {
        courseStore.weekInfo[i].push([])
        for (let k = 0; k < 20; k++) {
            courseStore.weekInfo[i][j].push(null)
        }
    }
}

const appStore = useAppStore()

const data = reactive({
    currentWeekIndex: 0,
    animationTag: ''
})

let currentWeekInfo = computed({
    get: () => {
        console.log(data.currentWeekIndex)

        if (data.currentWeekIndex < appStore.currentWeek) {
            data.animationTag = 'slide-right'
        }
        if (data.currentWeekIndex > appStore.currentWeek) {
            data.animationTag = 'slide-left'
        }

        console.log('data.animationTag', data.animationTag)

        data.currentWeekIndex = appStore.currentWeek
        return courseStore.getCourseTable(data.currentWeekIndex)
    },
    set: () => {}
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
