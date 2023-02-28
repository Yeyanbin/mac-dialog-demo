
<script setup lang="ts">

import { defineEmits } from 'vue';
import { DIALOG_STATE } from '../../components/WindowDialog/domains/useDialogState';
import { resource, RESOURCE_TYPE } from '@eva/eva.js';

import { appMap } from '../config';

import { defaultWindowConfig } from '../config';

const props = defineProps({
  containerProp: {
    type: Object,
    default: () => undefined
  },
});

const emit = defineEmits(['addApplication']);

const addApplication = (app) => {
  emit('addApplication', app.conponent, {
    isEasy: true,
    state: DIALOG_STATE.NORMAL,
    defaultDialogProp: {
      height: `${defaultWindowConfig.height}px`,
      width: `${defaultWindowConfig.width}px`,
    },
    ...app,
  });
};
</script>

<template>
  <div class="app-wrap">
    <n-card class="app-card" title="微应用" :size="'small'">
      <div class="icon-wrap" v-for="item of appMap">
        <n-button circle @click="addApplication(item)">
          <template #icon>
            <img
              width="20"
              height="20"
              :src="item.imageSrc"
            />        
          </template>
        </n-button>
        <div>
          {{ item.name }}
        </div>
      </div>
    </n-card>  
  </div>
</template>

<style lang="scss" scoped>
.icon-wrap {
  display: flex;
  width: 80px;
  margin: 20px 0px;
  flex-direction: column;
  align-items: center;
  color: greys;
  font-size: 12px;

  button {
    margin-bottom: 5px;
  }
}
.app-wrap {
  margin: 15px 20px;

}
.app-card {
  // opacity: 0.6;
  background: #ffffffaa;

  div {
    // opacity: 1;
  }
}
</style>