/// <reference path="../../../node_modules/vant/es/vue-tsx-shim.d.ts" />
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
