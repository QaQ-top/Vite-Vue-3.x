<template>
  <div>
    <h1>
       子组件： <input type="text" disabled :value="introduction.value">
    </h1>
    <div>
       子组件：<input type="text" v-focus v-model="introduction.value">
    </div>
    <br />
  </div>
  <pre-code :code='introduction' />
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  name: 'Reactivechildern',
  setup(props,context) {

    // attr 表示 父作用域在组件上 定义的 属性
    const { introduction } = context.attrs
    
    return {
      introduction
    }
  },
  
}
</script>

<style lang="scss" scoped>

</style>
