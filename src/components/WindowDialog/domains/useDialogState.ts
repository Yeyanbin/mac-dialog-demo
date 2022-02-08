

// export interface 

export const DIALOG_STATE = {
  NORMAL: 1,
  FULL_SCREEN: 2,
  MINIMIZE: 3,
}

import { HTMLAttributes, ref, StyleValue } from "vue";

const useDialogState = (defaultState = DIALOG_STATE.NORMAL) => {
  const dialogStateStyle = ref<StyleValue>();
  dialogStateStyle.value = DIALOG_STATE_STYLE[defaultState];
  const updateDialogState = (newState: number) => {
    dialogStateStyle.value = DIALOG_STATE_STYLE[newState];
  };

  return {
    dialogStateStyle,
    updateDialogState,
  };
};

const DIALOG_STATE_STYLE = {
  [DIALOG_STATE.NORMAL]: {
    
  },
  [DIALOG_STATE.FULL_SCREEN]: {
    borderRadius: '0px'
  },
  [DIALOG_STATE.MINIMIZE]: {

  }
}

export default useDialogState;
