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
      height: '600px',
      width: '850px',
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
  VueDoc: { 
    component: markRaw(iframeBrowser),
    title: '',
    name: 'Vue doc',
    imageSrc: `${getUrlPrefix()}/favicon.ico`,
    comProps: {
      url: 'https://v3.cn.vuejs.org/'
    }
  },
}

export const defaultWindowConfig = {
  height: 800,
  width: 600,
}