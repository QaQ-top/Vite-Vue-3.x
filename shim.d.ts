// 解决 ts 文件引入vue 模块 报错的问题
declare module '*.vue' {
  import { Component } from 'vue'
  
  const component: Component
  export default component
}

declare module '*.wasm' {
  const wasm: (options?: WebAssembly.Imports) => Promise<WebAssembly.Memory>;
  export default wasm;
}

