<template>
  <div>
    <ul @click="change">
      <li v-for="(item, index) in pron" :key="index" :data-index="index">{{item}}</li>
    </ul>
    <component :is="name" />
  </div>
</template>

<script lang='ts'>
import { ref, reactive, readonly, computed } from "vue";

import Reactive from "./test.vue";
// 全部组件
const components = {
  Reactive,
};

export default {
  name: "Tabs",
  setup() {
    // 当前选择
    const selection = ref(0);

    // 组件名称
    const pron = readonly(Object.keys(components));

    // 选择的组件名称
    const name = computed(() => {
      return pron[selection.value];
    });

    // 改变 选择
    const change = ({ target }: MouseEvent) => {
      if ((target as HTMLLIElement).localName === "li") {
        const {
          dataset: { index },
        } = target as HTMLLIElement;
        selection.value = Number(index);
      }
    };
    return {
      pron,
      name,
      selection,
      change,
    };
  },
  components,
};
</script>

<style>
</style>