// 课程类型
export type RoCourse = {
    key: number
    courseName: string // 课程名称
    courseId: number // 课程id
    courseTeacher: string // 授课教师
    weeks: number[] // 上课周次
    duration: {
        // 第几节上课
        day: number // 星期几
        section: number[] // 第几节
        classroom: string // 教室
    }[]
    color: string // 颜色
}

// 节次类型，每节课的时间
export type RoCourseTimeType = {
    // 开始时间
    start: Date
    // 结束时间
    end: Date
}

// 课表类型
export type RoCourseTable = {
    count: number
    start: number
    name?: string
    classRoom?: string
    teacher?: string
    color?: string
}
