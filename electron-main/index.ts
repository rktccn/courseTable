// electron-main/index.ts
import { app, BrowserWindow } from 'electron'
import path from 'path'

const createWindow = () => {
    const win = new BrowserWindow({
        width: 775,
        height: 620,
        useContentSize: true,

        webPreferences: {
            contextIsolation: false, // 是否开启隔离上下文
            nodeIntegration: true, // 渲染进程使用Node API
            preload: path.join(__dirname, '../electron/preload.js') // 需要引用js文件
        }
    })

    win.setMinimumSize(775, 550)

    // 如果打包了，渲染index.html
    if (app.isPackaged) {
        win.loadFile(path.join(__dirname, '../index.html'))
    } else {
        let url = 'http://localhost:3000' // 本地启动的vue项目路径
        win.loadURL(url)
    }
}

app.whenReady().then(() => {
    createWindow() // 创建窗口
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// 关闭窗口
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
