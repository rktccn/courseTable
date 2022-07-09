<template>
    <div>
        <div class="week flex justify-between">
            <span
                class="bg-amber-400 flex flex-col items-center px-4 py-1 rounded-full grayscale"
                ><p class="text-base">15</p>
                <p class="text-sm">周</p></span
            >

            <span
                class="bg-amber-400 flex flex-col items-center px-4 py-1 rounded-full"
                ><p class="text-base">16</p>
                <p class="text-sm">周</p></span
            >

            <span
                class="bg-amber-400 flex flex-col items-center px-4 py-1 rounded-full sepia"
                ><p class="text-base">17</p>
                <p class="text-sm">周</p></span
            >

            <span
                class="bg-amber-400 flex flex-col items-center px-4 py-1 rounded-full sepia"
                ><p class="text-base">18</p>
                <p class="text-sm">周</p></span
            >

            <span
                class="bg-amber-400 flex flex-col items-center px-4 py-1 rounded-full sepia"
                ><p class="text-base">19</p>
                <p class="text-sm">周</p></span
            >

            <span
                class="bg-amber-400 flex flex-col items-center px-4 py-1 rounded-full sepia"
                ><p class="text-base">20</p>
                <p class="text-sm">周</p></span
            >
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'WeekTable',
    setup() {}
})
</script>
