import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [dts({
        insertTypesEntry: true,
        include: ["./src"],
        // rollupType: true
    })],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'SimpleMessage',
            // 将添加适当的扩展名后缀
            fileName: 'message',
        },
        rollupOptions: {
            output: {
                exports: 'named'
            }
        },
    },
})