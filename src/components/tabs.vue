<template>
  <div class="api">
    <ul @click="change">
      <li v-for="(item, index) in pron" :key="index" :data-index="index" :class="{activate:selection===index}">{{item}}</li>
    </ul>
    <div class="component">
      <component :is="name" @enter="enter" :names="['CK','YMY']"/>
    </div>
  </div>
</template>



<script lang='ts'>
import { ref, reactive, readonly, computed } from "vue";
import Components from './index';

export default {
  name: "Tabs",
  methods: {
    enter:(emits: any) => {
      console.log(emits)
    }
  },
  setup() {
    // 当前选择
    const selection = ref(0);

    // 组件名称
    const pron = Object.keys(Components);

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
  components:{
    ...Components
  }
};
</script>

<style lang='scss'>
*{
  transition: 0.2s linear;
}
.api {
  > ul {
    width: 100%;
    display: flex;
    padding: 20px;
    > li {
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      height: 50px;
      border-radius: 4px;
      margin: 0 10px;
      flex: 1;
      line-height: 50px;
      color: #fff;
      cursor: pointer;
      border: 1px solid #2E8B57;
      &.activate {
        background-color: #2E8B57;
        &:hover {
          background-color: #41B883;
        }
      }
    }
  }
  .component {
    width: 100%;
    height: 600px;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto auto auto;
    > div {
      padding: 0 20px;
    }
    > div:nth-child(1) {
      text-align: center;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      align-items: flex-start;
      > p {
        letter-spacing: 10px; // 字间距
        font-size: 20px;
        font-stretch: condensed;
        font-weight: bold;
        text-transform: uppercase;
      }
    }
    > div:nth-child(2),div:nth-child(3)  {
      width: 60vw;
      padding: 20px 0;
      margin: 0 auto;
    }
    >div:nth-child(3) {
      font-size: 14px;
      >span {
        color: #41B883;
        font-size: 20px;
        font-weight: 20px;
      }
    }
  }
}

</style>