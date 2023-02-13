import catVue from './cat/index.vue';
import { markRaw } from 'vue';
import { getUrlPrefix } from '../utils/image';

export const appMap = {
  catVue: { 
    component: markRaw(catVue),
    title: '可上下左右移动的猫咪，会自动随机射击',
    name: 'Cat',
    imageSrc: `${getUrlPrefix()}/emoji/cat.png`
  },
}