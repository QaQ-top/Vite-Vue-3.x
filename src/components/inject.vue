<template>
  <div>
    <p>子组件： <code>inject</code>: 获取依赖 </p>
    <p>{{response.value}}</p>
    <pre-code :code='response' />
  </div>
</template>

<script lang="ts">
export default {
  name: 'Inject',
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