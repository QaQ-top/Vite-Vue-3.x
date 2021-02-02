import { createRouter, createWebHistory} from 'vue-router'
/**
 * createRouter()           创建路由
 * 
 * createWebHashHistory()   hash 路由
 * 
 * createWebHistory()       history 路由
 * 
 * createMemoryHistory()    带缓存 history 路由
 */

import Home from '@pages/home'
import Mine from '@pages/mine/index.vue'


// console.log(Home, Mine)

const Router =  createRouter({

  history: createWebHistory(),

  /**
   * 设置滚动条高度....
   * 返回 对象 或者 异步的 Promise 都可以
   */
  scrollBehavior(to, from, savedPosition) {
   return new Promise((resolve, reject) => {
      /**
     * to：当前路由
     * from：之前的路由
     * savedPosition：页面刷新 前的位置 路由跳转并不会 刷新页面
     */
    // console.log(to, from, savedPosition)
    resolve( {
      // ...savedPosition,
      // top: 35,
      // left: 1
    })
   })
   
  },
  routes: [
    {
      path:'/',
      redirect: '/home'
    },
    {
      path: '/home',                    // '/home/:add' 这样传递参数似乎不行  而且 跳转的时候直接在路径加上?add=45 会被 query 接收到
      name: Symbol.for(Home.name),      // symbol 或者 string 类型
      component: Home
    },
    {
      path: '/mine',
      name: Symbol.for(Mine.name as string),
      component: Mine,
      beforeEnter: (to, from, next) => {  // 当前路由独享的守卫
        // ...
        next()
      }
    }
  ],

  
});

// 路由守卫
Router.beforeEach((to, from, next )=> {
  console.log('全局守卫：跳转前....')
  next()
})

export default Router

