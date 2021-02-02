import { 
  getCurrentInstance,
  reactive, 
  readonly, 
  isReactive, 
  nextTick,
  ReactiveEffect,
  watchEffect,
  watch,
  isReadonly,
  computed,
  toRaw,  
  defineComponent, 
  withDirectives, 
  resolveDirective, 
  VNode
} from 'vue'


// 使用模块化样式 无效 已经解决
import Styles from './style.module.scss';

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
 * 
 * 或者 const React = {
 *  createElement: h
 *  Fragment,
 * }
 * 
 * Vite 更新后 使用官方插件 '@vitejs/plugin-vue-jsx';
 */
// 第一种写法
const Home = defineComponent({
  name: 'Home',
  setup() {

    const filet = {
      value: 'Home',
      deep: {
        value: [1,2,3,4]
      }
    }

    const state = reactive(filet);

    const unState = readonly(state);
    
    const states = readonly({});
    const stateCopy = reactive(states);
    console.log(isReadonly(stateCopy)) // true

    const upper = computed(() => {
      console.log('computed',state.value)
      return state.value.toUpperCase();
    });
    console.log(upper)
    setTimeout(() => {
      state.value = 'abc';
      console.log(upper)
    }, 2000);
    // setTimeout(() => {
    //   state.value = 'abcd';
    //   console.log(upper)
    // }, 4000);

    const stop = watchEffect((onInvalidate) => {
      console.log('watchEffect',state.value)
    }, {
      flush: 'sync',
      onTrack: (event) => {
        console.log('onTrack',event)
      },
      onTrigger: (event) => {
        console.log('onTrigger',event)
      }
    })
    stop();

    watch(state, (count, prevCount) => {
      console.log('Object',count, prevCount)
    });
    watch([() => state.value,() =>  state.deep], (count, prevCount) => {
      console.log('Array',count, prevCount)
    });
    watch(() => state.value, (count, prevCount) => {
      console.log('Function',count, prevCount)
    });


    //>获取全局自定义指令
    const vFocus = resolveDirective("focus"); // vue 自带的指令 需要引入 import { vFor } from 'vue'

    console.log(useRoute().query)
    return () => <div>
      <p>{state.value}</p>
      {
        //>在 VNode 上添加一个自定义指令
        withDirectives(<input  type='text' value={state.value}/> as VNode,[
          [vFocus as any, true]
        ])
      }
      {
        // 正常写法
      }
      <input type="text" v-model={state.value} v-focus />
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
