import { reactive, defineComponent, withDirectives, resolveDirective, h, Fragment, VNode} from 'vue'

// 使用模块化样式 无效 目前我还未解决
import Styles from './style.scss'


import { useRoute } from 'vue-router'

// Vue 3 JSX 的 API 设计
/**
 * defineComponent Vue TSX or JSX 的核心方法
 * vite.config.ts 配置 :
 * module.exports = {
 *    jsx: {
 *      factory: "h",
 *      fragment: "Fragment",
 *    }
 * }
 * 或者运行 vite 时添加配置 --jsx-factory=h --jsx-fragment=Fragment
 *! 一定要 import { h, Fragment} from 'vue'; 引入这两个对象;
 */
// 第一种写法
const Home = defineComponent({
  name: 'Home',
  setup() {
    const state = reactive({
      value: 'Home'
    })

    //>获取全局自定义指令
    const vFocus = resolveDirective("focus"); // vue 自带的指令 需要引入 import { vFor } from 'vue'

    console.log(useRoute().query)
    return () => <div>
      <p>{state.value}</p>
      {
        //>在 VNode 上添加一个自定义指令
        withDirectives(<input  type='text' value={state.value}/> as VNode,[
          [vFocus as any]
        ])
      }
      <button
        class={Styles.button}
        onClick={()=>{
          state.value = 'Home !!!!!!!!!!'
        }}
      >
        点击
      </button>
    </div>
  },
})

// 第二种写法
/**
 * 这个 参数相当于 setup
 * 推荐 第一种写法
 */
// const Home: FunctionalComponent = defineComponent(() => {
//   const state = reactive({
//     value: 'Home'
//   })
//   return <>
//     <p>{state.value}</p>
//     <input type='text' value={state.value} />
//     <button
//       className={Styles.button}
//       onClick={() => {
//         state.value = 'Home !!!!!!!!!!'
//       }}
//     >
//       点击
//   </button>
//   </>
// })

export default Home
