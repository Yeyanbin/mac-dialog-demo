
<script setup lang="ts">



import { CashOutline as CashIcon } from '@vicons/ionicons5'

import { defineEmits } from 'vue';
import { DIALOG_STATE } from '../../components/WindowDialog/domains/useDialogState';
import { resource, RESOURCE_TYPE } from '@eva/eva.js';

import { appMap } from '../config';
import { getUrlPrefix } from '../../utils/image';


const addEmoji = (emojiList: string[]) => {
  resource.addResource(emojiList.map((name) => ({
    name,
    type: RESOURCE_TYPE.IMAGE,
    src: {
      image: {
        type: 'png',
        url: `${getUrlPrefix()}/emoji/${name}.png`
      },
    },
  })));
}

addEmoji(['cat', 'flower1', 'flower2', 'flower3', 'flower4', 'flower5', 'flower6'])

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
      height: '800px',
      width: '1000px',
    },
    ...app,
  });
};
</script>

<template>
  <div>
    <div class="icon-wrap" v-for="item of appMap">
      <n-button color="#8a2be2" circle @click="addApplication(item)">
        <template #icon>
          <n-image
            width="100"
            :src="item.imageSrc"
          />        
        </template>
      </n-button>
      <div>
        {{ item.name }}
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