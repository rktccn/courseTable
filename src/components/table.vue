<template>
    <button @click="check">查看</button>
    <div class="day">
        <div v-for="item in 7">{{ item === 1 ? 7 : item - 1 }}</div>
    </div>
    <div class="course">
        <template v-for="(day, index) in table" :key="index">
            <div
                v-for="course in day"
                class="item"
                :style="`grid-area: ${course?.start} / ${index + 1}/ ${
                    course?.start + course?.count
                } / ${index + 2};`"
            >
                {{course?.name}}
            </div>
        </template>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs, computed } from 'vue'
import { RoCourse, RoCourseTable } from '@/types/course'
import { useCourseStore } from '@/store/course'

export default defineComponent({
    name: 'Table1',
    setup() {
        const courseStore = useCourseStore()
        const currentWeek = ref(1)

        let table = computed<RoCourseTable[]>(() => {
            console.log('1')

            return courseStore.getCourseTable(currentWeek.value)
        })

        const check = () => {
            console.log(table)

            currentWeek.value++
            console.log(currentWeek.value)
        }

        return {
            table,
            check
        }
    }
})
</script>
<style lang="scss" scoped>
.day {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
}

.course {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(20, 100px);
    gap: 8px;

    .item {
        background-color: pink;
    }
}
</style>
