<template>
  <div>
    <p>子组件： <code>inject</code>: 获取依赖 </p>
    <p>{{response.value}}</p>
  </div>
  <pre-code :code='response' />
</template>

<script lang="ts">
export default {
  name: 'Injectchildren',
  setup: () => {
    return {
    }
  },
  //>—— inject ——
  /**
   * 获取 祖先 元素的依赖注入
   */
  inject: {
    receive: 'passed',
    response: 'response'
  }
}
</script>

<style>
</style>