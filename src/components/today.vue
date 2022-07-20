<template>
    <div>
        <section class="flex justify-between font-semibold mb-2">
            <div class="title flex flex-col">
                <span class="text-3xl">今日</span>
                <span class="text-2xl text-amber-400">7月8日 星期五</span>
            </div>
            <div class="weather flex items-center">
                <span class="mr-3">icon</span>
                <div class="info flex flex-col">
                    <span class="text-xl">多云</span>
                    <span class="text-thin text-base">21-23℃</span>
                </div>
            </div>
        </section>

        <section class="flex relative flex-col mb-6">
            <div class="flex text-xl items-center my-1 grayscale" id="current">
                <span
                    class="flex flex-col relative grow overflow-hidden p-4 pl-8 rounded-lg shadow-sm bg-amber-100 text-amber-600 font-semibold before:block before:absolute before:left-0 before:top-0 before:w-2 before:h-full before:bg-amber-600"
                >
                    <span class="flex text-sm">
                        <span>8:00 AM</span>
                        <em class="mx-1">-</em>
                        <span>9:15 AM</span>
                    </span>
                    <p class="text-xl overflow-hidden truncate">
                        算法与数据结构课程设计结构课程设计
                    </p>
                    <span class="text-base">C101</span>
                </span>
            </div>
            <div class="flex text-xl items-center my-1">
                <span
                    class="flex flex-col relative grow overflow-hidden p-4 pl-8 rounded-lg shadow-sm bg-amber-100 text-amber-600 font-semibold before:block before:absolute before:left-0 before:top-0 before:w-2 before:h-full before:bg-amber-600"
                >
                    <span class="flex text-sm">
                        <span>8:00</span>
                        <em class="mx-1">-</em>
                        <span>9:15</span>
                    </span>
                    <span class="text-2xl">英语</span>
                    <span class="text-base">C101</span>
                </span>
            </div>

            <div class="flex text-xl items-center my-1 sepia">
                <span
                    class="flex flex-col relative grow overflow-hidden p-4 pl-8 rounded-lg shadow-sm bg-amber-100 text-amber-600 font-semibold before:block before:absolute before:left-0 before:top-0 before:w-2 before:h-full before:bg-amber-600"
                >
                    <span class="flex text-sm">
                        <span>8:00</span>
                        <em class="mx-1">-</em>
                        <span>9:15</span>
                    </span>
                    <span class="text-2xl">数学</span>
                    <span class="text-base">C101</span>
                </span>
            </div>

            <div
                class="pointer absolute flex flex-col items-end w-full"
                :style="{ top: '150px', left: '0' }"
            >
                <span class="mr-3 text-blue-600 opacity-60 text-sm">8:25</span>
                <span class="w-full h-0.5 bg-sky-600 opacity-50"></span>
            </div>
        </section>

        <section class="flex flex-col">
            <span class="text-2xl font-semibold">明日</span>
            <span class="text-md">没有课程</span>
        </section>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Today',
    setup() {}
})
</script>
