import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
import vitePluginImp from 'vite-plugin-imp';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
    vue(),
       vitePluginImp({
        libList: [
          {
            libName: 'vant',
            style(name) {
              return `vant/es/${name}/style`;
            }
          }
        ]
      })
  ],
})
