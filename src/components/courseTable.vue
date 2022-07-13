<template>
    <div class="flex flex-col h-full">
        <section
            class="grid grid-cols-8 mb-3 bg-amber-100 rounded-t-lg overflow-hidden"
        >
            <span
                class="py-3 bg-amber-300 flex items-center justify-center font-semibold cursor-pointer hover:bg-amber-200"
                >{{ week }}周
            </span>
            <span class="flex flex-col justify-center items-center">
                <p class="text-base font-semibold">周日</p>
                <p class="text-sm opacity-60 leading-3">7/8</p>
            </span>

            <span class="flex flex-col justify-center items-center">
                <p class="text-base font-semibold">周一</p>
                <p class="text-sm opacity-60 leading-3">7/9</p>
            </span>
            <span class="flex flex-col justify-center items-center">
                <p class="text-base font-semibold">周二</p>
                <p class="text-sm opacity-60 leading-3">7/10</p>
            </span>
            <span class="flex flex-col justify-center items-center">
                <p class="text-base font-semibold">周三</p>
                <p class="text-sm opacity-60 leading-3">7/11</p>
            </span>
            <span class="flex flex-col justify-center items-center">
                <p class="text-base font-semibold">周四</p>
                <p class="text-sm opacity-60 leading-3">7/12</p>
            </span>
            <span class="flex flex-col justify-center items-center">
                <p class="text-base font-semibold">周五</p>
                <p class="text-sm opacity-60 leading-3">7/13</p>
            </span>
            <span class="flex flex-col justify-center items-center">
                <p class="text-base font-semibold">周六</p>
                <p class="text-sm opacity-60 leading-3">7/14</p>
            </span>
        </section>

        <section
            class="grid grid-cols-8 gap-2 flex-grow text-center"
            :style="{ gridTemplateRows: 'repeat(8, minmax(0, 1fr))' }"
        >
            <span :style="{ gridArea: '1/1/2/2' }">8:00</span>
            <span :style="{ gridArea: '2/1/3/2' }">9:15</span>
            <span :style="{ gridArea: '3/1/4/2' }">10:30</span>
            <span :style="{ gridArea: '4/1/5/2' }">11:45</span>
            <span :style="{ gridArea: '5/1/6/2' }">13:00</span>
            <span :style="{ gridArea: '6/1/7/2' }">14:15</span>
            <span :style="{ gridArea: '7/1/8/2' }">15:30</span>
            <span :style="{ gridArea: '8/1/9/2' }">16:45</span>

            <span
                class="bg-amber-100 rounded-md p-1 text-amber-600 font-semibold hover:outline"
                :style="{
                    gridArea: '3/4/5/5'
                }"
                >语文</span
            >
            <span
                class="bg-amber-100 rounded-md p-1 text-amber-600 font-semibold hover:outline"
                :style="{
                    gridArea: '5/3/8/4'
                }"
                >语文</span
            >
            <span
                class="bg-amber-100 rounded-md p-1 text-amber-600 font-semibold hover:outline"
                :style="{
                    gridArea: '1/7/3/8'
                }"
                >语文</span
            >
            <span
                class="bg-amber-100 rounded-md p-1 text-amber-600 font-semibold hover:outline"
                :style="{
                    gridArea: '4/7/6/8'
                }"
                >语文</span
            >
            <span
                class="bg-amber-100 rounded-md p-1 text-amber-600 font-semibold hover:outline"
                :style="{
                    gridArea: '5/5/7/6'
                }"
                >语文</span
            >
            <span
                class="bg-amber-100 rounded-md p-1 text-amber-600 font-semibold hover:outline"
                :style="{
                    gridArea: '2/3/4/4'
                }"
                >语文</span
            >
            <span
                class="bg-amber-100 rounded-md p-1 text-amber-600 font-semibold hover:outline"
                :style="{
                    gridArea: '3/6/6/7'
                }"
                >语文</span
            >
        </section>
    </div>
</template>
<script lang="ts">
import { useAppStore } from '@/store/app'
import { useCourseStore } from '@/store/course'
import { defineComponent, reactive, computed, toRefs } from 'vue'

export default defineComponent({
    name: 'CourseTable',
    props: {
        week: { type: Number, required: true }
    },

    setup() {
        const appStore = useAppStore()
        const courseStore = useCourseStore()
    }
})
</script>

<style lang="scss"></style>
