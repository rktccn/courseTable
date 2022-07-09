<template>
    <div>
        <input type="text" v-model="courseTitle" />
        <br />
        <button @click="submit">{{ courseTitle }}</button>
        <button @click="getTable">获取数据</button>
        <button @click="getAbleWeek">获取可用节次</button>

        <br />
        <input type="date" v-model="startDate" />
        <button @click="submitStart" class="shadow-lg">提交开始日期</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { RoCourse } from '@/types/course'
import { useCourseStore } from '@/store/course'

export default defineComponent({
    name: 'VueUse',
    setup() {
        const courseStore = useCourseStore()
        const course: RoCourse = {
            key: 0,
            courseName: '',
            courseId: 0,
            courseTeacher: '张，王',
            weeks: [1, 2, 3, 4, 10, 11, 14, 15],
            color: '#ff0000',
            duration: [{ day: 3, section: [2, 4], classroom: 'C101' }]
        }
        const courseTitle = ref('')
        const startDate = ref('')

        const submit = () => {
            course.courseName = courseTitle.value
            courseStore.insertCourse(course)
        }

        const getTable = () => {
            let res = courseStore.getCourseTable(2)

            console.log(res)
        }

        const getAbleWeek = () => {
            let res = courseStore.getAbleWeek(3, [1, 2])

            console.log(res)
        }

        const submitStart = () => {
            let date = new Date(startDate.value)
            console.log(date)
            courseStore.setStartDate(date)
            let [week, day] = courseStore.getWeekAndDay(new Date())
            console.log(`week:${week} day:${day}`)
        }

        return {
            courseTitle,
            startDate,
            submit,
            getTable,
            getAbleWeek,
            submitStart
        }
    }
})
</script>

<style lang="scss" scoped>
h1 {
    color: red;
}
</style>
