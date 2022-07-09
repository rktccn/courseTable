<template>
    <div class="flex w-screen h-screen px-6 py-8">
        <section class="week bg-slate-100 basis-5/12 p-3">
            <todayVue></todayVue>
        </section>
        <section class="day flex flex-col basis-7/12 p-3">
            <courseTableVue class="basis-5/6"></courseTableVue>
            <Weektable class="basis-1/6"></Weektable>
        </section>
    </div>
</template>

<script setup lang="ts">
import todayVue from './components/today.vue'
import courseTableVue from './components/courseTable.vue'

import { useCourseStore } from './store/course'
import Weektable from './components/weektable.vue'
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
</script>

<style></style>
