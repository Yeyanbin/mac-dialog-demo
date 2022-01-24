<template>
  <div ref="dialogContainerRef">
    <div ref="dialogRef" class="dialog" :style="({
      transform: `translate(${dialogProp.x}px, ${dialogProp.y}px)`,
      ...dialogProp,
      zIndex: ZIndex,
    })"
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
          <slot name="title">{{props.title}}</slot>
        </span>
      </div>
      <div style="height: calc(100% - 36px)">
        <slot :dialogProp="dialogProp" :context="getContext()">
          content
        </slot>      
      </div>
    </div>
    <div class="border-container">
      <div class="aline" style=""></div>
      <template v-for="(spot, index) of windowBorder.spots">
        <div 
          class="spot"
          :data-state="spot.state"
          :style="({
            transform: `translate(${spot.x}px, ${spot.y}px)`,
            ...spot.style,
          })"></div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs, watch } from 'vue';
import { updateZIndex } from './domains/ZIndexHandler';

import { addMouseUpEventLister, addMoveEventListener, MOUSE_MOVE_STATE_MAP, removeMoveEventListener } from './domains/moveEventHandler';
import { IContext } from '../../interface/windowDialog';

import updateWindowBorder, { SPOT_STATE } from './domains/useWindowBorder';

const headerRef = ref<HTMLElement>();
const dialogRef = ref<HTMLElement>();
const dialogContainerRef = ref<HTMLElement>();

const emit = defineEmits(['clickDialog', 'closeDialog', 'minimize', 'changeDisplay'])

const getContext = (): IContext  => {
  return {
    name: props.name,
    title: props.title,
    dialogProp: dialogProp.value,
  }
}

const closeDialog = (e: MouseEvent) => {
  emit('closeDialog', e, getContext());
};

const minimize = (e) => {
  console.log('click minimize');
};


let last = undefined;

const changeDisplay = (e) => {
  console.log('click changeDisplay', e, props.containerProp);
  if (last) {
    dialogProp.value = last;
    last = undefined;
  } else {
    last = dialogProp.value;
    dialogProp.value = {
      // ...dialogProp.value,
      x: 0,
      y: 0,
      height: props.containerProp.height,
      width: props.containerProp.width,
    };
  }

}

const clickDialog = (e) => {
  emit('clickDialog', e, getContext());
};

const props = defineProps({
  name: {
    type: String,
    default: 'default name',
  },
  dialogProp: {
    type: Object,
    default: () => ({}),
  },
  containerProp: {
    type: Object,
    default: () => ({}),
  },
  title: {
    type: String,
    default: '',
  },
  index: {
    type: Number,
    default: 1,
  }
});

const name = props.name;

const ZIndex = ref(props.index + 10);


// const { x, y } = toRefs(props.defineOptions);

console.log(props.dialogProp);

const dialogProp = ref({
  x: 0,
  y: 0,
  width: '500px',
  height: '400px',
  ...props.dialogProp
})

const windowBorder = ref(updateWindowBorder(dialogProp, ZIndex))


const isMoving = ref(false);

watch(dialogProp.value, (...args) => {
  console.log('dialogProp cahnge', dialogProp.value);
  if (!isMoving.value) {
    isMoving.value = true;
    const changeDialogKey = addMouseUpEventLister(() => {
      isMoving.value = false;
      windowBorder.value = updateWindowBorder(dialogProp, ZIndex);
      console.log('update windowBorder', windowBorder.value);

      removeMoveEventListener(changeDialogKey);
    });
  }
});

// 这里需要改成全局监听
onMounted(() => {
  // dialogProp.value.y = 100;
  console.log('headerRef', headerRef);
  // 先记下点击的点的offsetX和Y
  let clickX: number, clickY: number;
  let state = ref(MOUSE_MOVE_STATE_MAP.READY);

  // 点击header
  headerRef.value?.addEventListener('mousedown', (ev) => {
    let baseX = dialogProp.value.x, baseY = dialogProp.value.y;
    console.log('down ev', ev);
    clickX = ev.x;
    clickY = ev.y;
    state.value = MOUSE_MOVE_STATE_MAP.MOVING;

    // 移动监听
    const mouseMoveKey = addMoveEventListener((ev) => {
      // console.log('move ev', ev);
      if (state.value === MOUSE_MOVE_STATE_MAP.MOVING) {
        dialogProp.value.x = ev.x - clickX + baseX;
        dialogProp.value.y = ev.y - clickY + baseY;
        // console.log('x', transX.value, 'y', transY.value);
      }
    });

    // 设置mouseup监听
    addMouseUpEventLister((ev) => {
      console.log('up ev', ev);
      dialogProp.value.x = ev.x - clickX + baseX;
      dialogProp.value.y = ev.y - clickY + baseY;
      baseX = dialogProp.value.x;
      baseY = dialogProp.value.y;
      state.value = MOUSE_MOVE_STATE_MAP.READY;

      windowBorder.value = updateWindowBorder(dialogProp, ZIndex);
      removeMoveEventListener(mouseMoveKey);
    });
  });

  dialogRef.value.addEventListener('mousedown', (ev) => {
    // 获取z-index值，弹窗来到最顶部
    ZIndex.value = updateZIndex();
  });


  const spotList = dialogContainerRef.value.querySelectorAll('.spot');
  console.log('spot list: ', spotList);

  spotList.forEach((spot) => {
    // spot
    spot.addEventListener('mousedown', (ev: MouseEvent) => {
      ZIndex.value = updateZIndex();

      console.log('start event:',ev);
      const spotX = ev.clientX, spotY = ev.clientY;
      const { x, y } = dialogProp.value;
      const [originWidth] = dialogProp.value.width.match(/[0-9]+/)
      const [originHeight] = dialogProp.value.height.match(/[0-9]+/)
      const state = +spot.getAttribute('data-state');
      console.log('state: ', state)
      // 移动监听
      const spotMoveKey = addMoveEventListener((ev) => {
        const curOffsetX = spotX - ev.clientX 
        const curOffsetY = spotY - ev.clientY 
        console.log('current event:', ev,curOffsetX,curOffsetY);
        switch (state) {
          case SPOT_STATE.LEFT_TOP:
            dialogProp.value = {
              x: x - curOffsetX,
              y: y - curOffsetY,
              width: `${+originWidth + curOffsetX}px`,
              height: `${+originHeight + curOffsetY}px`
            };
          break;
          case SPOT_STATE.RIGHT_TOP:
            dialogProp.value = {
              x,
              y: y - curOffsetY,
              width: `${+originWidth - curOffsetX}px`,
              height: `${+originHeight + curOffsetY}px`
            };
          break;
          case SPOT_STATE.LEFT_DOWN:
            dialogProp.value = {
              x: x - curOffsetX,
              y,
              width: `${+originWidth + curOffsetX}px`,
              height: `${+originHeight - curOffsetY}px`
            };
          break;
          case SPOT_STATE.RIGHT_DOWN:
            dialogProp.value = {
              x,
              y,
              width: `${+originWidth - curOffsetX}px`,
              height: `${+originHeight - curOffsetY}px`
            };
          break;
        }
          
        // if (state.value === MOUSE_MOVE_STATE_MAP.MOVING) {
        //   dialogProp.value.x = ev.x - clickX + baseX;
        //   dialogProp.value.y = ev.y - clickY + baseY;
        //   // console.log('x', transX.value, 'y', transY.value);
        // }

      });

      // 设置mouseup监听
      addMouseUpEventLister((ev) => {
        console.log('end event:', ev);
        console.log('dialogProp:', dialogProp.value);
        windowBorder.value = updateWindowBorder(dialogProp, ZIndex);  
        removeMoveEventListener(spotMoveKey);
      });
    });
  });
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
.border-container{
  position: absolute;
}
.spot {
  width: 10px;
  height: 10px;
  position: absolute
}
</style>
