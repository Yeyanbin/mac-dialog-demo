import catVue from './cat/index.vue';
import catQuick from './catQuick/index.vue';
import yubiBlog from './yubiBlog/index.vue';

import { markRaw } from 'vue';
import { getUrlPrefix } from '../utils/image';

export const appMap = {
  catVue: { 
    component: markRaw(catVue),
    title: '可上下左右移动的猫咪，会自动随机射击',
    name: 'Cat',
    imageSrc: `${getUrlPrefix()}/emoji/cat.png`
  },
  catQuickVue: { 
    component: markRaw(catQuick),
    title: '可上下左右移动的猫咪，会自动随机射击',
    name: 'Cat(优化碰撞检测)',
    imageSrc: `${getUrlPrefix()}/emoji/cat.png`
  },
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
}

export const gameConfig = {
  width: 1400,
  height: 1100,
  topPadding: 50,
};
