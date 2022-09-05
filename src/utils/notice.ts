import { useWebNotification } from '@vueuse/core'
import { RoMessageList } from '@/types/course'
import { useAppStore } from '@/store/app'

// import schedule from 'node-schedule'

function setList() {
    let messageList: RoMessageList[] = useAppStore().getMessageList
    // schedule.gracefulShutdown()
    if (messageList.length > 0) {
        notice(messageList)
    }
}

function notice(list: RoMessageList[]) {
    const now = new Date()
    const next = list.find(date => date.date > now)

    // if (next) {
    //     console.log(next)

    //     schedule.scheduleJob(next.date, () => {
    //         showNotice(next.title, next.body)

    //         list = list.filter(date => date !== next)
    //         if (list.length > 0) {
    //             notice(list)
    //         }
    //     })
    // }
}

function showNotice(title: string, body: string) {
    const {
        isSupported,
        notification,
        show,
        close,
        onClick,
        onShow,
        onError,
        onClose
    } = useWebNotification({
        title,
        body,
        dir: 'auto',
        lang: 'en',
        renotify: true,
        tag: 'test'
    })

    if (isSupported) {
        show()
    }
}

export default setList
