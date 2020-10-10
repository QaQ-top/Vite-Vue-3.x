<template>
  <div>
    <div>
      <h1>
        子组件： <input type="text" disabled :value="introduction.value">
      </h1>
      <div>
        子组件：<input type="text" v-model="introduction.value"> <!-- v-focus -->
      </div>
      <br />
    </div>
    <pre-code :code='introduction' />
  </div>
  <!-- //!template不是唯一根元素时，会出现一些警告
    Extraneous non-props attributes (introduction) were passed to component,
    but could not be automatically,
    inherited because component renders fragment or text root nodes.  
  -->
</template>

<script lang="ts">
import { ref, SetupContext} from 'vue'

export default {
  name: 'Reactivechildern',

  setup(props: any,context: SetupContext) {
    console.log(props)
    // attr 表示 父作用域在组件上 定义的 属性
    const { introduction } = context.attrs
    
    return {
      introduction
    }
  },
  created () {
    console.log(this.$data)
    console.log(this.$props)
  }
  
}
</script>

<style lang="scss" scoped>

</style>
