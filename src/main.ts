import { createApp, defineComponent, h } from 'vue';
import App from '@pages/index.vue';
import '@themes/global.scss'
import Pre from '@components/api/pre.vue'
import router from '@route/index'
import store from '@models/index'

console.log(Global)



//>Vue大部分全局api都迁移到了 createApp() 生成的实例中
const app = createApp(App)

// router
app.use(router)


// vuex
app.use(store)

// 环境变量
console.log(import.meta.env)

// app.use(ElementUI)

// 全局配置
const { config } = app

// 开启 vue-devtools 开发工具
// config.devtools = true 

config.isCustomElement = tag => {
  console.log(tag)
  return ["dsa","fsa"].includes(tag.split("-")[0])
}

//>Vue.prototype 已经被 config.globalProperties 代替 实现全局配置
// Vue 2.xx
// Vue.prototype.$http = () => new Promise(function(resolve, reject) {
//   resolve('Vue 2.xx')
// });

// Vue 3.xx
config.globalProperties.$http = () => new Promise(function(resolve, reject) {
  resolve('Vue 3.xx')
});


//>自定义选项定义合并策略


/**
 * optionMergeStrategies 可以Vue实例 mixin 混入的某个 属性进行拦截
 *@param parent {} 
 *@param child {} 原来 mixin 混入的属性值
 *@param vm {} 该属性的实例
 *@returns any 返回任意值 作为属性最终值
 * 读取时执行函数 缓存返回的值 下次读取直接拿缓存值
 */
config.optionMergeStrategies = {
  msg: (parent, child, vm) => {
    console.log(parent, child, vm)
    return `Hollo ${child}`
  },
  sex: (parent, child:any, vm) => (child > 18) ? 18 : child,
}
app.mixin({
  msg:'Vue 3.xx',
  sex: 36
})
// msg 可以在 app 组件 setup()返回的函数里面调用 this.$options.msg && app的template模板内无法访问到 msg

//>性能/时间轴面板中编译、呈现和修补性能跟踪
config.performance = true




//>其他 api
const {
  version,        // Vue 版本
  use,            // 配置 Vue 插件
  component,      // 注册全局 组件
  directive,      // 注册全局 指令
  mixin,          // 混入
  provide,        // 插件开发
  mount,          // 导入 vue 模块 到真实节点
  unmount,        // 从真实节点卸载 vue 模块
} = app


//>注册全局 组件
app.component('PreCode',Pre)



//>注册全局 指令
app.directive('focus', {
  // 指令有一组生命周期钩子:
  beforeMount() {
    // 加载前
  },
  mounted(el, binding, vnode, prevVNode) {
    // 加载后 el 为 绑定指令的 dom 元素
    if(binding.value) {
      el.focus()
    }
    // console.log(el)
  },
  beforeUpdate() {
    // VNode 更新前
  },
  updated() {
    // VNode 更新后
  },
  beforeUnmount() {
    // 卸载前
  },
  unmounted() {
    // 卸载后
  }
})

//>从真实节点卸载 vue 模块
setTimeout(() => {
  // app.unmount('#root')
}, 1000)



//!挂载 dom 的时候 Vue 回去编译 template
//!确保 全局属性方法都 添加 完后再挂载 dom
app.mount('#root')
