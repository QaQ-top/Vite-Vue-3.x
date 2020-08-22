/**
 * new Store()                      创建 vuex 实例
 *
 * createLogger()                   logger插件 vuex 数据变化 日志
 *
 * createNamespacedHelpers()        生成 固定命名空间 后的 mapState mapGetters mapA.....
 *    —>  const { mapState, mapActions } = createNamespacedHelpers('account')
 *    —>  这样就可以访问到 account 模块的数据了
 * 
 * createStore()                    和 new Store 效果相同
 *
 * useStore()                       获取 vuex
 */
import { createStore, createLogger,  } from 'vuex'

// 引入 Account 模块化实例
import account from './account'


export default createStore({

  // 模块
  modules: {
    account,
    
  },

  // 严格模式
  strict: true,

  // 插件
  plugins: [
    createLogger({   // vuex 数据变化 日志
      
      /**
       * 是否自动展开记录的 mutation
       * 如果你不想写那么多的配置
       * 请设置为 true
       */
      collapsed: false,

      //>手动配置  监听的都是 mutation 内的函数
      /**
       * filter : 若 mutation 内的函数触发, 需要被监听记录，就返回 true 
       * 
       * mutation : {
       *  type:'',        执行 mutationTree 内的函数名称
       *  payload: {}     这个对象 表示你更改后的数据
       * }
       * beforeState      数据更改前的 state
       * afterState       数据更改后的 state
       */
      filter(mutation, beforeState, afterState) {
        return mutation.type == "account/setUserInfo"
      },
      /**
       * transformer 在开始记录之前转换状态
       */
      transformer(globalState) {
        return globalState
      },
      /**
       * 返回 引起变化的 方法名称
       */
      mutationTransformer(mutation) {
        return mutation.type
      },

    }),
  ]
});

