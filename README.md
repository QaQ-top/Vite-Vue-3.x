### Vue 3.x



​	**通过 `vite` 搭建的 `vue 3.x` 项目**

​	**根据 `ts` 构建脚本模块**

​    **使用 `sass` 对`css` 进行预编译**

​    **vue：`createApp` `ref` `reactive` `readonly` `watchEffect` `computed`**

​    **vue-router: `useLink`  `useRoute` `useRouter` `parseQuery` `stringifyQuery`**

​    **vuex: `useStore`**

  



文件目录：

```javascript
--public
   favicon.ico
--src
   --components
   --pages
   --route
   --store
   App.vue
   global.scss
   main.ts
index.html
package.jsom
shim.d.ts
tsconfig.json
vite.config.js
```



#### 全局配置（src/main.ts）

通过 `createApp` 挂载 `App.vue`

```javascript
import { createApp } from 'vue'
import router from './route'
import store from './store'

const app = createApp(App)
// router
app.use(router)
// vuex
app.use(store)

/**
* 中间部分省略....
* 具体 API 请看源码...
* 有详细注释...
*/

app.mount('#root')
```



####  Composition API

```javascript
/**
   *@function setup 
   *?函数是一个新的组件选项。作为在组件内使用 Composition API 的入口点。之前的data、声明周期、自定义函数都放置在内；   
   *!@this void 方法没有 this
   *@param props {Object} 父组件传递的数据 
   *@param context {SetupContext<Record<string, any>>} 提供 attrs emit slots 核心方法 
   *@returns { [key:string]:any } 返回一个对象 供 template 使用数据 方法
   */
  setup(props, context: SetupContext) {
      /**
      * 中间部分省略....
      * 位于 src/App.ts
      */
  }
```



#### Router and  Vuex Api

```javascript
// Vue
import { ... } from 'vue'

// Vue-Router
import { ... } from 'vue-router'

/**
* 省略....
* 具体 API 请看源码...
* 有详细注释...
* 位于 src/pages/mine/index.vue
*/
```







#### Vue-Router

```javascript
import { createRouter, createWebHistory} from 'vue-router'

export default createRouter({
    /**
    * 中间部分省略....
    * 具体 API 请看源码...
    * 有详细注释...
    * 位于 src/route/index.ts
    */
}); 
```





#### Vuex

```javascript
import { createStore, createLogger,  } from 'vuex'
export default createStore({
    /**
    * 中间部分省略....
    * 具体 API 请看源码...
    * 有详细注释...
    * 位于 src/store/index.ts
    */
});  
```

