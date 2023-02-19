import catVue from './cat/index.vue';
import catQuick from './catQuick/index.vue';

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
}

export const gameConfig = {
  width: 1400,
  height: 1100,
  topPadding: 50,
};
