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
                entry: 'electron-main/index.ts'
            },
            preload: {
                input: {
                    // Must be use absolute path, this is the restrict of Rollup
                    preload: path.join(__dirname, './electron-preload/index.ts')
                }
            }
            // Enables use of Node.js API in the Electron-Renderer
        }),
        createSvgIconsPlugin({
            iconDirs: [
                path.resolve(
                    process.cwd(),
                    './node_modules/qweather-icons/icons'
                ),
                path.resolve(process.cwd(), './src/assets/svg')
            ],
            symbolId: 'icon-[name]'
        })
    ],
    build: {
        emptyOutDir: false // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录
    }
})
