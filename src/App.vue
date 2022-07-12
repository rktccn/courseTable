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
            <courseTableVue class="grow relative"></courseTableVue>
            <Weektable></Weektable>
        </section>
    </div>
</template>

<script setup lang="ts">
import todayVue from './components/today.vue'
import courseTableVue from './components/courseTable.vue'

import { useCourseStore } from './store/course'
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
</script>

<style></style>
