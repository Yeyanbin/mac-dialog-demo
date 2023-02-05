<template>
  <div class>
    <template v-for="(dialogItem, index) of windowDialogList" :key="dialogItem.key">
      <template v-if="!dialogItem.isEasy">
        <WindowDialog
          :dialog-prop="dialogItem.defaultDialogProp"
          :container-Prop="containerProp"
          :name="dialogItem.name"
          :index="index"
          :title="dialogItem.title"
          v-on="handleDialogFunc(dialogItem.func, index)"
        >
          <template v-slot="scoped">
            <Menu
              :is="dialogItem.component"
              :container-Prop="containerProp"
              :dialogItem="dialogItem"
              v-bind="scoped"
            ></Menu>
          </template>
        </WindowDialog>
      </template>
      <template v-else>
        <WindowDialog
          :dialog-prop="dialogItem.defaultDialogProp"
          :container-Prop="containerProp"
          :name="dialogItem.name"
          :index="index"
          :title="dialogItem.title"
          v-on="handleDialogFunc(dialogItem.func, index)">
          <component :is="dialogItem.component"></component>
        </WindowDialog>
      </template>
    </template>
  </div>
  <div class="window-dialog-container" style="width: 100vw;height: 100vh;" ref="windowDialogContainerRef">
    <div class="window-dialog-operator">
      <div>窗口数量：{{ windowDialogList.length }}</div>
      <div class="operator-button-group">
        <!-- <n-button @click="addWindowDialog">增加窗口</n-button> -->
        <n-button @click="() => addWindowDialog(props.homePageName)" circle size="tiny" #icon>
          <n-icon>
            <AddCircleOutline />
          </n-icon>
        </n-button>
      </div>
    </div>
    <div class="window-dialog-menu">
      <AppMenu :containerProp="containerProp" @addApplication="addWindowDialog"></AppMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
import WindowDialog from '@/components/WindowDialog/index.vue';
import useWindowDialogList, { WINDOW_DIALOG_STATE } from './domains/useWindowDialogList';
import { computed, markRaw, onMounted, ref, shallowRef } from 'vue';
import Menu from '../menu.vue';
import useDomObserver from '../../libs/@yubi/y-hooks/useDomObserver';

import { AddCircleOutline } from '@vicons/ionicons5';
import { IDialogProp, IWindowDialog } from '../../interface/windowDialog';

import AppMenu from '../../applications/appMenu/index.vue';
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
  },
  dialogProp: {
    type: Object,
    default: () => undefined
  },
  homePageName: {
    type: String,
    default: 'login'
  }
});

const windowDialogContainerRef = ref<HTMLDivElement>();

onMounted(() => {
  const { watch } = useDomObserver();
  console.log('windowDialogContainerRef', windowDialogContainerRef)
  watch(windowDialogContainerRef.value);
});


const containerProp = computed(() => {

  const dialogProp: IDialogProp = props.dialogProp;
  if (dialogProp) {
    return {
      height: dialogProp.height,
      width: dialogProp.width,
    }
  } else {
    if (windowDialogContainerRef.value) {
      console.log('window dialog container', windowDialogContainerRef.value)
      return {
        height: windowDialogContainerRef.value.style.height,
        width: windowDialogContainerRef.value.style.width,
      }
    }
  }
});

// document.addEventListener('selectstart', (ev) => {
//   console.log('select start')
//   ev.preventDefault();
//   return false;
// })

const {
  windowDialogList,
  handleDialogFunc,
  addWindowDialog,
} = useWindowDialogList(props.windowDialogList as IWindowDialog[]);

</script>

<style lang="scss" scoped>
.window-dialog-container {
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
