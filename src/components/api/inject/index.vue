<template>
  <div>
    <p>provide</p>
    <span>依赖注入</span>
  </div>
  <div>
    <childern />
  </div>
  <div>
    <span>Provide</span>
    <ol type="1">
      <li>允许一个祖先组件作为其所有后代的依赖注入器</li>
      <li>无论组件层次结构有多深</li>
      <li>只要它们位于同一父链中就可以</li>
    </ol>
    <span>Inject</span>
    <ol type="1">
      <li>获取 祖先 的依赖注入</li>
    </ol>
  </div>
</template>

<script>
import childern from "./components/inject.vue";
export default {
  name: "Inject",
  setup() {
    return {};
  },
  components: {
    childern,
  },
};
</script>

<style>
</style>