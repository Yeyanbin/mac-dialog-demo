import bulletTestVue from './bulletTest/index.vue';
import shootDemoVue from './shootDemo/index.vue';
import autoShootDemoVue from './autoShootDemo/index.vue';
import moveDemoVue from './moveDemo/index.vue';
import keyMoveDemo from './keyMoveDemo/index.vue';
import p2Demo from './p2Demo/index.vue';
import randomShootVue from './randomShootDemo/index.vue';
import hitDemoVue from './hitDemo/index.vue';
import { markRaw } from 'vue';

export const appMap = {
  bulletTestVue: {
    component: markRaw(bulletTestVue),
    title: '追随鼠标移动的demo',
    name: '跟随鼠标Demo',
  },
  shootDemoVue: {
    component: markRaw(shootDemoVue),
    title: '点击射击demo，请单击，会往鼠标方向发射一个萝卜',
    name: '点击射击Demo',
  },
  autoShootDemoVue: {
    component: markRaw(autoShootDemoVue),
    title: '自动射击demo，每隔一秒，会往鼠标方向发射一个萝卜',
    name: '自动射击Demo',
  },
  moveDemoVue: {
    component: markRaw(moveDemoVue),
    title: '点击移动demo，请点击任意位置，小熊会往该处移动',
    name: '点击移动Demo',

  },
  keyMoveDemo: {
    component: markRaw(keyMoveDemo),
    title: '通过键盘的上下左右方向键来控制小熊的移动',
    name: '键盘移动demo',
  },
  p2Demo: {
    component: markRaw(p2Demo),
    title: '通过键盘的上下左右方向键来控制小熊P1的移动，P2是wasd',
    name: '双人移动demo',
  },
  randomShootVue: {
    component: markRaw(randomShootVue),
    title: '通过键盘的上下左右方向键来控制小熊的移动，会往随机方向射击',
    name: '随机射击demo',
  },
  hitDemoVue: {
    component: markRaw(hitDemoVue),
    title: '通过键盘的上下左右方向键来控制瑟瑟发抖的小熊来躲避萝卜的攻击',
    name: '碰撞demo',
  },
}