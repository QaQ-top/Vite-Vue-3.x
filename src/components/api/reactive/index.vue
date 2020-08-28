<template>
  <div>
    <p>reactive</p>
    <span>数据响应 {{rely}}</span>
  </div>
  <div>
    <div>
      父组件:
      <input type="text" disabled :value="introduction.value" />
      <br />父组件:
      <input type="text" v-model="introduction.value" />
    </div>
    <childern :introduction="introduction" />
  </div>
  <div>
    <span>Reactive</span>
    <ol type="1">
      <li>创建响应式对象 子组件可以更改 父亲组件的 reactive</li>
      <li>不使用 reactive 创建的对象 对于 子组件来说 是单向的 子组件无法更改</li>
    </ol>
  </div>
</template>

<script lang='ts'>
import { reactive, computed } from "vue";
import childern from "./components/reactive.vue";

export default {
  name: "Reactive",
  setup() {
    /**
     * >reactive
     * 创建响应式 对象 子组件更改 父亲组件 也会更改
     * 不使用 reactive 创建的对象 对于 子组件来说 是单向的 子组件无法更改
     */
    const introduction = reactive({
      value: "Hello Vue 3.0 + Vite",
    });

    /**
     * >computed
     * 还是 原来的 味道 计算属性
     */
    let rely = computed(() => {
      return introduction.value.length;
    });
    return {
      introduction,
      rely,
    };
  },
  components: {
    childern,
  },
};
</script>

<style>
</style>