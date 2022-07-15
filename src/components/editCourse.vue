<template>
    <div class="px-8 py-4 bg-amber-100 shadow-lg rounded-lg">
        <div class="flex flex-col my-2">
            <span class="item text-xs opacity-70">基础信息</span>
            <input
                class="item px-2 rounded-md"
                type=" text"
                v-model="courseName"
                placeholder="课程名称"
            />
            <div class="item flex items-center justify-between">
                <span> 颜色和图标</span>
                <span
                    class="h-5 rounded bg-amber-400 aspect-square block cursor-pointer"
                ></span>
            </div>
        </div>

        <div class="flex flex-col my-2">
            <span class="item text-xs opacity-70">时间与地点</span>

            <div class="time-list">
                <div
                    class="item time-list__item flex flex-col my-1 text-sm bg-white p-2 rounded-md leading-7 cursor-pointer"
                >
                    <div class="time flex justify-between">
                        <span>1-16周，周三</span>
                        <span>3-4节</span>
                    </div>

                    <div class="location flex justify-between">
                        <span>教1-101</span>
                        <span>王老师</span>
                    </div>
                </div>
            </div>
            <button class="item outline rounded mt-2">添加时间段</button>
        </div>

        <div class="control flex justify-between mt-4 font-semibold">
            <span class="control__item px-3 py-1 rounded-md bg-slate-50"
                >取消</span
            >
            <span
                class="control__item px-3 py-1 rounded-md bg-amber-400"
                @click="addCourse"
                >添加</span
            >
        </div>
    </div>
</template>
<script lang="ts">
import { useCourseStore } from '@/store/course'
import { defineComponent, reactive, toRefs } from 'vue'
import { RoCourse, courseDuractionModel } from '@/types/course'

export default defineComponent({
    name: 'EditCourse',
    setup() {
        const courseStore = useCourseStore()

        const data = reactive({
            courseName: '',
            color: 'amber',
            icon: '',
            timeList: <courseDuractionModel[]>[]
        })

        const addTime = () => {
            let temp: courseDuractionModel = {
                weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
                section: [5,6],
                day: 1,
                classroom: '教1-101'
                // teacher: '王老师'
            }

            data.timeList.push(temp)
        }

        const addCourse = () => {
            addTime()

            let course: RoCourse = {
                key: 0,
                courseName: '语文', // 课程名称
                courseTeacher: '王老师', // 授课教师
                duration: data.timeList,
                color: 'amber' // 颜色
            }

            courseStore.insertCourse(course)

            console.log(courseStore.courseMap)
            console.log(courseStore.getCourseTable(12))
        }

        return { ...toRefs(data), addCourse }
    }
})
</script>

<style lang="scss" scoped>
.item {
    margin-bottom: 4px;
}
</style>
