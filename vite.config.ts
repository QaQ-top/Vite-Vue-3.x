// 配置信息接口
import { UserConfig } from 'node_modules/vite/dist/node/config'

module.exports = {
  /**
   *> 环境模式
   */
  mode: 'develop',


  /**
   *> 根目录
   * 当前文件的 路径
   * 也就是根目录
   */
  root: process.cwd(), // d:\Environment\progress\vue\vite


  /**
   *> 定义引入的依赖包 别名
   */
  alias: {
    // vue不需要定义 react需要
    'react': '@pika/react',
    'react-dom': '@pika/react-dom',
  },


  /**
   *> JSX
   */
  jsx: 'vue',


  /**
   *> 自定义文件转换
   */
  transforms: [
    {
      test: (ctx)=> {
        return false
      },
      transform: (ctx) => {
        return ''
      },
    },
  ],


  /**
   *> 定义全局变量替换
   * 在开发模式，挂载在' window '上
   * 生成模式，直接替换
   */
  define: {
    "target": {
      value: 'window 全局变量'
    },
  },


  /**
   *> 配置 dep optimize
   */
  optimizeDeps: {
    /**
     * 强制 optimize 列出的依赖项 (支持深路径)
     */
    include: [
      'view-design'
    ],
    /**
     * 不进行 optimize 的依赖项
     */
    exclude: [

    ],
    /**
     * 应作为源代码处理的链接依赖项列表
     */
    link: [
    ],

    /**
     * 导入节点内置但不实际导入的依赖项列表
     * 在浏览器中使用
     */
    allowNodeBuiltins: [
    ],

    /**
     * 自动运行' vite optimize'服务器
     */
    auto: true
  },
  /**
   *> 插件
   */
  plugins:[],

  /**
   *> Vue 编译器选项
   */
  vueCompilerOptions: {
  // 解析器选项
    /**
     * 变量模板
     */
    delimiters: ['{{','}}'],
    /**
     * 缓存v-on处理程序，以避免在每次渲染时创建新的内联函数，
     * 也避免了需要动态修补处理程序包装它。
     * 默认: false
     */ 
    cacheHandlers: true,
  },


  /**
   *> CSS 预处理器
   */
  cssPreprocessOptions: {
    'sass': {
      modifyVars: {
        'preprocess-custom-color': 'green'
      }
    }
  },


  /**
   *> CSS 模块选中
   */
  cssModuleOptions: {
    // 作用范围
    scopeBehaviour: 'global',
    // 全局模块路径
    globalModulePaths:[],
    // 生成命名空间
    generateScopedName: (name: string, filename: string, css: string) => {
      return ''
    },
    // 哈希前缀
    hashPrefix: '',
    /**
     * 命名约束
     * camelCase：驼峰
     * camelCaseOnly：仅在驼峰命名情况下
     * dashes： header-start
     * dashesOnly 仅在 - 命名情况下
     */
    localsConvention: 'camelCase'
  },


  /**
   *> Vue 自定义模块
   */
  vueCustomBlockTransforms: {
    i18n: ({ code }) => {
      return 'transformed code'
    }
  },


  /**
   *> 使用 esbuild
   * 默认 true
   */
  enableEsbuild: true,


  /**
   *> 从.env文件解析的环境变量
   * 只有以 VITE_ 开头的才会在import.meta.env上暴露
   *!需要在启动时指定环境 "dev": "vite --mode development"
   */
  env: {
    fast: 'VITE_FAST'
  },


  /**
   *> HTTP 代理
   */
  proxy: {
    '/music': {
      target: 'http://39.108.182.125:3000',
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/music/, '')
    }
  },

//>——————————————————————— DevServer ——————————————————————————
  // 主机 ip 地址
  hostname:'localhost',
  // 端口号
  port: 3000,
  // 立即打开浏览器
  open: false,
  /**
   *> 配置 HTTPS
   */
  https: false,
  httpsOptions:{
    // 省略....
  }
//>——————————————————————— END —————————————————————————————————

/**
 *> 生产模式
 * 省略....
 */

} as UserConfig
