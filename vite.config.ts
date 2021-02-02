// 配置信息接口
import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import autoprefixer from 'autoprefixer';
export default defineConfig({
  mode: 'development',
  root: process.cwd(),
  base: '/',
  alias: {
    "@src": resolve(__dirname, "src"),
    "@assets": resolve(__dirname, "src/assets"),
    "@models": resolve(__dirname, "src/models"),
    "@pages": resolve(__dirname, "src/pages"),
    "@route": resolve(__dirname, "src/route"),
    "@themes": resolve(__dirname, "src/themes"),
    "@utils": resolve(__dirname, "src/utils"),
    "@components": resolve(__dirname, "src/components"),
  },
  define: {
    __GLOBAL__target: "全局变量"
  },
  plugins:[
    vue(),
    vueJsx(),
  ],
  esbuild: {
    target: "es2020",
    jsxInject: "h",
    jsxFragment: "Fragment",
  },
  css: {
    modules: {
      scopeBehaviour: 'local',
      generateScopedName: "[name]-[local]-[hash:base64:5]",
      localsConvention: 'camelCase',
    },
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist:["last 5 versions", "> 0.5%"]
        })
      ]
    }
  },
  json: {
    namedExports: true,
    stringify: false,
  },
  assetsInclude: [
    // images
    'png','jpe?g','gif','svg','ico','webp','avif',
  
    // media
    'mp4','webm','ogg','mp3','wav','flac','aac',
  
    // fonts
    'woff2?','eot','ttf','otf',
  
    // other
    'wasm'
  ],

  server: {
    base: '/',
    host: '127.0.0.1',
    port: 6412,
    strictPort: true,
    middlewareMode:  false,
    open: false,
    proxy: {
      "/music": {
        target: 'http://39.108.182.125:3000',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/music/, ''),
      }
    },
    cors: {
      "origin": '*',
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "preflightContinue": false,
      "optionsSuccessStatus": 204
    }
  }

});
