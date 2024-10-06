import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
// import {visualizer} from 'rollup-plugin-visualizer';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['vue', 'vue-router', 'vuex'], // 将常用的库单独打包成 vendor.js
                     echarts: ['echarts', 'vue-echarts'], // 将 echarts 和 vue-echarts 单独打包到 echarts.js
                     exceljs: ['exceljs'],                  // 将 exceljs 单独打包
                     xlsx: ['xlsx'],                        // 将 xlsx 单独打包
                     naiveui: ['naive-ui'],                  // 将 Naive UI 单独打包
                     axios: ['axios'],                            // axios 单独打包
                     fileSaver: ['file-saver'],                   // file-saver 单独打包
                     icons: ['@vicons/ionicons5'],                // 图标库单独打包
                }
            },
        }
    },
    server: {
        host: '0.0.0.0'  // 允许局域网访问
    },
    plugins: [
        vue(),
        AutoImport({
            imports: [
                'vue',
                {
                    'naive-ui': [
                        'useDialog',
                        'useMessage',
                        'useNotification',
                        'useLoadingBar'
                    ]
                }
            ]
        }),
        Components({
            resolvers: [NaiveUiResolver()]
        }),
        // visualizer({
        //     open: true, // 打包完成后自动打开报告页面
        // })
        ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),  // 使用 path.resolve 更常见
            "#": path.resolve(__dirname, "types")
        }
    },


})
