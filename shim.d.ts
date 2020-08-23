// 解决 ts 文件引入vue 模块 报错的问题

declare module '*.vue' {
  import { Component } from 'vue'
  
  const component: Component
  export default component
}


declare module '*.scss' 
declare module '*.sass' 
declare module '*.svg' 
declare module '*.png' 
declare module '*.jpg'


/**
 *> to be completed
 * vue 一 api 一个模块
 */
