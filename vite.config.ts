import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

import electron from 'vite-plugin-electron'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        //设置别名
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    plugins: [
        vue(),
        electron({
            main: {
                entry: 'electron/main.ts'
            },
            preload: {
                input: {
                    // Must be use absolute path, this is the restrict of Rollup
                    preload: path.join(__dirname, 'electron/preload.ts')
                }
            },
            // Enables use of Node.js API in the Electron-Renderer
            renderer: {}
        }),
        createSvgIconsPlugin({
            iconDirs: [
                path.resolve(
                    process.cwd(),
                    './node_modules/qweather-icons/icons'
                ),
                path.resolve(
                    process.cwd(),
                    './src/assets/svg'
                )
            ],
            symbolId: 'icon-[name]'
        })
    ]
})
