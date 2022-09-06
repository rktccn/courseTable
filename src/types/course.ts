export interface courseDuractionModel {
    weeks: number[] // 上课周次
    day: number // 星期几
    section: number[] // 第几节
    classroom: string // 教室
    teacher: string
}

// 课程类型
export type RoCourse = {
    key: string
    courseName: string // 课程名称
    courseId?: number // 课程id
    courseTeacher?: string // 授课教师
    duration: courseDuractionModel[]
    color: string // 颜色
}

// 节次类型，每节课的时间
export type RoCourseTimeType = {
    // 开始时间
    start: string | null
    // 结束时间
    end: string | null
}

// 课表类型
export type RoCourseTable = {
    key: string
    count: number
    start: number
    name: string
    classroom?: string
    teacher?: string
    color?: string
}

// 单日类型
export type RoCourseDay = {
    key: number
    start: string
    end: string
    name: string
    classroom?: string
    teacher?: string
    color?: string
}

// 主题颜色
export enum themeKey {
    light = 'light',
    dark = 'dark',
    solar = 'solar',
    evergreen = 'evergreen',
    lightgreen = 'lightgreen',
    zinc = 'zinc'
}

// 课程颜色
export enum courseColorKey {
    red = 'red',
    orange = 'orange',
    yellow = 'yellow',
    green = 'green',
    teal = 'teal',
    sky = 'sky',
    indigo = 'indigo',
    purple = 'purple',
    pink = 'pink'
}

// 通知队列
export type RoMessageList = {
    key: number
    title: string
    body: string
    date: Date
}
