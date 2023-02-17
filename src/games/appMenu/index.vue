
<script setup lang="ts">



import { CashOutline as CashIcon } from '@vicons/ionicons5'

import { defineEmits } from 'vue';
import { DIALOG_STATE } from '../../components/WindowDialog/domains/useDialogState';
import { resource, RESOURCE_TYPE } from '@eva/eva.js';

import { appMap } from '../config';
import { getUrlPrefix } from '../../utils/image';
import { flowerBulletEmojiNameList, monsterEmojiNameList } from '../emoji.config';

import { gameConfig } from '../config';

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

// 猫咪和他的子弹
addEmoji(['cat', ...flowerBulletEmojiNameList])

// 怪物
addEmoji(monsterEmojiNameList);


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
      height: `${gameConfig.height}px`,
      width: `${gameConfig.width}px`,
    },
    ...app,
  });
};
</script>

<template>
  <div>
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