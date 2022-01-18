<template>
  <div class="window-dialog-container">
    <template v-for="(dialogItem, index) of windowDialogList" :key="dialogItem.key">
      <WindowDialog
        :dialog-prop="dialogItem.defaultDialogProp"
        :name="dialogItem.name"
        :index="index"
        :title="dialogItem.title"
        v-on="handleDialogFunc(dialogItem.func, index)"
      >
        <template v-slot="scoped">
          <Browser v-if="dialogItem.key === 'browser'"></Browser>
          <Menu v-else :is="dialogItem.component" :dialogItem="dialogItem" v-bind="scoped"></Menu>
        </template>
      </WindowDialog>
    </template>
  </div>
  <div class="window-dialog-top">
    <div class="window-dialog-operator">
      <div>窗口数量：{{ windowDialogList.length }}</div>
      <div class="operator-button-group">
        <!-- <n-button @click="addWindowDialog">增加窗口</n-button> -->
        <n-button @click="addWindowDialog" circle size="tiny" #icon>
          <n-icon>
            <AddCircleOutline />
          </n-icon>
        </n-button>
      </div>
    </div>
    <div class="window-dialog-menu"></div>
  </div>
</template>

<script setup lang="ts">
import WindowDialog from '@/components/WindowDialog/index.vue';
import useWindowDialogList, { WINDOW_DIALOG_STATE } from './domains/useWindowDialogList';
import { markRaw, shallowRef } from 'vue';
import Menu from '../menu.vue';

import { AddCircleOutline } from '@vicons/ionicons5';
import { IWindowDialog } from '../../interface/windowDialog';

import Browser from '@/application/Browser/index.vue';

// 这里用markRaw估计是在setup里才需要的
// console.log('login ', markRaw(login));

const props = defineProps({
  windowDialogList: {
    type: Array,
    default: []
  },
  baseComponents: {
    type: Object,
    default: undefined,
  }
})

document.addEventListener('selectstart', (ev) => {
  console.log('select start')
  ev.preventDefault();
  return false;
})

const {
  windowDialogList,
  handleDialogFunc,
  addWindowDialog,
} = useWindowDialogList(props.windowDialogList as IWindowDialog[]);

</script>

<style lang="scss" scoped>
.window-dialog-top {
  position: relative;
  bottom: 0px;
  width: 100vw;
}
.window-dialog-operator {
  height: 30px;
  margin: 5px 10px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-radius: 10px;
}

.operator-button-group {
  padding: 5px 20px;
}
</style>
