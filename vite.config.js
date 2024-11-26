import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SimpleMessage',
      // 将添加适当的扩展名后缀
      fileName: 'simple-message',
    },
    rollupOptions: {
        output: {
            exports: 'named'
        }
    },
  },
})