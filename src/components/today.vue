<template>
    <div>
        <section class="flex flex-col font-semibold mb-2">
            <span class="text-4xl">今日</span>
            <span class="text-2xl text-amber-400">7月8日 星期五</span>
        </section>

        <section class="flex flex-col mb-6">
            <div class="flex text-xl items-center my-1 grayscale" id="current">
                <span class="text-right pr-2 w-10"></span>
                <span class="grow bg-amber-400 p-4 rounded-xl font-semibold">
                    <span class="text-2xl">语文</span>
                    <span class="text-xl">8:00-9:15</span>
                </span>
            </div>
            <div class="flex text-xl items-center my-1">
                <span class="text-right pr-2 w-10 font-semibold">→</span>
                <span class="grow bg-amber-400 p-4 rounded-xl font-semibold">
                    <span class="text-2xl">英语</span>
                    <span class="text-xl">9:15-10:30</span>
                </span>
            </div>
            <div class="flex text-xl items-center my-1 sepia">
                <span class="text-right pr-2 w-10"></span>
                <span class="grow bg-amber-400 p-4 rounded-xl font-semibold">
                    <span class="text-2xl">数学</span>
                    <span class="text-xl">10:30-11:45</span>
                </span>
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
