import { defineStore } from 'pinia'
import {
    RoCourse,
    RoCourseTimeType,
    RoCourseTable,
    RoCourseDay,
    courseDuractionModel
} from '../types/course'
import { klona } from 'klona'

export const useCourseStore = defineStore({
    id: 'course',
    state: () => {
        return {
            totalWeeks: 16,
            currentWeek: 1, // 当前周次
            currentWeekDay: new Date().getDay(), // 当前星期几
            firstWeekDate: <string>'', // 第一周上课日期
            weekInfo: <number[][][]>[], // weekInfo[周数][星期][课程key]
            courseMap: <Map<number, RoCourse>>new Map(), // courseMap[课程key]
            _courseMapStore: '', // 用于对课程信息进行储存
            courseTimeList: <RoCourseTimeType[]>[], // 节次信息, [节次开始时间, 节次结束时间],午休和晚餐也算是节次,但无法被选择
            courseSection: <[number, number, number]>[4, 4, 0] // a[1]上午节数, a[2]下午节数, a[3]晚上节数
        }
    },
    actions: {
        initCourse() {
            let totalSections =
                this.courseSection[0] +
                this.courseSection[1] +
                this.courseSection[2]
            // 初始化节次信息
            if (this.courseTimeList.length === 0) {
                let flag = 8

                for (let i = 0; i < totalSections; i++) {
                    let start = flag < 10 ? `0${flag}` : flag
                    flag++
                    let end = flag < 10 ? `0${flag}` : flag

                    this.courseTimeList.push({
                        start: `${start}:00`,
                        end: `${end}:00`
                    })
                }
            }

            if (this.weekInfo.length === 0) {
                for (let i = 0; i < this.totalWeeks; i++) {
                    // 增加周数组
                    this.weekInfo.push([])
                    for (let j = 0; j < 7; j++) {
                        // 增加日数组
                        this.weekInfo[i].push([])
                        for (let k = 0; k < 20; k++) {
                            // 增加课程key
                            this.weekInfo[i][j].push(null)
                        }
                    }
                }
            }

            if (this.firstWeekDate === '') {
                let date: string[] = new Date().toLocaleDateString().split('/')

                date[1] = +date[1] < 10 ? '0' + date[1] : date[1]
                date[2] = +date[2] < 10 ? '0' + date[2] : date[2]
                this.firstWeekDate = date.join('-')
            }

            if (this._courseMapStore !== '') {
                this.courseMap = new Map(JSON.parse(this._courseMapStore))
            }
        },

        // 插入课程
        insertCourse(courseT: RoCourse): void {
            const course = klona(courseT)

            const key = this.getCourseKey(course.courseName)
            course.key = key
            this.courseMap.set(key, course)
            console.log(this.courseMap)

            this._courseMapStore = JSON.stringify(
                Array.from(this.courseMap.entries())
            )

            course.duration.forEach(duration => {
                duration.weeks.forEach(week => {
                    const day = duration.day
                    const section = duration.section
                    section.forEach(item => {
                        this.weekInfo[week - 1][day][item - 1] = key
                    })
                })
            })
        },

        // 更新课程
        updateCourse(courseT: RoCourse) {
            const key = courseT.key
            this.deleteCourse(key)
            this.insertCourse(courseT)
        },

        // 删除课程
        deleteCourse(key: number) {
            const course = this.courseMap.get(key)
            this.courseMap.delete(key)

            course.duration.forEach((duration: courseDuractionModel) => {
                duration.weeks.forEach(week => {
                    const day = duration.day
                    const section = duration.section
                    section.forEach(item => {
                        this.weekInfo[week - 1][day][item - 1] = null
                    })
                })
            })
        },

        // 设置总周数量
        setTotalWeeks(totalWeeks: number) {
            let curWeeks = this.totalWeeks
            let diff = totalWeeks - curWeeks
            let totalSections =
                this.courseSection[0] +
                this.courseSection[1] +
                this.courseSection[2]
            if (diff > 0) {
                for (let i = 0; i < diff; i++) {
                    this.weekInfo.push([])
                    for (let j = 0; j < 7; j++) {
                        this.weekInfo[curWeeks + i].push([])
                        for (let k = 0; k < totalSections; k++) {
                            this.weekInfo[curWeeks + i][j].push(null)
                        }
                    }
                }
            } else {
                for (let i = 0; i < -diff; i++) {
                    this.weekInfo.pop()
                }
            }

            this.totalWeeks = totalWeeks
        },

        // 设置第一周开始日期
        setStartDate(date: string) {
            this.firstWeekDate = klona(date)
        },

        // 将日期转换为周次和星期
        getWeekAndDay(date: Date): [number, number] {
            const week =
                Math.floor(
                    (date.getTime() -
                        new Date(this.firstWeekDate).getTime() +
                        new Date(this.firstWeekDate).getDay() *
                            24 *
                            60 *
                            60 *
                            1000) /
                        (7 * 24 * 60 * 60 * 1000)
                ) + 1

            const day = date.getDay()
            return [week, day]
        },

        // 根据周次获取日期,返回本周的日期和月份
        getDateByWeek(week: number) {
            const date = new Date(this.firstWeekDate)

            date.setDate(date.getDate() + (week - 1) * 7 - date.getDay())
            let dateList = []
            for (let i = 0; i < 7; i++) {
                dateList.push(
                    new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate()
                )
            }

            return {
                dateList,
                month: date.getMonth() + 1
            }
        },

        // 获取周信息
        getWeek(week: number): number[][] {
            return this.weekInfo[week - 1]
        },

        // 获取日信息
        getDay(week: number, day: number): number[] {
            return this.weekInfo[week - 1][day]
        },

        // 获取每周有课的日期
        getDaysHasCourse(week: number) {
            let days = []
            for (let i = 0; i < 7; i++) {
                if (
                    this.weekInfo[week - 1][i].some(
                        (item: number | null) => item !== null
                    )
                ) {
                    days.push(true)
                } else {
                    days.push(false)
                }
            }
            return days
        },

        // 设置节次
        setCourseSection(section: [number, number, number]) {
            let mSections = this.courseSection[0]
            let aSections = this.courseSection[1]
            let eSections = this.courseSection[2]

            if (mSections > section[0]) {
                this.courseTimeList.splice(section[0], mSections - section[0])
            } else if (mSections < section[0]) {
                let time = this.courseTimeList[mSections - 1].end
                for (let i = 0; i < section[0] - mSections; i++) {
                    this.courseTimeList.splice(mSections, 0, {
                        start: time,
                        end: time
                    })
                }
            }

            if (aSections > section[1]) {
                this.courseTimeList.splice(
                    section[0] + section[1],
                    aSections - section[1]
                )
            } else if (aSections < section[1]) {
                let time = this.courseTimeList[mSections + aSections - 1].end
                for (let i = 0; i < section[1] - aSections; i++) {
                    this.courseTimeList.splice(section[0] + section[1], 0, {
                        start: time,
                        end: time
                    })
                }
            }

            if (eSections > section[2]) {
                this.courseTimeList.splice(
                    section[0] + section[1] + section[2],
                    eSections - section[2]
                )
            } else if (eSections < section[2]) {
                let time =
                    this.courseTimeList[mSections + aSections + eSections - 1]
                        .end
                for (let i = 0; i < section[2] - eSections; i++) {
                    this.courseTimeList.splice(
                        section[0] + section[1] + section[2],
                        0,
                        { start: time, end: time }
                    )
                }
            }

            this.courseSection = klona(section)
        },

        // 获取节次信息，返回节次开始时间和结束时间
        getSection(section: number): RoCourseTimeType {
            return this.courseTimeList[section - 1]
        },

        // 设置节次信息
        setSection(section: number, time: RoCourseTimeType) {
            this.courseTimeList[section - 1] = time
        },

        // 获取课程信息
        getCourse(key: number): RoCourse | undefined {
            return this.courseMap.get(key)
        },

        // 根据课程名称生成key值
        getCourseKey(courseName: string): string {
            let key = courseName.split('').reduce((prev, curr) => {
                return prev + curr.charCodeAt(0)
            }, 0)

            if (this.courseMap.has(key)) {
                // 解决课程key冲突
                key = this.getCourseKey(courseName + '_')
            }
            return `${key}`
        },

        // 获取课程连续上课节次
        // return [开始上课节次，连续节次]
        getCourseSection(
            duraction: courseDuractionModel[]
        ): (number | string)[][] {
            let res: (number | string)[][] = []
            let c = this.courseSection
            let breakSection = [c[0], c[0] + c[1], c[0] + c[1] + c[2]]

            duraction.forEach(val => {
                const { section, classroom } = val
                let temp: number
                let ta = []
                let long: number
                // 检查数字连续
                // 返回[第一个数，连续次数]
                section.forEach(v => {
                    if (temp === v && !breakSection.includes(temp - 1)) {
                        temp++
                        long++
                        ta[1] = long
                        return
                    }
                    long = 1
                    ta = [v, long, classroom]
                    temp = v + 1

                    res.push(ta)
                })
            })
            return res
        },

        // 获取课程开始和结束时间
        getCourseTime(duraction: courseDuractionModel[]): string[][] {
            let res: string[][] = []
            let c = this.courseSection
            let breakSection = [c[0], c[0] + c[1], c[0] + c[1] + c[2]]

            duraction.forEach(val => {
                const { section, classroom } = val
                let temp: number
                let ta = []

                let long: number
                // 检查数字连续
                // 返回[第一个数，连续次数]
                section.forEach(v => {
                    if (temp === v && !breakSection.includes(temp - 1)) {
                        temp++
                        long++
                        ta[1] = this.getSection(v).end
                        return
                    }
                    long = 1
                    ta = [
                        this.getSection(v).start,
                        this.getSection(v).end,
                        classroom
                    ]
                    temp = v + 1

                    res.push(ta)
                })
            })

            return res
        },

        // 将每周课程信息转换为课程表结构
        getCourseTable(week: number): RoCourseTable[][] {
            const weekInfo = this.getWeek(week)
            const res: RoCourseTable[][] = [] // res[星期][节次]
            weekInfo.forEach((day: string[], index: number) => {
                res.push([])
                day = Array.from(new Set(day))

                day.forEach((key: string) => {
                    const course = this.getCourse(key) // 获取课程信息
                    if (course) {
                        const { courseName, courseTeacher, color } = course
                        const duraction: courseDuractionModel[] =
                            course.duration.filter(
                                (v: courseDuractionModel) =>
                                    v.day === index && v.weeks.includes(week)
                            )

                        let counts = this.getCourseSection(duraction)

                        counts.forEach(
                            ([start, long, classroom]: [
                                number,
                                number,
                                string
                            ]) => {
                                res[index].push({
                                    key,
                                    start,
                                    count: long,
                                    name: courseName,
                                    classroom,
                                    teacher: courseTeacher,
                                    color
                                })
                            }
                        )
                    }
                })
            })
            return res
        },

        // 获取某日的课程信息
        getDayCourse(val: Date) {
            let res: RoCourseDay[] = []
            let date = this.getWeekAndDay(val)

            if (date[0] < 1) return

            let courseList: (number | null)[] = Array.from(
                new Set(this.getDay(date[0], date[1]))
            )

            courseList.forEach((key: number | null) => {
                if (key) {
                    const course = this.getCourse(key) // 获取课程信息
                    if (course) {
                        const { courseName, courseTeacher, color } = course
                        const duraction: courseDuractionModel[] =
                            course.duration.filter(
                                (v: courseDuractionModel) =>
                                    v.day === date[1] &&
                                    v.weeks.includes(date[0])
                            )

                        let time = this.getCourseTime(duraction)
                        time.forEach(([start, end, classroom]: string[]) => {
                            res.push({
                                key,
                                start,
                                end,
                                name: courseName,
                                classroom,
                                teacher: courseTeacher,
                                color
                            })
                        })
                    }
                }
            })

            // 根据开始时间排序
            res.sort((a, b) => {
                return a.start.localeCompare(b.start)
            })

            return res
        },

        // 获取当前节次可选的，与其他课程不冲突的周次
        getAbleWeek(
            day: number,
            section: number[],
            availableTime?: courseDuractionModel[]
        ): number[] {
            const res: number[] = []

            let totalSections =
                this.courseSection[0] +
                this.courseSection[1] +
                this.courseSection[2]
            if (section[section.length - 1] > totalSections) {
                return res
            }

            this.weekInfo.forEach((week: number[][], index: number) => {
                const check = section.find((v: number) => {
                    let res = availableTime?.find(item => {
                        // 返回true代表在忽略的时间段内

                        const {
                            weeks: aWeeks,
                            day: aDay,
                            section: aSection
                        } = item
                        return (
                            aWeeks.includes(index + 1) &&
                            aDay === day &&
                            aSection!.includes(v)
                        )
                    })

                    return week[day][v - 1] !== null && !res
                })

                if (!check) {
                    res.push(index + 1)
                }
            })

            return res
        }
    },
    getters: {
        getMaxSection(state: any) {
            return (
                state.courseSection[0] +
                state.courseSection[1] +
                state.courseSection[2]
            )
        },

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
        },

        _getCourseSection(state: any) {
            return state.courseSection
        },

        _getTotalWeeks(state: any) {
            return state.totalWeeks
        }
    },
    persist: {
        storage: localStorage,
        paths: [
            'totalWeeks',
            'currentWeek',
            'currentWeekDay',
            'firstWeekDate',
            'weekInfo',
            '_courseMapStore',
            'courseTimeList',
            'courseSection'
        ]
    }
})
