<template>
  <pre class="pre">源对象<br />{{code}}</pre>
</template>

<script lang="ts">

export default {
  name: 'preCode',
  props:['code']
}
</script>

<style scoped>
  .pre{
    color: #3FB27E;
  }
</style>