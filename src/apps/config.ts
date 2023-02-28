import yubiBlog from './yubiBlog/index.vue';
import loginPage from './loginPage/index.vue';

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
}

export const defaultWindowConfig = {
  height: 800,
  width: 500,
}