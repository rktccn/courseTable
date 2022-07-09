<template>
    <div class="flex flex-col">
        <secton class="grid grid-cols-8">
            <span></span>
            <span class="flex flex-col justify-center items-center">
                <p class="text-base">周日</p>
                <p class="text-sm">7/8</p>
            </span>

            <span class="flex flex-col justify-center items-center">
                <p class="text-base">周一</p>
                <p class="text-sm">7/9</p>
            </span>
            <span class="flex flex-col justify-center items-center">
                <p class="text-base">周二</p>
                <p class="text-sm">7/10</p>
            </span>
            <span class="flex flex-col justify-center items-center">
                <p class="text-base">周三</p>
                <p class="text-sm">7/11</p>
            </span>
            <span class="flex flex-col justify-center items-center">
                <p class="text-base">周四</p>
                <p class="text-sm">7/12</p>
            </span>
            <span class="flex flex-col justify-center items-center">
                <p class="text-base">周五</p>
                <p class="text-sm">7/13</p>
            </span>
            <span class="flex flex-col justify-center items-center">
                <p class="text-base">周六</p>
                <p class="text-sm">7/14</p>
            </span>
        </secton>

        <section
            class="grid grid-cols-8 gap-2 flex-grow"
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
                class="bg-green-400 rounded-md p-1"
                :style="{ gridArea: '3/4/5/5' }"
                >语文</span
            >
            <span
                class="bg-green-400 rounded-md p-1"
                :style="{ gridArea: '5/3/8/4' }"
                >语文</span
            >
            <span
                class="bg-green-400 rounded-md p-1"
                :style="{ gridArea: '1/7/3/8' }"
                >语文</span
            >
            <span
                class="bg-green-400 rounded-md p-1"
                :style="{ gridArea: '4/7/6/8' }"
                >语文</span
            >
            <span
                class="bg-green-400 rounded-md p-1"
                :style="{ gridArea: '5/5/7/6' }"
                >语文</span
            >
            <span
                class="bg-green-400 rounded-md p-1"
                :style="{ gridArea: '2/3/4/4' }"
                >语文</span
            >
            <span
                class="bg-green-400 rounded-md p-1"
                :style="{ gridArea: '3/6/6/7' }"
                >语文</span
            >
        </section>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CourseTable',
    setup() {}
})
</script>
