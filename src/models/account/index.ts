import { StoreOptions, GetterTree, ActionTree, MutationTree, Plugin } from 'vuex';

interface User {
  user: {
    phone: number | string,
    id: number | string,
    name: string,
    age: number | string,
    // 0：女， 1：男
    sex: number | string,
    [key:string]: number | string,
  }
}
interface Params {
  [key:string]: number | string,
}

export default {

//>状态： 存储数据
  state: {
    user: {
      phone: 13177413866,
      id: 11152,
      name: '崔逵',
      age: 22,
      // 0：女， 1：男
      sex: 1,
    },
  },


//>读取： 读取存储数据
  getters: {
    getUserInfo(state, getters: any, globalState, globalGetters: any) {
      /**
       * globalState    全部模块
       * globalGetters  全部模块内的 Getters
       * state：        当前模块 state 的数据
       * getters：      当前模块 getters 的数据
       */
      return state.user
    },
  } as GetterTree<User, User>,



//>动作： 调用 mutations
  actions: {
    useSetUserInfo({ commit }, params: Params) {
      /**
       * context
       * 
       *  — commit           提交一个 mutation
       * 
       *  — dispatch         提交一个 actions
       * 
       *  — getters          当前模块 getters 的数据
       * 
       *  — rootGetters      全部模块内的 Getters
       * 
       *  — rootState        全部模块
       * 
       *  — state            当前模块 state 的数据
       * 
       */
      commit('setUserInfo', params)
    },
  } as ActionTree<User, User>,


//>设置： 设置存储数据
  mutations: {
    setUserInfo({ user }: User, params) {
      /**
       * 元素隐式具有 "any" 类型，因为类型为 "string" 的表达式不能用于索引类型
       * 在类型上找不到具有类型为 "string" 的参数的索引签名
       * 解决方案：user加上 [key:string]: number | string
       */
      Object.assign(user, params)
    },
  } as MutationTree<User>,


//>插件
  plugins: {

  } as Plugin<User>[],


//>vue-devtools 是否可以监测
  devtools: true,


//>严格模式
  strict: true,

//!重点：太坑了
/***
   * namespaced ：命名空间
   * 定义 module 另外命名时，需要在 module 中加一个命名空间 namespaced: true 属性，
   * 否则命名无法暴露出来，
   * module namespace not found in [mapState ](): account/
   */
  namespaced: true

} as StoreOptions<User>;