import yubiBlog from './yubiBlog/index.vue';
import loginPage from './loginPage/index.vue';
import loginPageIframe from './loginPageIframe/index.vue';
import iframeBrowser from './components/iframeBrowser.vue';

import { markRaw } from 'vue';
import { getUrlPrefix } from '../utils/image';

export const appMap = {
  yubiBlog: { 
    component: markRaw(yubiBlog),
    title: '',
    name: 'Yubi Blog',
    imageSrc: `${getUrlPrefix()}/emoji/toolbox.png`,
    defaultDialogProp: {
      height: '700px',
      width: '1000px',
    },
  },
  login: { 
    component: markRaw(loginPage),
    title: '',
    name: '登陆页',
    imageSrc: `${getUrlPrefix()}/emoji/club.png`,
    defaultDialogProp: {
      height: '400px',
      width: '500px',
    },
  },
  loginIframe: { 
    component: markRaw(loginPageIframe),
    title: '',
    name: '登陆页Iframe',
    imageSrc: `${getUrlPrefix()}/emoji/club.png`,
    defaultDialogProp: {
      height: '400px',
      width: '500px',
    },
    comProps: {
    }
  },
  textAnime: { 
    component: markRaw(iframeBrowser),
    title: '',
    name: '文本动画（撩妹用）',
    imageSrc: `${getUrlPrefix()}/emoji/redHeart.png`,
    comProps: {
      url: 'https://yeyanbin.github.io/yubi-form-joy/dist/#/textAnime'
    }
  },
  wzry: { 
    component: markRaw(iframeBrowser),
    title: '',
    name: '王者荣耀图鉴',
    imageSrc: `${getUrlPrefix()}/emoji/joker.png`,
    comProps: {
      url: 'https://lengyibai.gitee.io/wzry'
    }
  },
  solaBlog: { 
    component: markRaw(iframeBrowser),
    title: '',
    name: 'sola-blog',
    imageSrc: `${getUrlPrefix()}/emoji/wrench.png`,
    comProps: {
      url: 'https://blog.anothersola.cn/'
    }
  },
  ngAdmin: { 
    component: markRaw(iframeBrowser),
    title: 'Angular11的通用后台模版解决方案，支持快捷键，国际化，路由守卫，请求拦截等特征。',
    name: 'yubi Angular admin',
    imageSrc: 'https://angular.io/assets/images/logos/angular/shield-large.svg',
    comProps: {
      url: 'https://yubi233.gitee.io/yubi-angular-admin/'
    }
  },
  // https://yubi233.gitee.io/yubi-angular-admin/
  VueDoc: { 
    component: markRaw(iframeBrowser),
    title: '',
    name: 'Vue doc',
    imageSrc: `${getUrlPrefix()}/favicon.ico`,
    comProps: {
      url: 'https://v3.cn.vuejs.org/'
    },
    defaultDialogProp: {
      height: '700px',
      width: '1000px',
    },
  },
}

export const defaultWindowConfig = {
  height: 600,
  width: 800,
}