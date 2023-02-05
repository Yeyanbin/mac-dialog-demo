
<script setup lang="ts">

import bulletTestVue from '../bulletTest/index.vue';
import shootDemoVue from '../shootDemo/index.vue';

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
  bulletTestVue: markRaw(bulletTestVue),
  shootDemoVue: markRaw(shootDemoVue)
}

const addApplication = (applicationName) => {
  emit('addApplication', applicationName, {
    component: appMap[applicationName],
    isEasy: true,
    state: DIALOG_STATE.FULL_SCREEN,
    defaultDialogProp: {
      x: 0,
      y: 0,
      height: props.containerProp.height,
      width: props.containerProp.width,
    }
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
        追随射击Demo
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