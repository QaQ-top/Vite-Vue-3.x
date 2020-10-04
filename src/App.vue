<template>
  <div class="vue">
    <div>
      <h1 class="title">INTERSTELLAR</h1>
      <h2 class="title">VITE VUE</h2>
      <h3 class="title">学习系列</h3>
    </div>
    <div>
      <!-- // https://img.zcool.cn/community/0115ba59e06280a80121ae0ce53c89.jpg@2o.jpg -->
      <p class="item"></p>
      <div></div>
    </div>
    <div>
      <div>
        <p>
          <i>&#xe70e;</i>
        </p>
        <p>
          <i>&#xe70e;</i>
        </p>
        <p>
          <i>&#xe70e;</i>
        </p>
      </div>
      <div>
        <i>&#xe620;</i>
        <i>&#xe60b;</i>
        <i>&#xe667;</i>
        <i>&#xe666;</i>
        <i>&#xe668;</i>
        <i>&#xe870;</i>
        <i>&#xe876;</i>
      </div>
    </div>
  </div>
  
  <Tabs />

  <!-- 如果传递的是 introduction.value 不会发生响应 因为 子组件接收到的是 值 -->
  I am ref {{ count }}
  <button @click="setCount" ref="btn">setCount</button>
  <router-link to="/home">home</router-link>
  <router-link to="/mine">mine</router-link>

  <router-view class="view" />

</template>

<script lang='ts'>
// import Inject from "./components/api/inject.vue";
// 方法
import { ref, reactive, computed, watch, watchEffect } from "vue";
// 接口
import { SetupContext, Ref } from "vue";

import logo from "./assets/logo.png";

// import Home from './pages/home'

import Tabs from "./components/tabs.vue";

export default {
  name: "App",
  data() {
    return {
    };
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
  setup(props: any, context: SetupContext) {
    /**
     *  >ref
     * 模板使用变量
     */
    const count: Ref<number> = ref(0);
    // 获取模板 真实节点
    const btn = ref(null);
    /**
     * >watchEffect
     * 默认 执行一次
     * callback 内使用了 ref reactive 注册的 引用类型的某个值 数据发送变化  callback 重新执行一次
     */
    watchEffect(() => {
      // console.log(introduction.value.length)
    });
    /**
     * >watch
     * 第一个 函数 需要 return 出监听的数据
     * 才会触发 第二个 函数
     */
    // watch(() => introduction.value.length,(now, before) => {
    //     console.log('现在:'+now, '以前:'+before)
    // })

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
      setCount() {
        count.value++;
      },
    };
  },
  //>——————————————————————————————————————————————  END  ———————————————————————————————————————————————————

  //>—— provide ——
  /**
   * 允许一个祖先组件作为其所有后代的依赖注入器
   * 无论组件层次结构有多深
   * 只要它们位于同一父链中就可以
   */

  provide: {
    passed: "I am provide!",
    response: {
      value: "provide / inject",
    },
  },

  components: {
    // Inject,
    Tabs,
  },
  mounted() {
    console.log("mixinmixinmixin", this.$options?.msg,this.$options?.sex, this.$options)

  }
};
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

.vue {
  width: 100%;
  height: 500px;
  padding: 50px;
  background-image: linear-gradient(to right bottom, #2e8b57, #41b883);
  display: grid;
  grid-template-columns: 85% 15%;
  grid-template-rows: 65% 35%;
  > div {
    &:nth-last-child(1) {
      grid-column-start: 1;
      grid-column-end: 3;
      display: flex;
      > div:nth-child(1) {
        flex: 1;
        display: flex;
        flex-direction: column;
        p {
          flex: 1;
          text-align: left;
          font-size: 20px;
          > i {
            font-size: 16px;
            font-weight: bold;
          }
        }
      }
      > div:nth-child(2) {
        flex: 2;
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
        font-size: 25px;
        margin-bottom: 25px;
        color: #fff;
      }
    }
  }

  .title {
    font-size: 60px;
    letter-spacing: 10px;
    text-align: left;
    -webkit-filter: drop-shadow(12px, 15px, 15px, #fff);
    filter: drop-shadow(12px, 15px, 15px, #fff);
    font-weight: bold;
  }
  h3.title {
    font-size: 30px;
  }
  .item {
    margin: 20px 0;
    font-size: 12px;
    & + div {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: #35495e 10px solid;
      overflow: hidden;
      background-image: url(https://img.zcool.cn/community/0115ba59e06280a80121ae0ce53c89.jpg@2o.jpg) !important;
      background-size: 160%;
      background-position: center;
      background-repeat: no-repeat;
      animation: rotate 5s linear 0s infinite normal;
      &::before{
        content: "VUE";
        width: 100%;
        height: 100%;
        background-color: #35495e1c;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        font-weight: bold;
        visibility: hidden;
        opacity: 0;
        animation: rotateF 5s linear 0s infinite normal;
      }
      &:hover {
        cursor: pointer;
        box-shadow: 0 0 20px 5px #2e8b5648 inset;
        .item + div {
          display: none;
        }
      }
      &:hover::before {
        visibility: visible;
        opacity: 1;
      }
    }
  }
}

@keyframes rotate {
  0%{
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
}
@keyframes rotateF {
  0%{
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(-360deg)
  }
}

.view {
  width: 100vw;
  padding: 1%;
  text-align: left;
}
</style>
