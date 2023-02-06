
<script setup lang="ts">

import bulletTestVue from '../bulletTest/index.vue';
import shootDemoVue from '../shootDemo/index.vue';
import autoShootDemoVue from '../autoShootDemo/index.vue';
import moveDemoVue from '../moveDemo/index.vue';

import { CashOutline as CashIcon } from '@vicons/ionicons5'

import { defineEmits, markRaw } from 'vue';
import { DIALOG_STATE } from '../../components/WindowDialog/domains/useDialogState';

const props = defineProps({
  containerProp: {
    type: Object,
    default: () => undefined
  },
});

const emit = defineEmits(['addApplication']);

const appMap = {
  bulletTestVue: {
    component: markRaw(bulletTestVue),
    title: '追随鼠标移动的demo'
  },
  shootDemoVue: {
    component: markRaw(shootDemoVue),
    title: '点击射击demo，请单击，会往鼠标方向发射一个萝卜'
  },
  autoShootDemoVue: {
    component: markRaw(autoShootDemoVue),
    title: '自动射击demo，每隔一秒，会往鼠标方向发射一个萝卜'
  },
  moveDemoVue: {
    component: markRaw(moveDemoVue),
    title: '点击移动demo，请点击任意位置，小熊会往该处移动'
  },
}

const addApplication = (applicationName) => {
  emit('addApplication', applicationName, {
    isEasy: true,
    state: DIALOG_STATE.NORMAL,
    defaultDialogProp: {
      height: '800px',
      width: '1000px',
    },
    ...appMap[applicationName],
  });
};
</script>

<template>
  <div>
    <div class="icon-wrap">
      <n-button color="#8a2be2" circle @click="addApplication('bulletTestVue')">
        <template #icon>
          <n-icon><cash-icon /></n-icon>
        </template>
      </n-button>
      <div>
        跟随鼠标Demo
      </div>
    </div>

    <div class="icon-wrap">
      <n-button color="#8a2be2" circle @click="addApplication('shootDemoVue')">
        <template #icon>
          <n-icon><cash-icon /></n-icon>
        </template>
      </n-button>
      <div>
        点击射击Demo
      </div>
    </div>

    <div class="icon-wrap">
      <n-button color="#8a2be2" circle @click="addApplication('autoShootDemoVue')">
        <template #icon>
          <n-icon><cash-icon /></n-icon>
        </template>
      </n-button>
      <div>
        自动射击Demo
      </div>
    </div>

    <div class="icon-wrap">
      <n-button color="#8a2be2" circle @click="addApplication('moveDemoVue')">
        <template #icon>
          <n-icon><cash-icon /></n-icon>
        </template>
      </n-button>
      <div>
        点击移动Demo
      </div>
    </div>
  </div>  
</template>

<style lang="scss" scoped>
.icon-wrap {
  display: flex;
  width: 80px;
  margin: 20px 15px;
  flex-direction: column;
  align-items: center;
  color: whitesmoke;
  font-size: 12px;

  button {
    margin-bottom: 5px;
  }
}
</style>