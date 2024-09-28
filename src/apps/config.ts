// import yubiBlog from './yubiBlog/index.vue';
import loginPage from './loginPage/index.vue';
import loginPageIframe from './loginPageIframe/index.vue';
import iframeBrowser from './components/iframeBrowser.vue';
import catQuick from './games/catQuick/index.vue';

import { markRaw } from 'vue';
import { getUrlPrefix } from '../utils/image';

export const appMap: any = {
  macDialog: {
    name: 'Mac dialog',
    component: markRaw(iframeBrowser),
    title: '',
    imageSrc: `${getUrlPrefix()}/favicon.ico`,
    defaultDialogProp: {
      height: '700px',
      width: '1000px',
    },
    comProps: {
      url: 'https://yeyanbin.github.io/mac-dialog-demo/dist/'
    },
    desc: `模仿MacOS的窗口和浏览器，是刚接触微前端时的一个想法：“能不能做一个统筹微应用的网页入口，可以很方便的打开若干网页小程序？”
    技术栈：vue3，wujie，vite，naiveUI。
    开源地址：https://github.com/Yeyanbin/mac-dialog-demo/`
  },
  // https://github.com/Yeyanbin/yubi_image_manager
  flutterImageManager: { 
    name: 'image_manager',
    imageSrc: `${getUrlPrefix()}/flutter_icon.png`,
    url: 'https://github.com/Yeyanbin/yubi_image_manager',
    desc: `使用flutter做的图片管理工具，通过行程自动划分出一个个图库，支持持久化，可以很方便的选图。支持macos，可下载体验。
        做这app的原因是本人是业余摄影师，发现mac自带的图片预览工具太难用了，选片起来非常麻烦，特别想整理这两三年拍的一万多张照片，就自己做了一个。`
  },
  lowCodeDemo: { 
    component: markRaw(iframeBrowser),
    title: '',
    name: '低代码Demo',
    imageSrc: `${getUrlPrefix()}/emoji/joker.png`,
    comProps: {
      url: 'https://yeyanbin.github.io/yubi-react-schema-form/formEdit/'
    },
    defaultDialogProp: {
      height: '100vh',
      width: '100vw',
      x: 0,
      y: 0
    },
    desc: `之前开分享会时做的低代码Demo，可以支持一些简单的条件判断，支持简单的表单规则，可生成预览代码，表达式算法用的逆波兰表达式解决。
    技术栈：ts, React, next, tailwindcss。
    开源地址：https://github.com/Yeyanbin/yubi-react-form-joy`
  },
  yubiBlog: { 
    component: markRaw(iframeBrowser),
    title: '',
    name: 'Yubi Blog',
    imageSrc: `${getUrlPrefix()}/emoji/toolbox.png`,
    defaultDialogProp: {
      height: '700px',
      width: '1000px',
    },
    comProps: {
      url: 'https://yeyanbin.github.io/yubi-blog/doc/'
    },
    desc: `自己记笔记的地方，这个项目会将本地的markdown文件，按照目录生成具体的树形目录。
    技术栈：ts, React, next, markdown-it, tailwindcss。
    开源地址：https://github.com/Yeyanbin/SBlog`
  },
  ngAdmin: { 
    component: markRaw(iframeBrowser),
    desc: `Angular11的通用后台模版解决方案，支持快捷键，国际化，路由守卫，请求拦截等特征。
    技术栈：Angular, ts, antd
    开源地址：https://gitee.com/Yubi233/yubi-angular-admin`,
    name: 'yubi Angular admin',
    imageSrc: 'https://angular.io/assets/images/logos/angular/shield-large.svg',
    comProps: {
      url: 'https://yeyanbin.github.io/yubi-angular-admin/'
    },
    defaultDialogProp: {
      height: '700px',
      width: '1000px',
    },
  },
  catQuickVue: { 
    component: markRaw(catQuick),
    title: '可上下左右移动的猫咪，会自动随机射击',
    name: 'Cat(优化碰撞检测)',
    imageSrc: `${getUrlPrefix()}/emoji/cat.png`,
    defaultDialogProp: {
      height: '800px',
      width: '1200px',
    },
    desc: `使用渲染引擎eva.js做的小游戏，优化了碰撞检测算法。`
  },
  // https://github.com/Yeyanbin/plane_war_game
  planeWarGame: { 
    name: '模仿微信飞机大战',
    imageSrc: `${getUrlPrefix()}/hero_fly.png`,
    url: 'https://github.com/Yeyanbin/plane_war_game',
    desc: `使用flutter和游戏引擎flame，模仿了之前微信飞机大战的练手作，测试了android和mac端，可在github下载mac app试试。`
  },
}

export const defaultWindowConfig = {
  height: 600,
  width: 800,
}