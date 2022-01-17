
<template>
  <div class="container">
    <WindowContainer :windowDialogList="defaultWindowDialogList"/>
  </div>
</template>


<script setup lang="ts">
import WindowContainer from './WindowContainer/index.vue';
import { WINDOW_DIALOG_STATE } from './WindowContainer/domains/useWindowDialogList';
import { IWindowDialog } from '../interface/windowDialog';
// import login from '../views/login/index.vue';

const defaultWindowDialogList: IWindowDialog[] = [
  {
    state: WINDOW_DIALOG_STATE.NORMAL,
    name: '123',
    defaultDialogProp: {
      x: 50, 
      y: 50,
      width: '600px'
    },
    key: 'login',
    func: {
      onCloseDialog: (ev, { name }) => {
        console.log('closeDialog', ev, name);
      },
      onMinimize: (ev, { name }) => {
        console.log('closeDialog', ev, name);
      },
      onClickDialog: (ev, {dialogProp}) => {
        console.log('onClickDialog', ev, dialogProp);
      },
    }
  },
  // {
  //   state: WINDOW_DIALOG_STATE.NORMAL,
  //   title: '标题AAA',
  //   name: '123',
  //   // component: markRaw(Menu),
  //   defaultDialogProp: {
  //     x: 100, 
  //     y: 100
  //   },
  //   func: {
  //     onCloseDialog: (ev, { name }) => {
  //       console.log('closeDialog', ev, name);
  //     },
  //     onMinimize: (ev, { name }) => {
  //       console.log('closeDialog', ev, name);
  //     },
  //     onClickDialog: (ev, {dialogProp}) => {
  //       console.log('onClickDialog', ev, dialogProp);
  //     },
  //   },
  // },
  // {
  //   state: WINDOW_DIALOG_STATE.NORMAL,
  //   title: '1',
  //   name: '123',
  //   defaultDialogProp: {
  //     x: 150, 
  //     y: 150
  //   },
  //   func: {
  //     onCloseDialog: (ev, { name }) => {
  //       console.log('closeDialog', ev, name);
  //     },
  //     onMinimize: (ev, { name }) => {
  //       console.log('closeDialog', ev, name);
  //     },
  //     onClickDialog: (ev, { dialogProp }) => {
  //       console.log('onClickDialog', ev, dialogProp);
  //     },
  //   }
  // },
];
</script>

<style lang="scss" scoped>
.container {
  background-color: #000;
  background: url(https://pic2.zhimg.com/v2-2762684d8dfc5c0e8e561f0c362eccc0_r.jpg?source=1940ef5c);
  background-size: cover;
  // padding: 10px;
  display: flex;
  height: 100vh;
  width: 100vw;

  > div {
    margin: 20px;
  }
}
</style>
