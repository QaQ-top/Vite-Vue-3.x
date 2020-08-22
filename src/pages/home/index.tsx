import { reactive, defineComponent } from 'vue'

// 使用模块化样式 无效 目前我还未解决
import Styles from './style.scss'


import { useRoute } from 'vue-router'


// Vue 3 JSX 的 API 设计
/**
 * defineComponent Vue TSX or JSX 的核心方法
 * 
 * npm install @hcysunyang/babel-plugin-vue-next-jsx -D
 * yarn add @hcysunyang/babel-plugin-vue-next-jsx -D
 *!如果 不安装 vue-next-jsx 是无法在 TSX、JSX 使用 vue 指令的
 *!https://github.com/HcySunYang/vue-next-jsx
 */
// 第一种写法
const Home = defineComponent({
  name: 'Home',
  setup() {
    const state = reactive({
      value: 'Home'
    })

    console.log(useRoute().query)
    return () => <>
      <p>{state.value}</p>
      <input type='text' value={state.value}/>
      <button
        className={Styles.button}
        onClick={()=>{
          state.value = 'Home !!!!!!!!!!'
        }}
      >
        点击
      </button>
    </>
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
