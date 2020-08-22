<template>
  <div>
    <img alt="Vue logo" :src="logo" />
    <hr style="width:50%;"/>
    
    <div class="template">
      <div>
        reactive:
        数据响应
        {{rely}}
      </div>
      <div>
        父组件: <input type="text" disabled :value="introduction.value">
        <br />
        父组件: <input type="text" v-model="introduction.value">
        <Reactive :introduction='introduction' />
      </div>
    </div>
    <hr style="width:50%;"/>


    <div class="template">
      <div>
        provide:
        依赖注入
      </div>
      <div>
        <Inject />
      </div>
    </div>
    
    <!-- 如果传递的是 introduction.value 不会发生响应 因为 子组件接收到的是 值 -->
    I am ref {{ count }}
    <button @click="setCount" ref="btn" > setCount </button>
    <router-link to="/home">
      home
    </router-link>
    <router-link to="/mine">
      mine
    </router-link>

    <router-view class="view"/>
  </div>
</template>

<script lang='ts'>
import Reactive from './components/reactive.vue'
import Inject from './components/inject.vue'
// 方法
import { ref, reactive, computed, watch, watchEffect} from 'vue'
// 接口
import { SetupContext, Ref } from 'vue'

import logo from './assets/logo.png'

import Home from './pages/home'

export default {
  name: 'App',
  data() {
    return {
      setCount() {
        console.log('add')
      }
    }
  },
//>———————————————————————————————————————————  SetUp  ————————————————————————————————————————————————————
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
     *  >ref
     * 模板使用变量
     */
    const count: Ref<number> = ref(0)
    // 获取模板 真实节点
    const btn = ref(null)

    /**
     * >reactive
     * 创建响应式 对象 子组件更改 父亲组件 也会更改
     * 不使用 reactive 创建的对象 对于 子组件来说 是单向的 子组件无法更改
     */
    const introduction = reactive({
      value: 'Hello Vue 3.0 + Vite'
    })

    /**
     * >computed
     * 还是 原来的 味道 计算属性
     */
    let rely = computed(()=>{
      return introduction.value.length
    })

    /**
     * >watchEffect
     * 默认 执行一次
     * callback 内使用了 ref reactive 注册的 引用类型的某个值 数据发送变化  callback 重新执行一次
     */
    watchEffect(()=>{
      // console.log(introduction.value.length)
    })
    /**
     * >watch
     * 第一个 函数 需要 return 出监听的数据
     * 才会触发 第二个 函数
     */
    watch(() => introduction.value.length,(now, before) => {
        console.log('现在:'+now, '以前:'+before)
    })

    /**
     * >生命钩子
     * beforeCreate     -> 使用 setup()
     * created          -> 使用 setup()
     * beforeMount      -> onBeforeMount
     * mounted          -> onMounted
     * beforeUpdate     -> onBeforeUpdate
     * updated          -> onUpdated
     * beforeUnmount    -> onBeforeUnmount
     * unmounted        -> onUnmounted
     * errorCaptured    -> onErrorCaptured
     * renderTracked    -> onRenderTracked
     * renderTriggered  -> onRenderTriggered
     */

    //>return一个对象 供template使用
    return {
      logo,
      count,
      btn,
      introduction,
      rely,
      setCount() {
        count.value++
      },
    }
  },
//>——————————————————————————————————————————————  END  ———————————————————————————————————————————————————

  //>—— provide ——
  /**
   * 允许一个祖先组件作为其所有后代的依赖注入器
   * 无论组件层次结构有多深
   * 只要它们位于同一父链中就可以
   */ 
  provide: {
    passed: 'I am provide!',
    response: {
      value: 'provide / inject',
    }
  },

  components: {
    Reactive,
    Inject,
    Home
  }
}
</script>


<style lang='scss' scoped>
/**
 *> npm install sass -D
 *> 直接安装 sass 就可以使用了
 * 注意 scoped 属性私有化情况下
 * :global(<选择器>) {
 *   width: 100px;
 * }
 * 可以对样式全局化
 * 没有 scoped :global是不起作用的
 */
$width: auto;
// button {
//   width: $width;
// }
.template {
  display: flex;
  width: 50vw;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  > div {
    width: 100%;
  }
  > div:nth-child(1) {
    text-align: left;
    font-size: 20px;
    font-weight: bold;
  }
}
.view {
  width: 100vw;
  padding: 1%;
  text-align: left;
}

</style>
