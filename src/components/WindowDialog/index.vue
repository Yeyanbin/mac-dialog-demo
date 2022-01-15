<template>
  <div ref="dialogRef" class="dialog" :style="{
    transform: `translate(${dialogProp.x}px, ${dialogProp.y}px)`,
    ...dialogProp,
    zIndex: ZIndex,
  }"
  @click="clickDialog">
    <div class="header" ref="headerRef">
      <!-- header -->
      <div class="header-operation-container">
        <!-- button container -->
        <div @mouseup.stop="closeDialog" @mousedown.stop="" class="operation-button" style="background-color: red;"></div>
        <div @mouseup.stop="minimize" @mousedown.stop="" class="operation-button" style="background-color: orange;"></div>
        <div @mouseup.stop="changeDisplay" @mousedown.stop="" class="operation-button" style="background-color: #00ad00;"></div>
      </div>
      <span>
        <slot name="title"></slot>
      </span>
    </div>
    <div>
      <slot :dialogProp="dialogProp">
        content
      </slot>      
    </div>
    <div>
  </div>
</div>

</template>

<script setup lang="ts">
import { onMounted, ref, toRefs, watch } from 'vue';
import { updateZIndex } from './domains/ZIndexHandler';

import { addMouseUpEventLister, MOUSE_MOVE_STATE_MAP } from './domains/moveEventHandler';


const headerRef = ref<HTMLElement>();
const dialogRef = ref<HTMLElement>();

const emit = defineEmits(['clickDialog'])


const closeDialog = (e: MouseEvent) => {
  // e.
  e.stopPropagation();
  e.preventDefault(); 
  console.log('click closeDialog', e);
};

const minimize = () => {
  console.log('click minimize');
};

const changeDisplay = () => {
  console.log('click changeDisplay')
}

const clickDialog = () => {
  emit('clickDialog', props.dialogProp);
};

const props = defineProps({
  dialogProp: {
    type: Object,
    default: {},
  }
});

const ZIndex = ref(100);


// const { x, y } = toRefs(props.defineOptions);

console.log(props.dialogProp);

const dialogProp = ref({
  x: 0,
  y: 0,
  width: '500px',
  height: '400px',
  ...props.dialogProp
})


watch(dialogProp, (...args) => {
  console.log('x or y change.', args);
});

// 这里需要改成全局监听
onMounted(() => {
  console.log('headerRef', headerRef);
  // 先记下点击的点的offsetX和Y
  let clickX: number, clickY: number;
  let baseX = dialogProp.value.x, baseY = dialogProp.value.y;
  let state = ref(MOUSE_MOVE_STATE_MAP.READY);

  headerRef.value?.addEventListener('selectstart', (ev) => {
    console.log('select start')
    ev.preventDefault();
    return false;
  })


  headerRef.value?.addEventListener('mousedown', (ev) => {
    console.log('down ev', ev);
    clickX = ev.x;
    clickY = ev.y;
    state.value = MOUSE_MOVE_STATE_MAP.MOVING;

    // 设置mouseup监听
    addMouseUpEventLister((ev) => {
      console.log('up ev', ev);
      baseX = dialogProp.value.x;
      baseY = dialogProp.value.y;
      state.value = MOUSE_MOVE_STATE_MAP.READY;
    });
  });

  dialogRef.value.addEventListener('mousedown', (ev) => {

    // 获取z-index值，弹窗来到最顶部
    ZIndex.value = updateZIndex();
  });
  
  document.body.addEventListener('mousemove', (ev) => {
    // console.log('move ev', ev);
    if (state.value === MOUSE_MOVE_STATE_MAP.MOVING) {
      dialogProp.value.x = ev.x - clickX + baseX;
      dialogProp.value.y = ev.y - clickY + baseY;
      // console.log('x', transX.value, 'y', transY.value);
    }
  });

  // headerRef.value?.addEventListener('mouseup', );

  // headerRef.value?.addEventListener('mouseover', (ev) => {
  //   // console.log('mouseover ev', ev);
  //   // state = 0;
  // });  
  // headerRef.value?.addEventListener('mouseleave', (ev) => {
  //   // console.log('mouseleave ev', ev);
  //   // baseX = dialogProp.value.x;
  //   // baseY = dialogProp.value.y;
  //   // state = 0;
  // });
})

</script>

<style lang="scss" scoped>

.dialog {
  border-radius: 10px;
  overflow: hidden;
  background-color: #f0f0f0;
  position: fixed;
  box-shadow: 4px 2px 30px -5px #3c3c3c;
}

.header {
  height: 36px;
  background-color: #cdcdcd;
  display: flex;
  align-items: center;
  font-size: 14px;
}

.header-operation-container {
  display: flex;
  padding: 0 20px;
}
.operation-button {
  border: 1px solid #0000002e;
  margin: 11px 5px;
  background-color: white;
  height: 12px;
  width: 12px;
  border-radius: 10px;
}
</style>
