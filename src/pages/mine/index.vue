<template>
  <div ref="mine">
    {{state.value}}
    <pre-code :code='getUserInfo'/>
    <dsa-fsa></dsa-fsa>
    <fsa-dsa></fsa-dsa>
  </div>
</template>

<script lang='ts'>
/**
 *!lang='tsx' 无法使用 TSX 语法
 *!只能使用 ts
 */
// Vue
import { h, reactive, defineComponent, onMounted, ref, isProxy, isReactive, isRef,  } from 'vue'

// Vue-Router
import { useLink, useRoute, useRouter, parseQuery, stringifyQuery } from 'vue-router'

/**
 * Vuex
 * setup 内无法访问到外部定义 computed 里映射的 vuex 数据  ( 使用 Vue 3.x Composition API 当然是不存在这种问题)
 * 方法一：使用 useStore
 * 方法二：在 setup 中使用 vuex 映射(mapState......) 
 */
import { useStore, mapGetters, mapState, mapActions } from 'vuex'


import PreCode from '../../components/api/pre.vue'

 const Mine =  defineComponent({
  name: 'Mine',
  setup(props, countext) {

    const state = reactive({
      value: 'Mine'
    })

//!———————————————————————————————— Vuex ——————————————————————————————————————
    //>useStore()
    const Store = useStore()
    const { commit, dispatch,} = Store
    /**
     * dispatch：   调用 actionsTree 内的方法
     * commit：     调用 mutationTree 内的方法
     */


//!—————————————————————————————— Vue-Router ———————————————————————————————————

    //>数据序列化
    stringifyQuery({name: '崔逵'}) // name=%E5%B4%94%E9%80%B5
    parseQuery('name=%E5%B4%94%E9%80%B5') // {name: '崔逵'}


    //>useLink  ————————————————————————————————————————
    /**
     * useLink(): 自定义路由跳转函数, 接受一个路由配置，并返回路由信息及执行回调
     * 所有的属性都被 Ref, Readonly 包装
     * 属性：
     *      route               创建的路由对象
     * 
     *      href                目标地址
     * 
     *      isActive            是否激活
     * 
     *      isExactActive       // ?
     * 
     *      navigate            触发路由跳转 返回一个 Promise 
     * 
     * 模板语法
     * <router-link to="/" custom v-slot="{ navigate, isActive, isExactActive }">
     *    // custom 自定义 router-link 渲染
     *    <button role="link" @click="navigate" :class="{ active: isActive, 'exact-active': isExactActive }">
     *      按钮
     *    </button>
     * <router-link>
     */
    const link = useLink({ 
      to: '/home?add=45',       // 要跳转的目标路径
      replace: false,           // ?
    })

    // link.navigate().then((res)=>{
    //   console.log(res,'to: /home')
    // })
    //>END ————————————————————————————————————————————————


    //>useRoute  ————————————————————————————————————————
    /**
     * useRoute() : 获取当前路由信息 
     * 并且 vue 已经对返回的路由信息作了 Reactive 处理 
     * 他已经是响应式数据了
     * 属性：
     *      path              当前路由路径
     * 
     *      name              当前路由name
     * 
     *      params            传递过来的 params
     * 
     *      query             传递过来的 query
     * 
     *      hash              #hashname 哈希路径
     * 
     *      fullpath          完整的路由路径
     * 
     *      matched           包含当前路由的所有嵌套路径片段的路由记录
     * 
     *      meta              路由元信息
     * 
     *      redirectedFrom    //?重定向 不确定
     */
    const route = useRoute()
    //>END ————————————————————————————————————————————————


    //>useRouter  —————————————————————————————————————————
    /**
     * useRouter() : 使用 VueRouter 定义的 API
     * 属性：
     *      currentRoute:   返回当前路由 被 Ref 包装过
     * 
     *      addRoute()      动态添加路由  返回一个可以删除该路由的函数
     * 
     *      removeRoute()   接收路由的 name 动态删除该路由
     * 
     *      hasRoute()      是否存在某个路由 返回 Boolean
     * 
     *      getRoutes()     获取路由配置, 替换原 3.0 routes 属性
     * 
     *      push()          路由跳转
     * 
     *      replace()       路由重定向
     * 
     *      resolve()       解析目标路由 返回目标路由信息
     * 
     *      go()            去到某一个 History  返回 Promise<void | {type, to, from} | undefined>
     * 
     *      back()          返回上一个路由 返回 Promise<void | {type, to, from} | undefined>
     * 
     *      forward()       去到下一个路由 返回 Promise<void | {type, to, from} | undefined>
     * 
     *      beforeEach()    全局路由守卫, 路由跳转前
     * 
     *      beforeResolve() 全局路由守卫, 路由解析前
     * 
     *      afterEach()     全局路由守卫, 路由跳转后台
     * 
     *      onError()       报错监听
     * 
     *      isReady()       路由是否初始化， 返回Promise, 替代原3.0 onReady
     * 
     *      install()       vue插件安装器
     */
    const router = useRouter()
  
    // // 添加路由 continued
    // const delContinued = router.addRoute({
    //   path: '/continued',
    //   name: Symbol.for('Continued'),
    //   component:{
    //     name: 'Continued',
    //     render() {
    //       return h('div',{'class': 'add'},'Routing recommendation successful')
    //     },
    //     setup() {}
    //   }
    // })
    // // 删除路由 continued
    // delContinued()
    // setTimeout(()=>{
    //   router.push('/continued') // 将无法访问到
    // },3000)

    // // 删除一个路由
    // router.removeRoute(Symbol.for('Home')) 

    // // 检查是否存在某个路由
    // router.hasRoute(Symbol.for('Home'))

    // // 获取整个路由 routes
    // console.log(router.getRoutes())

    // // 解析目标路由 获取目标路由信息
    // const homeRoute = router.resolve({
    //   name: Symbol.for('Home'),
    //   params: {
    //     name: 'ck'
    //   }
    // })
    //>END ————————————————————————————————————————————————

    console.group('Vue-Router')
        console.group('link')
            console.log(Object.entries(link))
        console.groupEnd()

        console.group('route')
            console.log(Object.entries(route))
        console.groupEnd()

        console.group('router')
            console.log(Object.entries(router))
        console.groupEnd()
    console.groupEnd()

    // 生命周期
    onMounted(()=>{
      dispatch('account/useSetUserInfo',{name:'dispatch'})
      commit('account/setUserInfo',{name:'崔逵'})

    })
 
    return {
      state,
    }
  },
  /**
   * 'account',{
      getUserInfo: 'getUserInfo'
    }
   */
  /**
   * 模块化 mapState 获取数据
   * 方法一 ：mapState(user: (store) => store.account.user }) <-- mapState 才能这样用-->
   * 方法二 ：mapState('account',['user']) <-- 推荐使用 -->
   * 方法三 ：mapState('account',{ user: 'user'})
   * 方法四 ：createNamespacedHelpers('account') 固定模块
   *!注意：获取模块内的数据 需要在 module 中加一个命名空间 namespaced: true; 否则无法获取
   */
  computed: {
    // ...mapState('account',['user']),
    ...mapGetters('account',['getUserInfo']),
    ...mapActions('account',['setUserInfo'])
  },
  components: {
    PreCode,
  }
}) 
export default Mine
</script>

<style lang='scss' scoped>
button {
  background-color: red;
}
</style>