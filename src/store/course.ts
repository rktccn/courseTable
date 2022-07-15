import { defineStore } from 'pinia'
import {
    RoCourse,
    RoCourseTimeType,
    RoCourseTable,
    courseDuractionModel
} from '../types/course'
import { klona } from 'klona'

// 颜色列表
const RoCourseColorList = [
    '#f5222d',
    '#faad14',
    '#52c41a',
    '#1890ff',
    '#2f54eb',
    '#722ed1',
    '#eb2f96'
]

export const useCourseStore = defineStore({
    id: 'course',
    state: () => {
        return {
            currentWeek: 1, // 当前周次
            currentWeekDay: new Date().getDay(), // 当前星期几
            firstWeekDate: <Date>new Date(2022, 0, 1), // 第一周上课日期
            weekInfo: <number[][][]>[], // weekInfo[周数][星期][课程key]
            courseMap: <Map<number, RoCourse>>new Map(), // courseMap[课程key]
            courseTimeList: <RoCourseTimeType[]>[], // 节次信息, [节次开始时间, 节次结束时间],午休和晚餐也算是节次,但无法被选择
            courseSection: <number[]>[4, 8, 12] // a[1]上午节数, a[2 - 1]下午节数, a[3 - 2]晚上节数
        }
    },
    actions: {
        // 插入课程
        insertCourse(courseT: RoCourse): void {
            const course = klona(courseT)

            const key = this.getCourseKey(course.courseName)
            course.key = key
            this.courseMap.set(key, course)

            course.duration.forEach(duration => {
                duration.weeks.forEach(week => {
                    const day = duration.day === 7 ? 0 : duration.day
                    const section = duration.section
                    section.forEach(item => {
                        this.weekInfo[week - 1][day][item - 1] = key
                    })
                })
            })
        },

        // 更新课程
        updateCourse(course: RoCourse) {
            const key = course.key
            this.courseMap.set(key, course)
        },

        // 删除课程
        deleteCourse(key: number) {
            const course = this.courseMap.get(key)

            course.key = key
            this.courseMap.set(key, course)

            course.duration.forEach((duration: courseDuractionModel) => {
                duration.weeks.forEach(week => {
                    const day = duration.day === 7 ? 0 : duration.day
                    const section = duration.section
                    section.forEach(item => {
                        this.weekInfo[week - 1][day][item - 1] = null
                    })
                })
            })

            this.courseMap.delete(key)
        },

        // 设置第一周开始日期
        setStartDate(date: Date) {
            this.firstWeekDate = date
        },

        // 获取周信息
        getWeek(week: number): number[][] {
            return this.weekInfo[week - 1]
        },

        // 获取日信息
        getDay(week: number, day: number): number[] {
            return this.weekInfo[week - 1][day - 1]
        },

        // 获取节次信息，返回节次开始时间和结束时间
        getSection(section: number): RoCourseTimeType {
            return this.courseTimeList[section - 1]
        },

        // 获取课程信息
        getCourse(key: number): RoCourse | undefined {
            return this.courseMap.get(key)
        },

        // 根据课程名称生成key值
        getCourseKey(courseName: string): number {
            let key = courseName.split('').reduce((prev, curr) => {
                return prev + curr.charCodeAt(0)
            }, 0)

            if (this.courseMap.has(key)) {
                // 解决课程key冲突
                key = this.getCourseKey(courseName + '_')
            }
            return key
        },

        // 将日期转换为周次和星期
        getWeekAndDay(date: Date): [number, number] {
            const week =
                Math.ceil(
                    (date.getTime() - this.firstWeekDate.getTime()) /
                        (7 * 24 * 60 * 60 * 1000)
                ) + 1
            const day = date.getDay()
            return [week, day]
        },

        // 获取课程连续上课节次
        // return [开始上课节次，连续节次]
        getCourseSection(duraction: courseDuractionModel): number[][] {
            const { section } = duraction
            let temp: number
            let ta = []
            let res: number[][] = []
            let long: number
            // 检查数字连续
            // 返回[第一个数，连续次数]
            section.forEach(v => {
                if (temp === v && !this.courseSection.includes(temp - 1)) {
                    temp++
                    long++
                    ta[1] = long
                    return
                }
                long = 1
                ta = [v, long]
                temp = v + 1

                res.push(ta)
            })
            return res
        },

        // 将每周课程信息转换为课程表结构
        getCourseTable(week: number): RoCourseTable[][] {
            const weekInfo = this.getWeek(week)
            const res: RoCourseTable[][] = [] // res[星期][节次]
            weekInfo.forEach((day: number[], index: number) => {
                res.push([])
                day = Array.from(new Set(day))

                day.forEach((key: number) => {
                    const course = this.getCourse(key) // 获取课程信息
                    if (course) {
                        const { courseName, courseTeacher, color } = course
                        const duraction: courseDuractionModel =
                            course.duration.find(
                                (v: courseDuractionModel) =>
                                    v.day === (index === 0 ? 7 : index)
                            )

                        let counts = this.getCourseSection(duraction)

                        counts.forEach(([start, long]: number[]) => {
                            res[index].push({
                                start,
                                count: long,
                                name: courseName,
                                classRoom: duraction.classroom,
                                teacher: courseTeacher,
                                color
                            })
                        })
                    }
                })
            })
            return res
        },

        // 获取当前节次可选的，与其他课程不冲突的周次
        getAbleWeek(day: number, section: number[]): number[] {
            const res: number[] = []
            this.weekInfo.forEach((week: number[][], index: number) => {
                const check = section.find(
                    (v: number) => week[day][v - 1] !== null
                )
                if (!check) {
                    res.push(index + 1)
                }
            })
            return res
        }
    },
    getters: {
        // 获取上午课程节次信息
        getMorningCourseSection(state: any): RoCourseTimeType[] {
            return state.courseTimeList.slice(0, state.courseSection[0])
        },

        // 获取下午课程节次信息
        getAfternoonCourseSection(state: any): RoCourseTimeType[] {
            return state.courseTimeList.slice(
                state.courseSection[0],
                state.courseSection[1]
            )
        },

        // 获取晚上课程节次信息
        getEveningCourseSection(state: any): RoCourseTimeType[] {
            return state.courseTimeList.slice(
                state.courseSection[1],
                state.courseSection[2]
            )
        }
    }
})
